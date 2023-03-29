import { Controller, Post, UseInterceptors, UploadedFile, Delete, Get } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Roles } from 'src/roles/roles.decorator';
import { FilesService } from './files.service';

@Controller('files')
export class FilesController {
    constructor(private filesService: FilesService) {}
    @Get()
    async getFiles() {
        return await this.filesService.getFilesFromDb(); // получить файлы из базы данных
    }

    @Post('upload')
    @UseInterceptors(FileInterceptor('file'))
    async uploadFile(@UploadedFile() file) { // сохраняет файл в папке upload, а также в базе данных
        let fileName = this.filesService.loadFile(file);
        this.filesService.saveFile(fileName);

        return fileName;
    }

    @Roles("Admin")
    @Delete()
    async deleteFiles() { // удаляет все "ненужные файлы"
        let files = await this.filesService.searchUnnecessaryFiles();
        files = files.filter(item => (Date.now() - item.createdAt.getTime()) > 3600 * 1000);

        if (files.length == 0) return;

        this.filesService.deleteFilesFromDb(files);

        return this.filesService.deleteFiles(files);
    }
}
