import { FastifyInstance, FastifyPluginOptions } from 'fastify'
import { CheckEmailController, updatePasswordController } from '@/controllers/auth.controller'
import { UpdatePasswordSchema, MessageResSchema, checkEmailOnServer } from '@/schemaValidations/auth.schema'

export async function authRoutes2(fastify: FastifyInstance, options: FastifyPluginOptions) {
  fastify.post<{
    Reply: { message: string }
    Body: {
      email: string
      // currentPassword: string
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
      const { email, newPassword } = request.body // currentPassword,
      const message = await updatePasswordController(email, newPassword) // currentPassword,
      reply.send({ message })
    }
  )

  fastify.post<{
    Reply: { message: string }
    Body: {
      email: string
      // currentPassword: string
      // newPassword: string
    }
  }>(
    '/checkEmail',
    {
      schema: {
        response: {
          200: MessageResSchema
        }
      },
      preValidation: (request, reply, done) => {
        const parseResult = checkEmailOnServer.safeParse(request.body)
        console.log(parseResult)
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
      const { email } = request.body
      const message = await CheckEmailController(email)
      reply.send({ message })
    }
  )
}
