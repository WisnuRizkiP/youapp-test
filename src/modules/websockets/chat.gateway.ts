import { ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Socket,Server } from "socket.io";
import { JoinRoomDto,ChatMessage, TypingMessage } from "./dto/chat.dto";
import { UseGuards, UsePipes, ValidationPipe } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

@WebSocketGateway({
    cors: {
      origin: '*',
    },
})
export class ChatGateway{
    @WebSocketServer()
    server: Server;
    
    @SubscribeMessage('text-chat')
    @UsePipes(new ValidationPipe())
    handleMessage(@MessageBody() message: ChatMessage,@ConnectedSocket() client: Socket){
        client.join(message.room)
        this.server.to(message.room).emit('message', {
            ...message,
            time: new Date().toDateString(),
        });
    }

    @SubscribeMessage('join-room')
    @UsePipes(new ValidationPipe())
    handleJoinRoom(@MessageBody() room: JoinRoomDto,@ConnectedSocket() client: Socket){
        client.join(room.room)
        this.server.to(room.room).emit('message', { sender: 'System', message: `${room.username} joined the room` })
    }

    @SubscribeMessage('typing')
    @UsePipes(new ValidationPipe())
    handleTyping(@MessageBody() room: TypingMessage,@ConnectedSocket() client: Socket){
        client.join(room.room)
        this.server.to(room.room).emit('typing', { 
            sender: 'System', 
            message: `${room.username} is typing ....`,
            userType: room.username,
            isTyping: room.isTyping
         })
    }
}