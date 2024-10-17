import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot(), // Automatically loads .env variables
    MongooseModule.forRoot(process.env.MONGO_URI || 'mongodb://localhost/nest', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }),
    AuthModule,  // Import the authentication module
    UsersModule, // Import the users module
  ],
  controllers: [],  // You can register global controllers here if needed
  providers: [],    // Global services or providers if needed
})
export class AppModule { }
