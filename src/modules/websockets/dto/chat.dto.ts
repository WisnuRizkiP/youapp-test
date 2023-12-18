import { IsBoolean, IsNotEmpty, IsNumber, IsString, MaxLength} from "class-validator";
export class JoinRoomDto {
    @IsString()
    room: string;

    @IsString()
    username: string;
    
}

export class ChatMessage {
    @IsString()
    username: string

    @IsString()
    message: string

    @IsString()
    room: string
}

export class TypingMessage {
    @IsString()
    username: string

    @IsBoolean()
    isTyping: boolean

    @IsString()
    room: string
}