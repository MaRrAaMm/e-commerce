import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './User/user.module.js';
import { DashboardModule } from './Dashboard/dashboard.module.js';
import { SellerModule } from './Seller/seller.module.js';

@Module({
  imports: [
    MongooseModule.forRoot(process.env.DB_URL as string), 
    AuthModule, 
    UserModule,
    DashboardModule,
    SellerModule,
    
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
