import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { configService } from './config/config.service';

@Module({
  imports: [MongooseModule.forRoot(configService.getMongoConfig())],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
