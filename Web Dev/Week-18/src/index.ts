import { PrismaClient } from "@prisma/client";
const client = new PrismaClient();

async function createUser() {
    await client.user.create({
        data:{
            username:"Tanishq",
            password:"1234",
            age: 19,
            city: "Delhi",
        }
    })
}

createUser();