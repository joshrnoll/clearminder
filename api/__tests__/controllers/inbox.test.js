process.env.JWT_SECRET = 'test-secret'

jest.mock('../../db.js', () => {
  const db = jest.fn()
  db.select = jest.fn()
  db.insert = jest.fn()
  return db
})

const db = require('../../db.js')
const jwt = require('jsonwebtoken')
const { getInbox, addToInbox } = require('../../controllers/inbox')

const validToken = jwt.sign({ user_id: 42 }, 'test-secret')

function makeReq(overrides = {}) {
  return {
    signedCookies: { authToken: validToken },
    body: null,
    hostname: 'localhost',
    ...overrides,
  }
}

function makeRes() {
  const res = {}
  res.status = jest.fn().mockReturnValue(res)
  res.send = jest.fn().mockReturnValue(res)
  res.json = jest.fn().mockReturnValue(res)
  return res
}

describe('getInbox', () => {
  beforeEach(() => jest.clearAllMocks())

  test('returns inbox items for the authenticated user', async () => {
    const items = [{ item_id: 1, content: 'Buy milk', associated_user: 42 }]
    const whereChain = { where: jest.fn().mockResolvedValue(items) }
    const fromChain = { from: jest.fn().mockReturnValue(whereChain) }
    db.select = jest.fn().mockReturnValue(fromChain)

    const req = makeReq()
    const res = makeRes()

    getInbox(req, res)
    await new Promise(resolve => setImmediate(resolve))

    expect(db.select).toHaveBeenCalledWith('*')
    expect(whereChain.where).toHaveBeenCalledWith({ associated_user: 42 })
    expect(res.status).toHaveBeenCalledWith(200)
    expect(res.send).toHaveBeenCalledWith(items)
  })

  test('returns 500 on database error', async () => {
    const error = new Error('DB connection failed')
    const whereChain = { where: jest.fn().mockRejectedValue(error) }
    const fromChain = { from: jest.fn().mockReturnValue(whereChain) }
    db.select = jest.fn().mockReturnValue(fromChain)

    const req = makeReq()
    const res = makeRes()

    getInbox(req, res)
    await new Promise(resolve => setImmediate(resolve))

    expect(res.status).toHaveBeenCalledWith(500)
  })
})

describe('addToInbox', () => {
  beforeEach(() => jest.clearAllMocks())

  test('returns 400 when body is null', () => {
    const req = makeReq({ body: null })
    const res = makeRes()

    addToInbox(req, res)

    expect(res.status).toHaveBeenCalledWith(400)
  })

  test('returns 400 when required properties are missing', () => {
    const req = makeReq({ body: { content: 'something' } }) // missing user_id
    const res = makeRes()

    addToInbox(req, res)

    expect(res.status).toHaveBeenCalledWith(400)
    expect(res.send).toHaveBeenCalledWith(expect.objectContaining({ success: 'false' }))
  })

  test('inserts item and returns 200 on success', async () => {
    const inserted = [{ item_id: 7, associated_user: 42, content: 'Write tests' }]
    const intoChain = { into: jest.fn().mockResolvedValue(inserted) }
    db.insert = jest.fn().mockReturnValue(intoChain)

    const req = makeReq({ body: { user_id: 42, content: 'Write tests' } })
    const res = makeRes()

    addToInbox(req, res)
    await new Promise(resolve => setImmediate(resolve))

    expect(db.insert).toHaveBeenCalledWith(
      { associated_user: 42, content: 'Write tests' },
      ['item_id', 'associated_user', 'content']
    )
    expect(res.status).toHaveBeenCalledWith(200)
    expect(res.send).toHaveBeenCalledWith(expect.objectContaining({ success: 'true' }))
  })

  test('returns 500 on database error during insert', async () => {
    const intoChain = { into: jest.fn().mockRejectedValue(new Error('insert failed')) }
    db.insert = jest.fn().mockReturnValue(intoChain)

    const req = makeReq({ body: { user_id: 42, content: 'Write tests' } })
    const res = makeRes()

    addToInbox(req, res)
    await new Promise(resolve => setImmediate(resolve))

    expect(res.status).toHaveBeenCalledWith(500)
  })
})
