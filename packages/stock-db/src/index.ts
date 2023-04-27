import client from '@prisma/client'
import * as Providers from './providers'

export default {
  ...Providers,
  ...client
}
