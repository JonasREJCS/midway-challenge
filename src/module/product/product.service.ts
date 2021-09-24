/*
https://docs.nestjs.com/providers#services
*/

import { Injectable, Logger } from '@nestjs/common';
import { productData } from './product.data';
import { ProductInterface } from './product.interface';
import { ProductRepository } from './product.repository';

@Injectable()
export class ProductService {
    private readonly logger = new Logger(ProductService.name);

    constructor(private productRepository: ProductRepository) {}

    public async getProductById(id: number): Promise<ProductInterface> {
        return await this.productRepository.findById(id)
    }

    private createProductKey(item: ProductInterface) {
        return item.nome.trim().toUpperCase() + '|' + item.valor + '|' + item.tamanho.trim().toUpperCase();
    }

    private getUpdatedProduct(oldProduct: ProductInterface, estoqueToAdd: number): ProductInterface {
        const updatedProduct: ProductInterface = {... oldProduct}
        updatedProduct.estoque += estoqueToAdd;
        updatedProduct.dataAtualizacao = new Date();

        return updatedProduct
    }

    private addUniqueProduct(item: ProductInterface, productMap: Map<string, ProductInterface> ): void {
        const key = this.createProductKey(item)

        if (productMap.has(key)) {
            const product: ProductInterface = productMap.get(key);

            const updatedProduct: ProductInterface = this.getUpdatedProduct(product, item.estoque);

            productMap.set(key, updatedProduct)
        } else {
            productMap.set(key, item)
        }
    }

    public getDistinctProducts(products: ProductInterface[]): ProductInterface[] {
        const result: Map<string, ProductInterface> = new Map()
        
        products.forEach(item => this.addUniqueProduct(item, result))

        return Array.from(result.values())
    }

    public async initProductsDatabase(): Promise<void> {
        const initialProducts: ProductInterface[] = this.getDistinctProducts(productData)

        const promises = []
        initialProducts.forEach((value: ProductInterface) => promises.push(this.productRepository.save(value)))
        
        await Promise.all(promises)

        this.logger.log('Database initialized')
    }
}
