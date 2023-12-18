import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import * as dotenv from 'dotenv';
// import { UsersSchema } from 'src/modules/users/users.schema';
dotenv.config();
@Module({
    imports: [
        MongooseModule.forRoot(process.env.DATABASE_URL,{dbName: 'youapp'}),
        // MongooseModule.forFeature([
        //     { name: 'User', schema: UsersSchema },
        // ]),
    ]
})
export class DatabaseModule {}
