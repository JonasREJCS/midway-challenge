import { ProductService } from './product.service';
/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { ProductRepository } from './product.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductSchema } from './product.schema';

@Module({
    imports: [MongooseModule.forFeature(
        [{ name: 'product', schema: ProductSchema, collection: 'product' }],
        'midwayChallenge',
),],
    controllers: [],
    providers: [
        ProductService, ProductRepository],
        exports: [ProductService]
})
export class ProductModule { }
