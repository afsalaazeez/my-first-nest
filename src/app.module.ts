import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { CatsModule } from './cats/cats.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://afsalaazeez:WfjEKVV2GZHJYaFj@cluster0.b1txszn.mongodb.net/catsdb?retryWrites=true&w=majority&appName=Cluster0',
    ), // 👈 your database URL
    CatsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
