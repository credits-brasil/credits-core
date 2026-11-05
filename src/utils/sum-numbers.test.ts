import { describe, expect, test } from '@jest/globals'
import { sumNumbers } from './sum-numbers'

describe('sumNumbers', () => {
  test('sums two numbers', () => {
    expect(sumNumbers(2, 3)).toBe(5)
  })
})