import dotenv from 'dotenv'
dotenv.config()

export const config = {
  secret: process.env.JWT_SECRET ?? 'd5fbddfa10596fadb53a3ca21a8626efe966a6a3d9c2aa75ce5ef572d7f1d865',
  stockApiUrl: process.env.STOCK_API_URL ?? 'http://localhost:3001'
}
