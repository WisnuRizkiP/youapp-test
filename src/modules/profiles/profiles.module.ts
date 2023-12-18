import { Module } from '@nestjs/common';
import { ProfilesService } from './profiles.service';
import { ProfilesController } from './profiles.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ProfilesSchema } from './profiles.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Profile', schema:  ProfilesSchema},
   ]),
  ],
  providers: [ProfilesService],
  controllers: [ProfilesController]
})
export class ProfilesModule {}

