import { NextRequest } from "next/server";
import jwt from "jsonwebtoken"
export async function POST(req:NextRequest){
    const body = await req.json();
    const username = body.username;
    const password = body.password;

    const userId = 1;
    // const token = await jwt.sign({
    //     username,

    // })
}