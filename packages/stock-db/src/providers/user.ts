import { createClient } from '@stock/db/src/client'
import { User } from '@prisma/client'
import bcrypt from 'bcrypt'

const client = createClient()

client.$use(async (params, next) => {
  if (params.model === 'User' && params.action === 'create') {
    const user = params.args.data as User
    const encryptedPassword = await bcrypt.hash(user.password, 10)
    user.password = encryptedPassword
  }

  return await next(params)
})

export const provider = {
  ...client.user
}
