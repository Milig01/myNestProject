import { Injectable, StreamableFile } from '@nestjs/common';
import * as fs from 'fs';
import * as uuid from 'uuid';
import * as path from 'path';
import { File } from './files.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class FilesService {
    constructor(@InjectRepository(File) private filesRepository: Repository<File>) {}

    loadFile(file: Express.Multer.File) { // сохраняет файл в папке и возвращает его название с расширением
        let exe = file.mimetype.slice(file.mimetype.lastIndexOf('/') + 1);

        let fileName = uuid.v4() + '.' + exe;
        let filePath = path.resolve(__dirname, '..', '..', 'upload');

        fs.writeFileSync(path.join(filePath, fileName), file.buffer);

        return fileName;
    }

    async saveFile(fileName: string, essenceTable: string = null, essenceId: number = null) { // сохраняет файл в базе данных
        this.filesRepository.createQueryBuilder()
        .insert().into(File).values({name: fileName, createdAt: new Date(), essenceTable, essenceId}).execute();
    }

    getFile(fileName: string) { // получаем файл из папки upload
        let filePath = path.resolve(__dirname, '..', '..', 'upload');

        if (!fs.existsSync(path.join(filePath, fileName))) return null;

        let file = fs.readFileSync(path.join(filePath, fileName));

        return file;
    }

    async getFilesFromDb() { // получаем все файлы из базы данных
        return await this.filesRepository.createQueryBuilder().getMany();
    }

    deleteFiles(files: File[]) { // удаляет массив файлов из папки upload
        let filePath = path.resolve(__dirname, '..', '..', 'upload');

        for (let file of files) {
            fs.unlinkSync(path.join(filePath, file.name));
        }
    }

    async deleteFilesFromDb(files: File[]) { // удаляет файлы из базы данных по имени
        let names = files.map(item => item.name);

        return await this.filesRepository.createQueryBuilder('file')
        .delete().from(File).where('name IN (:...names)', {names}).execute();
    }

    async setEssenceNull(essenceTable: string, essenceId: number) { // значения essenceTable и essenceId устанавливаем в null
        return await this.filesRepository.createQueryBuilder('file')
        .update().set({essenceTable: null, essenceId: null}).where('essenceTable = :essenceTable', {essenceTable})
        .andWhere('essenceId = :essenceId', {essenceId}).execute();
    }

    async searchUnnecessaryFiles() { // находит файлы в базе данных где essence == null
        return await this.filesRepository.createQueryBuilder('file')
        .where('file.essenceTable is null').orWhere('file.essenceId is null').getMany();
    }
}
