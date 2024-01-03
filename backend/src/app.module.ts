import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { HogeModule } from './apis/hoge/hoge.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'front_dist'),
      serveStaticOptions: {
        fallthrough: false,
      },
      exclude: ['/api*'],
    }),
    TypeOrmModule.forRoot({ ...require('../ormconfig') }),
    HogeModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
