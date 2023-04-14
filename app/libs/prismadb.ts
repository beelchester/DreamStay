import {PrismaClient} from '@prisma/client'

declare global {
    var prisma: PrismaClient | undefined 
    }

const client = globalThis.prisma || new PrismaClient()

if (process.env.NODE_ENV === 'development') globalThis.prisma = client

    client.user.findMany().then((users) => {
        console.log(users)
    })

export default client
