import { All, Controller, Module, NotFoundException, Req } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BooksModule } from './modules/books.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './modules/auth.module';
import { UserModule } from './modules/user.module';

@Controller('*') // This acts as a fallback for all unmatched routes
export class FallbackController {
  @All()
  handleAll(@Req() req: any) {
    throw new NotFoundException(`Route ${req.method} ${req.url} not found`);
  }
}
@Module({
  controllers: [FallbackController],
})
export class FallbackModule {}


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '',
      database: 'book_store',
      autoLoadEntities: true,
      synchronize: true,
    }),
    BooksModule,
    AuthModule,
    UserModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
