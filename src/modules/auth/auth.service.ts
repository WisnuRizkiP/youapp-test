import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UserService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService,
    ) { }

    async validateUser(credential: string, pass: string) {
        // find if user exist with this email
        const user = await this.userService.findUserByCredential(credential);
        if (!user) {
            return null;
        }
        // find if user password match
        const match = await this.comparePassword(pass, user.password);
        if (!match) {
            return null;
        }

        // tslint:disable-next-line: no-string-literal
        //const { password, ...result } = user['dataValues'];
        return user;
    }

    public async login(user) {
        const userObj = {     
            id: user._id,
            username: user.username,
            email: user.email
        }
        const token = await this.generateToken(userObj);
        return { userObj, token };
    }

    public async create(user) {
        const pass = await this.hashPassword(user.password);
        const newUser = await this.userService.createStudent({ ...user, password: pass });
        const token = await this.generateToken({
            id: newUser._id,
            email:newUser.email,
            username: newUser.username
        });
        
        return {  newUser,token };
    }

    private async generateToken(user) {
        const token = await this.jwtService.signAsync(user);
        return token;
    }

    private async hashPassword(password) {
        const hash = await bcrypt.hash(password, 10);
        return hash;
    }

    private async comparePassword(enteredPassword, dbPassword) {
        const match = await bcrypt.compare(enteredPassword, dbPassword);
        return match;
    }
}