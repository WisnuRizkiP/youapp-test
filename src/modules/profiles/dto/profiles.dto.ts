import { IsNumber, IsString,ArrayMinSize, IsDate, IsOptional } from "class-validator";
import { Transform,Type } from "class-transformer";
export class CreateProfileDto {

    @IsString()
    @IsOptional()
    userId: string = '';

    @IsString()
    readonly displayName: string;

    @IsString()
    readonly gender: string;

    @IsString()
    horoscope: string = '';

    @IsString()
    zodiac: string = '';

    @IsNumber()
    readonly weight: number;

    @IsNumber()
    readonly height: number;

    @IsString({ each: true })
    @ArrayMinSize(1)
    readonly interest: string;

    @IsDate()
    @Transform(({ value }) => new Date(value))
    @Type(() => Date)
    birthDate: Date; 
    
}

export class UpdateProfileDto {

    @IsString()
    @IsOptional()
    displayName: string;

    @IsString()
    @IsOptional()
    gender: string;

    @IsNumber()
    @IsOptional()
    weight: number;

    @IsNumber()
    @IsOptional()
    height: number;

    @IsString({ each: true })
    @ArrayMinSize(1)
    @IsOptional()
    interest: string;

    @IsDate()
    @Transform(({ value }) => new Date(value))
    @Type(() => Date)
    @IsOptional()
    birthDate: Date; 
    
}