import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScoreModule } from './api/score/score.module';

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
    ScoreModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
