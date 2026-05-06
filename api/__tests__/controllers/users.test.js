process.env.JWT_SECRET = 'test-secret'

jest.mock('../../db.js', () => {
  const db = jest.fn()
  db.select = jest.fn()
  return db
})

const db = require('../../db.js')
const jwt = require('jsonwebtoken')
const { getTutorialComplete, setTutorialComplete } = require('../../controllers/users')

const validToken = jwt.sign({ user_id: 42 }, 'test-secret')

function makeReq(overrides = {}) {
  return {
    signedCookies: { authToken: validToken },
    params: {},
    ...overrides,
  }
}

function makeRes() {
  const res = {}
  res.status = jest.fn().mockReturnValue(res)
  res.send = jest.fn().mockReturnValue(res)
  return res
}

describe('getTutorialComplete', () => {
  beforeEach(() => jest.clearAllMocks())

  test('returns tutorial status for the authenticated user', async () => {
    const data = [{ tutorial_complete: true }]
    const whereChain = { where: jest.fn().mockResolvedValue(data) }
    const fromChain = { from: jest.fn().mockReturnValue(whereChain) }
    db.select = jest.fn().mockReturnValue(fromChain)

    const req = makeReq()
    const res = makeRes()

    getTutorialComplete(req, res)
    await new Promise(resolve => setImmediate(resolve))

    expect(db.select).toHaveBeenCalledWith('tutorial_complete')
    expect(whereChain.where).toHaveBeenCalledWith({ user_id: 42 })
    expect(res.status).toHaveBeenCalledWith(200)
    expect(res.send).toHaveBeenCalledWith(data)
  })

  test('returns 500 on database error', async () => {
    const whereChain = { where: jest.fn().mockRejectedValue(new Error('db error')) }
    const fromChain = { from: jest.fn().mockReturnValue(whereChain) }
    db.select = jest.fn().mockReturnValue(fromChain)

    const req = makeReq()
    const res = makeRes()

    getTutorialComplete(req, res)
    await new Promise(resolve => setImmediate(resolve))

    expect(res.status).toHaveBeenCalledWith(500)
  })
})

describe('setTutorialComplete', () => {
  beforeEach(() => jest.clearAllMocks())

  test('returns 400 for invalid param values', () => {
    const req = makeReq({ params: { value: 'yes' } })
    const res = makeRes()

    setTutorialComplete(req, res)

    expect(res.status).toHaveBeenCalledWith(400)
    expect(res.send).toHaveBeenCalledWith('Bad parameters')
  })

  test('accepts "true" and updates the database', async () => {
    const data = [{ user_id: 42, tutorial_complete: true }]
    const updateChain = { update: jest.fn().mockResolvedValue(data) }
    const whereChain = { where: jest.fn().mockReturnValue(updateChain) }
    db.mockReturnValue(whereChain)

    const req = makeReq({ params: { value: 'true' } })
    const res = makeRes()

    setTutorialComplete(req, res)
    await new Promise(resolve => setImmediate(resolve))

    expect(db).toHaveBeenCalledWith('users')
    expect(whereChain.where).toHaveBeenCalledWith({ user_id: 42 })
    expect(updateChain.update).toHaveBeenCalledWith({ tutorial_complete: 'true' }, ['user_id', 'tutorial_complete'])
    expect(res.status).toHaveBeenCalledWith(200)
  })

  test('accepts "false" and updates the database', async () => {
    const data = [{ user_id: 42, tutorial_complete: false }]
    const updateChain = { update: jest.fn().mockResolvedValue(data) }
    const whereChain = { where: jest.fn().mockReturnValue(updateChain) }
    db.mockReturnValue(whereChain)

    const req = makeReq({ params: { value: 'false' } })
    const res = makeRes()

    setTutorialComplete(req, res)
    await new Promise(resolve => setImmediate(resolve))

    expect(res.status).toHaveBeenCalledWith(200)
    expect(res.send).toHaveBeenCalledWith(data)
  })

  test('returns 500 on database error', async () => {
    const updateChain = { update: jest.fn().mockRejectedValue(new Error('db error')) }
    const whereChain = { where: jest.fn().mockReturnValue(updateChain) }
    db.mockReturnValue(whereChain)

    const req = makeReq({ params: { value: 'true' } })
    const res = makeRes()

    setTutorialComplete(req, res)
    await new Promise(resolve => setImmediate(resolve))

    expect(res.status).toHaveBeenCalledWith(500)
  })
})
