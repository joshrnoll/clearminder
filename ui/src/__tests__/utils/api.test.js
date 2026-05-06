import { vi, describe, test, expect, beforeEach } from 'vitest'
import { userLogin, userLogout, getInbox, addToInbox } from '../../../utils/api.js'

function makeResponse(status, body) {
  return {
    ok: status >= 200 && status < 300,
    status,
    json: vi.fn().mockResolvedValue(body),
  }
}

describe('getInbox', () => {
  beforeEach(() => {
    vi.stubGlobal('fetch', vi.fn())
    localStorage.clear()
  })

  test('resolves with data on 200', async () => {
    const data = [{ item_id: 1, content: 'Buy milk' }]
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(makeResponse(200, data)))

    const result = await getInbox()

    expect(result).toEqual(data)
  })

  test('clears localStorage on 401', async () => {
    localStorage.setItem('loggedInUser', JSON.stringify({ user_id: 1 }))
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(makeResponse(401, {})))

    await getInbox()

    expect(localStorage.getItem('loggedInUser')).toBeNull()
  })

  test('clears localStorage on 403', async () => {
    localStorage.setItem('loggedInUser', JSON.stringify({ user_id: 1 }))
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(makeResponse(403, {})))

    await getInbox()

    expect(localStorage.getItem('loggedInUser')).toBeNull()
  })
})

describe('userLogin', () => {
  beforeEach(() => vi.stubGlobal('fetch', vi.fn()))

  test('returns user data on 200', async () => {
    const userData = { user_id: 1, first_name: 'Test', last_name: 'User' }
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(makeResponse(200, userData)))

    const result = await userLogin('testuser', 'password')

    expect(result).toEqual(userData)
  })

  test('sends username and password in JSON body', async () => {
    const fetchMock = vi.fn().mockResolvedValue(makeResponse(200, {}))
    vi.stubGlobal('fetch', fetchMock)

    await userLogin('alice', 'secret')

    const [, options] = fetchMock.mock.calls[0]
    const body = JSON.parse(options.body)
    expect(body).toEqual({ username: 'alice', password: 'secret' })
  })

  test('sends credentials: include', async () => {
    const fetchMock = vi.fn().mockResolvedValue(makeResponse(200, {}))
    vi.stubGlobal('fetch', fetchMock)

    await userLogin('alice', 'secret')

    const [, options] = fetchMock.mock.calls[0]
    expect(options.credentials).toBe('include')
  })
})

describe('userLogout', () => {
  beforeEach(() => {
    localStorage.setItem('loggedInUser', JSON.stringify({ user_id: 1 }))
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(makeResponse(200, { success: true })))
  })

  test('removes loggedInUser from localStorage on success', async () => {
    await userLogout()

    expect(localStorage.getItem('loggedInUser')).toBeNull()
  })
})

describe('addToInbox', () => {
  beforeEach(() => {
    localStorage.setItem('loggedInUser', JSON.stringify({ user_id: 42 }))
  })

  test('sends content and user_id in request body', async () => {
    const fetchMock = vi.fn().mockResolvedValue(makeResponse(200, { success: 'true' }))
    vi.stubGlobal('fetch', fetchMock)

    await addToInbox('Write more tests')

    const [, options] = fetchMock.mock.calls[0]
    const body = JSON.parse(options.body)
    expect(body).toEqual({ content: 'Write more tests', user_id: 42 })
  })

  test('uses POST method', async () => {
    const fetchMock = vi.fn().mockResolvedValue(makeResponse(200, { success: 'true' }))
    vi.stubGlobal('fetch', fetchMock)

    await addToInbox('something')

    const [, options] = fetchMock.mock.calls[0]
    expect(options.method).toBe('POST')
  })
})
