import { forwardRef, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from '../service/auth.service';
import { JwtStrategy } from 'src/jwt.strategy';
import { AuthController } from '../controller/auth.controller';
import { UserModule } from './user.module';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: process.env.secret|| 'defaultSecret', // Use a more secure way of handling this, like environment variables
      signOptions: { expiresIn: '1h' }, // Token expiration time
    }),
    // Use forwardRef to avoid circular dependency
    forwardRef(() => UserModule),
  ],
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController],
  exports: [JwtStrategy, PassportModule], // Exporting JwtStrategy for use in other modules
})
export class AuthModule {}
