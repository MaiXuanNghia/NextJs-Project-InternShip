// // payment.controller.ts

// import { PrismaClient } from '@prisma/client'

// const prisma = new PrismaClient()

// export async function getPaymentList() {
//   // Your implementation here
// }

// export async function getPaymentDetail(id: number) {
//   // Your implementation here
// }

// export async function createPayment(data: { accountId: number; amount: number; status: string; productIds: number[] }) {
//   const { accountId, amount, status, productIds } = data

//   const payment = await prisma.payment.create({
//     data: {
//       accountId,
//       amount,
//       status,
//       products: {
//         create: productIds.map((id) => ({
//           product: {
//             connect: { id }
//           }
//         }))
//       }
//     }
//   })

//   return payment
// }
