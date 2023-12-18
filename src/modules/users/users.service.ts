import { Injectable, NotFoundException, } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from "mongoose";
import { CreateUserDto } from './dto/create-users.dto';
import { IUser } from './interfaces/users.interfaces';

@Injectable()
export class UserService {
    constructor(@InjectModel('User') private userModel: Model<IUser>) { }

    async createStudent(createUserDto: CreateUserDto): Promise<IUser> {
        const newStudent = await new this.userModel(createUserDto);
        return newStudent.save();
    }

    async findUserById(id: string): Promise<IUser>{
        const userData = this.userModel.findById(id)
        return userData
            
    }

    async findUserByCredential(credential: string): Promise<IUser>{
        const isUserExist =  await this.userModel.findOne({
            $or: [
                {username: credential},
                {email: credential}
            ]
        })
        if(!isUserExist){
            throw new NotFoundException("Not found")
        }
        return isUserExist
    }

    async findUserByEmailOrUsername(username: string, email: string): Promise<IUser> {
        const isUserExist =  await this.userModel.findOne({
            $or: [
                {username: username},
                {email: email}
            ]
        })
        return isUserExist
    }

    // async updateStudent(studentId: string, updateStudentDto: UpdateStudentDto): Promise<IStudent> {
    //     const existingStudent = await this.studentModel.findByIdAndUpdate(studentId, updateStudentDto, { new: true });
    //     if (!existingStudent) {
    //         throw new NotFoundException(`Student #${studentId} not found`);
    //     }
    //     return existingStudent;
    // }

    // async getAllStudents(): Promise<IStudent[]> {
    //     const studentData = await this.studentModel.find();
    //     if (!studentData || studentData.length == 0) {
    //         throw new NotFoundException('Students data not found!');
    //     }
    //     return studentData;
    // }

    // async getStudent(studentId: string): Promise<IStudent> {
    //     const existingStudent = await this.studentModel.findById(studentId).exec();
    //     if (!existingStudent) {
    //         throw new NotFoundException(`Student #${studentId} not found`);
    //     }
    //     return existingStudent;
    // }

    // async deleteStudent(studentId: string): Promise<IStudent> {
    //     const deletedStudent = await this.studentModel.findByIdAndDelete(studentId);
    //     if (!deletedStudent) {
    //         throw new NotFoundException(`Student #${studentId} not found`);
    //     }
    //     return deletedStudent;
    // }
}
