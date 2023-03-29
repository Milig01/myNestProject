import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FilesService } from 'src/files/files.service';
import { Repository } from 'typeorm';
import { TextBlockDto } from './text_block.Dto';
import { TextBlock } from './text_block.entity';

@Injectable()
export class TextBlockService {
    constructor(
        @InjectRepository(TextBlock) private textBlocksRepository: Repository<TextBlock>) {}
    
    async getOneBlock(uniqName: string): Promise<TextBlock> {
        return await this.textBlocksRepository.findOneBy({uniqName});
    }

    async getAllBlocks() {
        return await this.textBlocksRepository.createQueryBuilder('textBlock').getMany();
    }

    async getBlockFromGroup(group: string) {
        return await this.textBlocksRepository.createQueryBuilder("text_block")
        .where('text_block.group = :group', {group}).getMany();
    }

    async createBlock(textBlockDto: TextBlockDto) {
        await this.textBlocksRepository.createQueryBuilder()
        .insert().into(TextBlock).values(textBlockDto).execute();
        
        let textBlock = await this.textBlocksRepository.findOneBy(textBlockDto);

        return textBlock;
    }

    async updateBlock(textBlockDto: TextBlockDto) {
        await this.textBlocksRepository.createQueryBuilder()
        .update(TextBlock).set(textBlockDto).where("uniqName = :uniqName", textBlockDto).execute();

        let textBlock = await this.textBlocksRepository.findOneBy(textBlockDto);

        return textBlock;
    }

    async deleteBlock(uniqName: string) {
        return await this.textBlocksRepository.createQueryBuilder('text_block')
        .delete().from(TextBlock).where('uniqName = :uniqName', {uniqName}).execute();
    }
}
