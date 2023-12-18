import { Body, Controller, HttpStatus, Post, Request, Response, UseGuards, Get, Put } from '@nestjs/common';
import { ProfilesService } from './profiles.service';
import { CreateProfileDto ,UpdateProfileDto} from './dto/profiles.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('profiles')
export class ProfilesController {
    constructor(
        private profileService: ProfilesService
    ){}
    
    @UseGuards(AuthGuard('jwt'))
    @Post('')
    async createProfile(
        @Request() req,
        @Response() response,
        @Body() profile: CreateProfileDto
    ){
        try {
            const isProfileExists = await this.profileService.findProfileByUserId(req.user._id)
            if( isProfileExists ){
                return response.status(HttpStatus.FOUND).json({
                    message: 'Profile Already Exists',
                });
            }

            const getHoroscopeAndZodiac = await this.profileService.findHoroscopeAndZodiac(new Date(profile.birthDate))
            profile.userId = String(req.user._id)
            profile.horoscope = getHoroscopeAndZodiac.zodiacSign
            profile.zodiac = getHoroscopeAndZodiac.animalSign

            const userCreated = await this.profileService.createProfiles(profile)
            return response.status(HttpStatus.CREATED).json({
                message: 'Student has been created successfully',
                userCreated
            });
        } catch (error) {
            console.log(error)
            return response.status(HttpStatus.BAD_REQUEST).json({
                message: 'Something went wrong',
            });
        }
    }

    @UseGuards(AuthGuard('jwt'))
    @Get('')
    async getProfile(
        @Request() req,
        @Response() response
    ){
        try {
            const isProfileExists = await this.profileService.findProfileByUserId(req.user._id)
            if( !isProfileExists ){
                return response.status(HttpStatus.NOT_FOUND).json({
                    message: 'Profile Not Found',
                });
            }

            return response.status(HttpStatus.OK).json({
                message: 'Success',
                data: isProfileExists
            });
        } catch (error) {
            console.log(error)
            return response.status(HttpStatus.BAD_REQUEST).json({
                message: 'Something went wrong',
            });
        }
    }

    @UseGuards(AuthGuard('jwt'))
    @Put('')
    async updateProfile(
        @Request() req,
        @Response() response, 
        @Body() profile: UpdateProfileDto
    ){
        try {
            const isProfileExists = await this.profileService.findProfileByUserId(req.user._id)
            if( !isProfileExists ){
                return response.status(HttpStatus.NOT_FOUND).json({
                    message: 'Profile Not Found',
                });
            }

            const newUpdateObj: any = profile

            if(profile.birthDate !== undefined){
                const newHoroscopeandZodiac = await this.profileService.findHoroscopeAndZodiac(new Date(profile.birthDate))
                newUpdateObj.horoscope = newHoroscopeandZodiac.zodiacSign
                newUpdateObj.zodiac = newHoroscopeandZodiac.animalSign
            }

            const updateProfileData = await this.profileService.updateProfileUser(newUpdateObj,String(req.user._id)) 
            return response.status(HttpStatus.OK).json({
                message: 'Success',
                data: updateProfileData
            });
        } catch (error) {
            console.log(error)
            return response.status(HttpStatus.BAD_REQUEST).json({
                message: 'Something went wrong',
            });
        }
    }

}
