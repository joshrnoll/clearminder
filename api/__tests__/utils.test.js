const { getRandomInteger } = require('../utils')

describe('getRandomInteger', () => {
  test('returns a number', () => {
    expect(typeof getRandomInteger(1, 10)).toBe('number')
  })

  test('returns an integer (no decimal)', () => {
    const result = getRandomInteger(1, 100)
    expect(result).toBe(Math.floor(result))
  })

  test('result is within the specified range', () => {
    for (let i = 0; i < 100; i++) {
      const result = getRandomInteger(5, 15)
      expect(result).toBeGreaterThanOrEqual(5)
      expect(result).toBeLessThanOrEqual(15)
    }
  })

  test('returns the exact value when min equals max', () => {
    expect(getRandomInteger(7, 7)).toBe(7)
  })
})
