import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';
import { ProfileDto } from './profiles.Dto';
import { Profile } from './profiles.entity';

@Injectable()
export class ProfilesService {
    constructor(@InjectRepository(Profile) private profilesRepository: Repository<Profile>) {}
    
    async getOne(id: number) {
        return await this.profilesRepository.createQueryBuilder('profile')
        .where('profile.id = :id', {id}).getOne();
    }

    async getAll() {
        return await this.profilesRepository.createQueryBuilder('profile')
        .getMany();
    }

    async updateProfile(profileDto: ProfileDto, id: number) {
        return await this.profilesRepository.createQueryBuilder()
        .update(Profile).set(profileDto).where("id = :id", {id}).execute();
    }

    async createProfile(profileDto: ProfileDto) {
        return await this.profilesRepository.createQueryBuilder()
        .insert().into(Profile).values(profileDto).execute();
    }

    async deleteProfile(id: number) {
        return await this.profilesRepository.createQueryBuilder('profile')
        .delete().from(Profile).where('id = :id', {id}).execute();
    }
}
