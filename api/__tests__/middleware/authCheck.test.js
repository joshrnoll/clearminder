process.env.JWT_SECRET = 'test-secret'

const jwt = require('jsonwebtoken')
const authCheck = require('../../middleware/authCheck')

function makeReq(token) {
  return { signedCookies: { authToken: token } }
}

function makeRes() {
  const res = {}
  res.status = jest.fn().mockReturnValue(res)
  res.send = jest.fn().mockReturnValue(res)
  return res
}

describe('authCheck middleware', () => {
  test('returns 401 when authToken cookie is absent', () => {
    const req = makeReq(undefined)
    const res = makeRes()
    const next = jest.fn()

    authCheck(req, res, next)

    expect(res.status).toHaveBeenCalledWith(401)
    expect(res.send).toHaveBeenCalledWith('No authToken found. Please log in.')
    expect(next).not.toHaveBeenCalled()
  })

  test('calls next() with a valid token', () => {
    const token = jwt.sign({ user_id: 1 }, 'test-secret', { expiresIn: '1h' })
    const req = makeReq(token)
    const res = makeRes()
    const next = jest.fn()

    authCheck(req, res, next)

    expect(next).toHaveBeenCalledTimes(1)
    expect(res.status).not.toHaveBeenCalled()
  })

  test('returns 403 with an expired token', () => {
    const token = jwt.sign({ user_id: 1 }, 'test-secret', { expiresIn: '-1s' })
    const req = makeReq(token)
    const res = makeRes()
    const next = jest.fn()

    authCheck(req, res, next)

    expect(res.status).toHaveBeenCalledWith(403)
    expect(res.send).toHaveBeenCalledWith('Token expired. Please log in again.')
    expect(next).not.toHaveBeenCalled()
  })

  test('returns 403 with a token signed by a different secret', () => {
    const token = jwt.sign({ user_id: 1 }, 'wrong-secret')
    const req = makeReq(token)
    const res = makeRes()
    const next = jest.fn()

    authCheck(req, res, next)

    expect(res.status).toHaveBeenCalledWith(403)
    expect(res.send).toHaveBeenCalledWith('Invalid token.')
    expect(next).not.toHaveBeenCalled()
  })

  test('returns 403 with a malformed token string', () => {
    const req = makeReq('not.a.valid.jwt')
    const res = makeRes()
    const next = jest.fn()

    authCheck(req, res, next)

    expect(res.status).toHaveBeenCalledWith(403)
    expect(next).not.toHaveBeenCalled()
  })
})
