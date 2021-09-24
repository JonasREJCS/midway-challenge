import { model } from "mongoose"
import { productDatabaseMock } from "./mocks/productDatabase.mock"
import { productData } from "./product.data"
import { ProductInterface } from "./product.interface"
import { ProductRepository } from "./product.repository"
import { ProductService } from "./product.service"

describe('Product service', () => {
    let productService: ProductService
    let productRepository: ProductRepository
    let productModel = {
        findOne: async (): Promise<ProductInterface> => Promise.resolve(productDatabaseMock),
        findOneAndUpdate: async (): Promise<ProductInterface> => Promise.resolve(productDatabaseMock),
    }

    beforeEach(async () => {
        productRepository = new ProductRepository(model as any)
        productService = new ProductService(productRepository)
    })

    it('Should be defined', () => {
        expect(productService).toBeDefined()
    })

    it('Should remove product duplicates', () => {
        const productsDataCopy = [...productData]
        const result = productService.getDistinctProducts(productsDataCopy)

        expect(result).toStrictEqual([
            {
                id: 1,
                nome: "Calça",
                valor: 100,
                estoque: 8,
                tamanho: "M",
                tipo: "Jeans",
                descricao: "Calça Jeans",
                dataCadastro: new Date("2021-06-20T20:32:36.931Z"),
                dataAtualizacao: result[0].dataAtualizacao
            }
        ])
    })
})