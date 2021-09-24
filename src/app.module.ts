import { SaleModule } from './module/sale/sale.module';
import { ProductModule } from './module/product/product.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { dbURI } from './core/config';
import { MongooseModule } from '@nestjs/mongoose';


@Module({
  imports: [
    MongooseModule.forRoot(`${dbURI}`, { connectionName: 'midwayChallenge' }),
    SaleModule,
    ProductModule,],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
