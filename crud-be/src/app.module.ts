import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Projects, ProjectsModule } from '@backend/projects';
import { User, UsersModule } from '@backend/users';
import { AuthEntity, AuthModule } from '@backend/auth';
import { Impact, ImpactsModule } from '@backend/impacts';
import { AttackType, AttackTypeModule } from '@backend/attack-type';
import { ConnectionEntity, ConnectionModule } from '@backend/connections';
import { HardwareModule } from '../libs/hardware/src/lib/hardware.module';
import { HardwareEntity } from '../libs/hardware/src/lib/repository/hardware.entity';

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
          AttackType,
          ConnectionEntity,
          HardwareEntity
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
      AttackTypeModule,
      ConnectionModule,
      HardwareModule

  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
