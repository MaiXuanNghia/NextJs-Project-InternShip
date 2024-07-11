import { FastifyInstance, FastifyPluginOptions } from 'fastify'
import { updatePasswordController } from '@/controllers/auth.controller'
import { UpdatePasswordSchema, MessageResSchema } from '@/schemaValidations/auth.schema'

export async function authRoutes2(fastify: FastifyInstance, options: FastifyPluginOptions) {
  fastify.post<{
    Reply: { message: string }
    Body: {
      userId: number
      currentPassword: string
      newPassword: string
    }
  }>(
    '/password',
    {
      schema: {
        response: {
          200: MessageResSchema
        }
      },
      preValidation: (request, reply, done) => {
        const parseResult = UpdatePasswordSchema.safeParse(request.body)
        if (!parseResult.success) {
          reply.status(400).send({
            message: parseResult.error.errors[0].message
          })
        } else {
          request.body = parseResult.data
          done()
        }
      }
    },
    async (request, reply) => {
      const { userId, currentPassword, newPassword } = request.body
      const message = await updatePasswordController(userId, currentPassword, newPassword)
      reply.send({ message })
    }
  )
}
