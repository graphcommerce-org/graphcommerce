import { toDate } from './toDate'

describe('toDate', () => {
  describe('null/undefined input', () => {
    it('returns undefined for null', () => {
      expect(toDate(null)).toBeUndefined()
    })

    it('returns undefined for undefined', () => {
      expect(toDate(undefined)).toBeUndefined()
    })
  })

  describe('Date input', () => {
    it('returns the same Date instance when given a valid Date', () => {
      const input = new Date(2024, 0, 15)
      expect(toDate(input)).toBe(input)
    })

    it('returns undefined for an invalid Date instance', () => {
      const invalid = new Date('not a date')
      expect(toDate(invalid)).toBeUndefined()
    })
  })

  describe('number input', () => {
    it('parses a valid timestamp', () => {
      const timestamp = new Date(2024, 0, 15).getTime()
      const result = toDate(timestamp)
      expect(result).toBeInstanceOf(Date)
      expect(result?.getTime()).toBe(timestamp)
    })

    it('returns undefined for NaN', () => {
      expect(toDate(Number.NaN)).toBeUndefined()
    })
  })

  describe('string input: YYYY-MM-DD', () => {
    it('parses a date-only string as local time (not UTC)', () => {
      const result = toDate('2024-01-15')
      expect(result).toBeInstanceOf(Date)
      expect(result?.getFullYear()).toBe(2024)
      expect(result?.getMonth()).toBe(0)
      expect(result?.getDate()).toBe(15)
      expect(result?.getHours()).toBe(0)
    })
  })

  describe('string input: ISO datetime with offset', () => {
    it('does not mangle a timezone offset (regression test)', () => {
      const result = toDate('2024-01-15T10:30:00-05:00')
      expect(result).toBeInstanceOf(Date)
      expect(result?.toISOString()).toBe('2024-01-15T15:30:00.000Z')
    })

    it('parses a UTC ISO datetime string', () => {
      const result = toDate('2024-01-15T10:30:00Z')
      expect(result).toBeInstanceOf(Date)
      expect(result?.toISOString()).toBe('2024-01-15T10:30:00.000Z')
    })
  })

  describe('string input: d/m/Y H:i:s (Magento DATETIME_SLASH_PHP_FORMAT)', () => {
    it('parses day-first date with time', () => {
      const result = toDate('15/01/2024 10:30:00')
      expect(result).toBeInstanceOf(Date)
      expect(result?.getFullYear()).toBe(2024)
      expect(result?.getMonth()).toBe(0) // January
      expect(result?.getDate()).toBe(15)
      expect(result?.getHours()).toBe(10)
      expect(result?.getMinutes()).toBe(30)
      expect(result?.getSeconds()).toBe(0)
    })

    it('parses day-first date without time, defaulting to midnight', () => {
      const result = toDate('15/01/2024')
      expect(result).toBeInstanceOf(Date)
      expect(result?.getFullYear()).toBe(2024)
      expect(result?.getMonth()).toBe(0)
      expect(result?.getDate()).toBe(15)
      expect(result?.getHours()).toBe(0)
      expect(result?.getMinutes()).toBe(0)
      expect(result?.getSeconds()).toBe(0)
    })

    it('treats an unambiguous day value as day-first, not month-first', () => {
      // 25 can only be a day, proving the parser is day-first and not
      // falling back to the native Date constructor's MM/DD assumption
      const result = toDate('25/12/2024 08:00:00')
      expect(result?.getMonth()).toBe(11) // December
      expect(result?.getDate()).toBe(25)
    })

    it('correctly parses an ambiguous d/m value (both parts <= 12)', () => {
      // regression: native `new Date('01/02/2024')` would parse this as
      // Jan 2 (MM/DD); Magento's format means this is 1 Feb
      const result = toDate('01/02/2024')
      expect(result?.getMonth()).toBe(1) // February
      expect(result?.getDate()).toBe(1)
    })

    it('pads single-digit day/month correctly', () => {
      const result = toDate('5/6/2024 09:05:03')
      expect(result?.getMonth()).toBe(5) // June
      expect(result?.getDate()).toBe(5)
      expect(result?.getHours()).toBe(9)
      expect(result?.getMinutes()).toBe(5)
      expect(result?.getSeconds()).toBe(3)
    })
  })

  describe('invalid string input', () => {
    it('returns undefined for garbage input', () => {
      expect(toDate('not a date')).toBeUndefined()
    })

    it('returns undefined for empty string', () => {
      expect(toDate('')).toBeUndefined()
    })
  })

  describe('invalid calendar dates (silent JS normalization)', () => {
    it('rejects Feb 31 instead of rolling over to March', () => {
      expect(toDate('31/02/2026')).toBeUndefined()
    })

    it('rejects April 31 (April has 30 days)', () => {
      expect(toDate('31/04/2026')).toBeUndefined()
    })

    it('rejects an out-of-range month', () => {
      expect(toDate('25/13/2026')).toBeUndefined()
    })

    it('rejects nonsense day/month values', () => {
      expect(toDate('99/99/2026')).toBeUndefined()
    })

    it('rejects Feb 30 in ISO date-only format too', () => {
      expect(toDate('2026-02-30')).toBeUndefined()
    })

    it('accepts a valid leap day', () => {
      const result = toDate('29/02/2024') // 2024 is a leap year
      expect(result?.getMonth()).toBe(1)
      expect(result?.getDate()).toBe(29)
    })

    it('rejects Feb 29 on a non-leap year', () => {
      expect(toDate('29/02/2026')).toBeUndefined()
    })
  })
})
