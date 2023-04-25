import { createClient } from '@stock/db/src/client'
const client = createClient()

export const provider = {
  ...client.userHistory
}
