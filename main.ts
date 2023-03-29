//Точка входа в программу, здесь происходит запуск сервера
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

//Метод создает экземпляр приложения и запускает его
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000, () => console.log('Сервер запущен'));
}

bootstrap();
