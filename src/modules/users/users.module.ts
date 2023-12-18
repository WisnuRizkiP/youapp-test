import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserService } from './users.service';
import { UsersSchema } from './users.schema';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: 'User', schema: UsersSchema },
        ]),
    ],
    providers: [UserService],
    exports: [UserService]
})
export class UsersModule {}
