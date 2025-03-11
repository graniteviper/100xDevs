import {WebSocketServer} from "ws";
import jwt, { JwtPayload } from "jsonwebtoken"

const wss = new WebSocketServer({port: 8080});

wss.on('connection',function connection(ws, request){
    const url = request.url;
    if(!url){
        return;
    } else{
        const queryParams = new URLSearchParams(url.split('?')[0]);
        const token = queryParams.get('token') || "";

        // Verify and decode the token. Only if he is authorised may he enter the workspace.
        if(!process.env.JWT_SECRET){
            ws.close();
            return;
        }
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        if(typeof decoded == "string"){
            ws.close();
            return;
        }

        if(!decoded || !decoded.decoded.userId){
            ws.close();
            return;
        }

        ws.on('message',function message(data){
            
        })
    }   
})