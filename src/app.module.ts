import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { LoggerMiddleware } from './common/middleware/logger.middleware';
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
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*'); // apply to ALL routes
  }
}
