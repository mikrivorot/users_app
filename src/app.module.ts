import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './authentication/authentication.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, }),
    MongooseModule.forRoot(
      process.env.MONGO_URI ||
      `mongodb://${process.env.MONGO_USERNAME}:${process.env.MONGO_USERNAME}@localhost:${process.env.MONGO_PORT}/${process.env.MONGO_DB}?authSource=admin`),
    AuthModule,
    UsersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
