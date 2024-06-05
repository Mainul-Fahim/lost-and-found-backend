import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

const main = async()=>{
const createUser = await prisma.user.create({
    data: {
        name: 'mainul01',
        email: 'mainul01@gmail.com',
        password: '123456'
    }
})
console.log(createUser);
}

main()