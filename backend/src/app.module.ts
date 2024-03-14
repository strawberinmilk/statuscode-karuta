import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScoreModule } from './api/score/score.module';
import { AuthModule } from './api/auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { InitModule } from './init/init.module';

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
    ConfigModule.forRoot({ isGlobal: true }),
    ScoreModule,
    AuthModule,
    InitModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
