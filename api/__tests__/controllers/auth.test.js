process.env.JWT_SECRET = 'test-secret'
process.env.NODE_ENV = 'test'

jest.mock('../../db.js', () => {
  const db = jest.fn()
  db.select = jest.fn()
  return db
})

jest.mock('bcrypt', () => ({
  compare: jest.fn(),
}))

const db = require('../../db.js')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { userLogin, userLogout } = require('../../controllers/auth')

function makeRes() {
  const res = {}
  res.status = jest.fn().mockReturnValue(res)
  res.send = jest.fn().mockReturnValue(res)
  res.json = jest.fn().mockReturnValue(res)
  res.cookie = jest.fn().mockReturnValue(res)
  res.clearCookie = jest.fn().mockReturnValue(res)
  return res
}

function makeDbSelectChain(resolvedValue) {
  const chain = { where: jest.fn().mockResolvedValue(resolvedValue) }
  const fromChain = { from: jest.fn().mockReturnValue(chain) }
  db.select = jest.fn().mockReturnValue(fromChain)
}

const mockUser = {
  user_id: 1,
  username: 'testuser',
  password: 'hashedpassword',
  first_name: 'Test',
  last_name: 'User',
}

describe('userLogin', () => {
  beforeEach(() => jest.clearAllMocks())

  test('returns 400 when request body is null', () => {
    const req = { body: null, hostname: 'localhost', params: {} }
    const res = makeRes()

    userLogin(req, res)

    expect(res.status).toHaveBeenCalledWith(400)
    expect(res.send).toHaveBeenCalledWith('You must supply a body with this request')
  })

  test('returns 404 when no user matches the username', async () => {
    makeDbSelectChain([])
    const req = { body: { username: 'nobody', password: 'pw' }, hostname: 'localhost', params: {} }
    const res = makeRes()

    userLogin(req, res)
    await new Promise(resolve => setImmediate(resolve))

    expect(res.status).toHaveBeenCalledWith(404)
  })

  test('returns 500 when multiple users share the same username', async () => {
    makeDbSelectChain([mockUser, { ...mockUser, user_id: 2 }])
    const req = { body: { username: 'dupe', password: 'pw' }, hostname: 'localhost', params: {} }
    const res = makeRes()

    userLogin(req, res)
    await new Promise(resolve => setImmediate(resolve))

    expect(res.status).toHaveBeenCalledWith(500)
  })

  test('returns 401 when password does not match', async () => {
    makeDbSelectChain([mockUser])
    bcrypt.compare = jest.fn().mockResolvedValue(false)
    const req = { body: { username: 'testuser', password: 'wrongpw' }, hostname: 'localhost', params: {} }
    const res = makeRes()

    userLogin(req, res)
    await new Promise(resolve => setImmediate(resolve))

    expect(res.status).toHaveBeenCalledWith(401)
    expect(res.send).toHaveBeenCalledWith('Login failed')
  })

  test('sets signed cookie and returns user data on successful login', async () => {
    makeDbSelectChain([mockUser])
    bcrypt.compare = jest.fn().mockResolvedValue(true)
    const req = { body: { username: 'testuser', password: 'correctpw' }, hostname: 'localhost', params: {} }
    const res = makeRes()

    userLogin(req, res)
    await new Promise(resolve => setImmediate(resolve))

    expect(res.cookie).toHaveBeenCalledWith('authToken', expect.any(String), expect.objectContaining({ httpOnly: true, signed: true }))
    expect(res.status).toHaveBeenCalledWith(200)
    expect(res.send).toHaveBeenCalledWith(expect.objectContaining({
      first_name: 'Test',
      last_name: 'User',
      user_id: 1,
    }))
  })

  test('JWT payload contains expected user fields', async () => {
    makeDbSelectChain([mockUser])
    bcrypt.compare = jest.fn().mockResolvedValue(true)
    const req = { body: { username: 'testuser', password: 'correctpw' }, hostname: 'localhost', params: {} }
    const res = makeRes()

    userLogin(req, res)
    await new Promise(resolve => setImmediate(resolve))

    const [, token] = res.cookie.mock.calls[0]
    const payload = jwt.verify(token, 'test-secret')
    expect(payload).toMatchObject({ first_name: 'Test', last_name: 'User', user_id: 1 })
  })
})

describe('userLogout', () => {
  test('clears the authToken cookie and returns success', () => {
    const req = {}
    const res = makeRes()

    userLogout(req, res)

    expect(res.clearCookie).toHaveBeenCalledWith('authToken')
    expect(res.status).toHaveBeenCalledWith(200)
    expect(res.json).toHaveBeenCalledWith({ success: 'true' })
  })

  test('returns 500 when clearCookie throws', () => {
    const req = {}
    const res = makeRes()
    res.clearCookie = jest.fn().mockImplementation(() => { throw new Error('cookie error') })

    userLogout(req, res)

    expect(res.status).toHaveBeenCalledWith(500)
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ success: 'false' }))
  })
})
