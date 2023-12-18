import { IsNotEmpty, IsNumber, IsString, MaxLength } from "class-validator";
export class LoginUserDto {
    @IsNotEmpty()
    readonly credential: string;

    @IsNotEmpty()
    readonly password: string;

    
}