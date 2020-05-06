import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Projects, ProjectsModule } from '@backend/projects';
import { User, UsersModule } from '@backend/users';
import { AuthEntity, AuthModule } from '@backend/auth';
import { Impact, ImpactsModule } from '@backend/impacts';
import { AttackType, AttackTypeModule } from '@backend/attack-type';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'tmp/db.sql',
      entities: [
        Projects,
        User,
        AuthEntity,
        Impact,
        AttackType
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
    AuthModule,
    ImpactsModule,
    AttackTypeModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
