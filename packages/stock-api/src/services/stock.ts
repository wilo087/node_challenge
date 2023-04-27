import { Stock } from '../types'

export const getStock = async (code: string): Promise<Stock | null> => {
  const response = await fetch(`https://stooq.com/q/l/?s=${code}&f=sd2t2ohlcvn&h&e=json`)
  const data = await response.json()

  if (data?.symbols != null && data.symbols.length > 0) {
    const stock = data.symbols
    const stockWithNames = stock.filter((item: Stock) => Object.prototype.hasOwnProperty.call(item, 'name'))

    if (stockWithNames.length > 0) {
      return stockWithNames.map(({ name, symbol, open, high, low, close }: Stock) => { return { name, symbol, open, high, low, close } })[0]
    }
  }

  return null
}
