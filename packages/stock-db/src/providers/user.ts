import { createClient } from '@stock/db/src/client'
// import { Prisma } from '@prisma/client'

const client = createClient()

export const provider = {
  ...client.user
}
