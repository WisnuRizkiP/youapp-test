import { Document } from 'mongoose';
export interface IProfiles extends Document{
    readonly userId: string;
    readonly displayName: string;
    readonly gender: string;
    readonly horoscope: string;
    readonly zodiac: string;
    readonly weight: number;
    readonly height: number;
    readonly interest: string[];
}