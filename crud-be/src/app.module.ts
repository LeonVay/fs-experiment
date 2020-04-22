import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Projects, ProjectsModule } from '@backend/projects';
import { User, UsersModule } from '@backend/users';
import { AuthEntity, AuthModule } from '@backend/auth';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'tmp/db.sql',
      entities: [
        Projects,
        User,
        AuthEntity
      ],
      // entities: ["dist/**/*.entity{.ts,.js}"],
      logging: true,
      synchronize: true

      /*For PG
      type: 'postgres',
      host: ...,
      port: ...,
      login: ...,
      password: ...,
      database: pgBaseName

      */
    }),
    ProjectsModule,
    UsersModule,
    AuthModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
