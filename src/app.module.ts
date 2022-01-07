import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PostsModule } from './posts/posts.module';
import { DatabaseModule } from './database/database.module';
import { configValidationSchema } from './database';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { CategoriesModule } from './categories/categories.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [`.env.${process.env.STAGE}`],
      validationSchema: configValidationSchema,
    }),
    PostsModule,
    DatabaseModule,
    UsersModule,
    AuthModule,
    CategoriesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
