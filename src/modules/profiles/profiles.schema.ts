import { Prop,Schema,SchemaFactory } from "@nestjs/mongoose";

@Schema()
export class Profiles {

    @Prop()
    userId: string;

    @Prop()
    displayName: string;

    @Prop()
    gender: string;

    @Prop()
    horoscope: string;

    @Prop()
    zodiac: string;

    @Prop()
    height: number;

    @Prop()
    weight: number;

    @Prop()
    interest: string[];

    @Prop({ type: Date })
    birthDate: Date;
    
}

export const ProfilesSchema = SchemaFactory.createForClass(Profiles);