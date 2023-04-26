import { createClient } from '@stock/db/src/client'
import randomstring from 'randomstring'
import { Role, User } from '@prisma/client'
import { UserReturnInput } from '@stock/db/types'
import bcryptjs from 'bcryptjs'

const client = createClient()

client.$use(async (params, next) => {
  if (params.model === 'User' && params.action === 'create') {
    const user = params.args.data as User
    const encryptedPassword = await bcryptjs.hash(user.password, 10)
    user.password = encryptedPassword
  }

  return await next(params)
})

const findOrCreate = async (email: string, role: Role): Promise<UserReturnInput> => {
  const user = await client.user.findUnique({ where: { email } })

  if (user !== null) {
    return { email: user.email, password: undefined }
  }

  const password = randomstring.generate(32)
  const userCreated = await client.user.create({
    data: { role, email, password }
  })

  const newUser = {
    email: userCreated.email,
    password
  }

  return newUser
}

export const provider = {
  ...client.user,
  findOrCreate
}
