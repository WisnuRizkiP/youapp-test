import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IProfiles } from './interfaces/profiles.interfaces';
import { CreateProfileDto,UpdateProfileDto } from './dto/profiles.dto';

@Injectable()
export class ProfilesService {
    constructor(@InjectModel('Profile') private profileModel: Model<IProfiles>) { }

    async createProfiles(createProfileDto: CreateProfileDto): Promise<IProfiles> {
        const newProfile = await new this.profileModel(createProfileDto);
        return newProfile.save();
    }

    async findProfileByUserId(userId: string): Promise<IProfiles>{
        const profileData = await this.profileModel.findOne({
            userId: userId
        })

        return profileData
    }

    async updateProfileUser(updateData: any, userId: string): Promise<IProfiles>{
    
      const updateProfile = this.profileModel.findOneAndUpdate(
        {
          userId: userId
        },
        updateData
      )

      return updateProfile
    }

    async findHoroscopeAndZodiac(date: Date){
        interface DateRange {
            from: Date;
            to: Date;
        }
          
        type ZodiacSign =
        "Capricorn" |
        "Aquarius" |
        "Pisces" |
        "Aries" |
        "Taurus" |
        "Gemini" |
        "Cancer" |
        "Leo" |
        "Virgo" |
        "Libra" |
        "Scorpio" |
        "Sagittarius";

        const ZODIAC_SIGNS: { [key: string]: DateRange } = {
            Capricorn: {
              from: new Date(date.getFullYear(), 11, 22),
              to: new Date(date.getFullYear() + 1, 0, 19),
            },
            Aquarius: {
              from: new Date(date.getFullYear(), 0, 20),
              to: new Date(date.getFullYear(), 1, 18),
            },
            Pisces: {
              from: new Date(date.getFullYear(), 1, 19),
              to: new Date(date.getFullYear(), 2, 20),
            },
            Aries: {
              from: new Date(date.getFullYear(), 2, 21),
              to: new Date(date.getFullYear(), 3, 19),
            },
            Taurus: {
              from: new Date(date.getFullYear(), 3, 20),
              to: new Date(date.getFullYear(), 4, 20),
            },
            Gemini: {
              from: new Date(date.getFullYear(), 4, 21),
              to: new Date(date.getFullYear(), 5, 20),
            },
            Cancer: {
              from: new Date(date.getFullYear(), 5, 21),
              to: new Date(date.getFullYear(), 6, 22),
            },
            Leo: {
              from: new Date(date.getFullYear(), 6, 23),
              to: new Date(date.getFullYear(), 7, 22),
            },
            Virgo: {
              from: new Date(date.getFullYear(), 7, 23),
              to: new Date(date.getFullYear(), 8, 22),
            },
            Libra: {
              from: new Date(date.getFullYear(), 8, 23),
              to: new Date(date.getFullYear(), 9, 22),
            },
            Scorpio: {
              from: new Date(date.getFullYear(), 9, 23),
              to: new Date(date.getFullYear(), 10, 22),
            },
            Sagittarius: {
              from: new Date(date.getFullYear(), 10, 23),
              to: new Date(date.getFullYear(), 11, 21),
            },
        };
        
          const ANIMAL_SIGNS: { [key in ZodiacSign]: string } = {
            Capricorn: "goat",
            Aquarius: "water bearer",
            Pisces: "fish",
            Aries: "ram",
            Taurus: "bull",
            Gemini: "twins",
            Cancer: "crab",
            Leo: "lion",
            Virgo: "maiden",
            Libra: "scales",
            Scorpio: "scorpion",
            Sagittarius: "archer",
          };
        
          for (const [sign, range] of Object.entries(ZODIAC_SIGNS)) {
            if (date >= range.from && date <= range.to) {
              return { zodiacSign: sign, animalSign: ANIMAL_SIGNS[sign] };
            }
        }
    }
}
