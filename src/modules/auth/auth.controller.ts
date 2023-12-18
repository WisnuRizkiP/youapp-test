import { Controller, Body, Post, UseGuards, Request,Response, HttpStatus, Req } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service'; 
import { CreateUserDto } from '../users/dto/create-users.dto';
import { LoginUserDto } from '../users/dto/login-users.dto';
import { UserService } from '../users/users.service';

@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService,
        private userService: UserService
    ) {}

    @UseGuards(AuthGuard('local'))
    @Post('login')
    async login(@Request() req ,@Response() response,@Body() user: LoginUserDto) {
        try {
            const userData = await this.authService.login(req.user);
            return response.status(HttpStatus.CREATED).json({
                message: 'Student has been created successfully',
                userData
            });
        } catch (error) {
            return response.status(HttpStatus.BAD_REQUEST).json({
                message: 'Something went wrong',
            });
        }
    }

    @Post('signup')
    async signUp(@Response() response,@Body() user: CreateUserDto) {
        try {
            const checkUserExist = await this.userService.findUserByEmailOrUsername(user.username,user.email)
            if(checkUserExist){
                return response.status(HttpStatus.FOUND).json({
                    message: 'User alredy Exists',
                });   
            }

            const isPasswordMatch = user.password === user.confirmPassword ? true :  false
            if( !isPasswordMatch ){
                return response.status(HttpStatus.BAD_REQUEST).json({
                    message: 'Password not match',
                });   
            }

            const createUser = await this.authService.create(user)
            return response.status(HttpStatus.CREATED).json({
                message: 'Student has been created successfully',
                data: createUser
            });            
        } catch (error) {
            return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                    message: 'Something went wrong',
                });   
        }
    }
}