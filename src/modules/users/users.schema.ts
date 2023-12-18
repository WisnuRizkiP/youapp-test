import { Prop,Schema,SchemaFactory } from "@nestjs/mongoose";

@Schema()
export class Users {

    @Prop()
    username: string;

    @Prop()
    email: string;

    @Prop()
    password: string;
}

export const UsersSchema = SchemaFactory.createForClass(Users);