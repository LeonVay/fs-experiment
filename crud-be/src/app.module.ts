import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfiguration } from 'config/typeorm.config';
import { ProjectsModule } from 'libs/projects/projects.module';
import { UsersModule } from 'libs/users/users.module';
import { AuthModule } from 'libs/auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfiguration),
    ProjectsModule,
    UsersModule,
    AuthModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
