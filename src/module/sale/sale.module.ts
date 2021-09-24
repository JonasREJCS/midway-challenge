import { SaleController } from './sale.controller';
import { SaleService } from './sale.service';
/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { ProductModule } from '../product/product.module';
import { MongooseModule } from '@nestjs/mongoose';
import { SaleSchema } from './schemas';
import { SaleRepository } from './sale.repository';

@Module({
    imports: [MongooseModule.forFeature(
        [{ name: 'sale', schema: SaleSchema, collection: 'sale' }],
        'midwayChallenge',
),ProductModule],
    controllers: [
        SaleController,],
    providers: [
        SaleService, SaleRepository],
})
export class SaleModule { }
