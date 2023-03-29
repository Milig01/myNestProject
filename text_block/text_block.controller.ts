import { Body, Controller, Delete, Get, Param, Post, Put, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { FilesService } from 'src/files/files.service';
import { Roles } from 'src/roles/roles.decorator';
import { TextBlockDto } from './text_block.Dto';
import { TextBlockService } from './text_block.service';

@Controller('text-block')
export class TextBlockController {
    constructor(
        private textBlockService: TextBlockService,
        private filesService: FilesService
        ) {}

    @Get()
    async getAllBlocks() { // получить все блоки вместе с картинками
        let textBlocks = await this.textBlockService.getAllBlocks();

        for (let textBlock of textBlocks) {
            if (textBlock.imageName == null) continue;

            textBlock['image'] = this.filesService.getFile(textBlock.imageName); // у каждого блока в свойстве ["image"] хранится буфер
        }

        return textBlocks;
    }

    @Get(':group') // указать название группы, блоки которой надо получить вместе с картинками
    async getBlockFromGroup(@Param('group') group: string) {
        let textBlocks = await this.textBlockService.getBlockFromGroup(group);

        for (let textBlock of textBlocks) {
            if (textBlock.imageName == null) continue;

            textBlock['image'] = this.filesService.getFile(textBlock.imageName);
        }

        return textBlocks;
    }

    @Post()
    @Roles('Admin')
    @UseInterceptors(FileInterceptor('image')) // добавить блок, в свойстве image - передать изображение
    async createBlock(@Body() textBlockDto: TextBlockDto, @UploadedFile() image: Express.Multer.File) {
        if (image) textBlockDto.imageName = this.filesService.loadFile(image);

        let textBlock = await this.textBlockService.createBlock(textBlockDto);

        if (image) this.filesService.saveFile(textBlock.imageName, 'text_block', textBlock.id);

        return textBlock;
    }

    @Put()
    @Roles('Admin')
    @UseInterceptors(FileInterceptor('image'))
    async uptadeBlock(@Body() textBlockDto: TextBlockDto, @UploadedFile() image) {
        if (!image) {
            return await this.textBlockService.updateBlock(textBlockDto);
        } else {
            textBlockDto.imageName = this.filesService.loadFile(image);
            let textBlock = await this.textBlockService.updateBlock(textBlockDto);

            await this.filesService.setEssenceNull('text_block', textBlock.id);
            return await this.filesService.saveFile(textBlock.imageName, 'text_block', textBlock.id);
        }
    }

    @Delete(':uniqName')
    @Roles('Admin')
    async deleteBlock(@Param('uniqName') uniqName: string) {
        let textBlock = await this.textBlockService.getOneBlock(uniqName);
        this.filesService.setEssenceNull('text_block', textBlock.id);

        return await this.textBlockService.deleteBlock(uniqName);
    }
}
