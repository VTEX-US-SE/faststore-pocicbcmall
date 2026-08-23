import { renderHook } from '@testing-library/react-hooks'
import { usePriceFormatter, useFormattedPrice } from './index'

jest.mock('@faststore/core/experimental', () => ({
  useSession_unstable: () => ({
    locale: 'es-AR',
    currency: { code: 'ARS' },
  }),
}))

describe('usePriceFormatter', () => {
  it('should format the price using the session locale and currency', () => {
    const { result } = renderHook(() => usePriceFormatter())

    const formattedPrice = result.current(1500)

    expect(formattedPrice.replace(/\s+/g, '')).toBe('$1.500,00')
  })

  it('should format decimal prices correctly', () => {
    const { result } = renderHook(() => usePriceFormatter({ decimals: true }))

    const formattedPrice = result.current(1500.75)

    expect(formattedPrice.replace(/\s+/g, '')).toBe('$1.500,75')
  })
})

describe('useFormattedPrice', () => {
  it('should return the correctly formatted price', () => {
    const { result } = renderHook(() => useFormattedPrice(2000))

    expect(result.current.replace(/\s+/g, '')).toBe('$2.000,00')
  })

  it('should reformat the price when the value changes', () => {
    const { result, rerender } = renderHook(
      ({ price }) => useFormattedPrice(price),
      {
        initialProps: { price: 3000 },
      }
    )

    expect(result.current.replace(/\s+/g, '')).toBe('$3.000,00')

    rerender({ price: 3500 })

    expect(result.current.replace(/\s+/g, '')).toBe('$3.500,00')
  })
})
