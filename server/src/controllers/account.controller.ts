import prisma from '@/database'
import { UpdateMeBodyType } from '@/schemaValidations/account.schema'
import { hashPassword } from '@/utils/crypto'

export const updateMeController = async (accountId: number, body: UpdateMeBodyType) => {
  const hashedNewPassword = await hashPassword(body.password)
  const account = prisma.account.update({
    where: {
      id: accountId
    },
    data: {
      name: body.name,
      password: hashedNewPassword
    }
  })
  return account
}
