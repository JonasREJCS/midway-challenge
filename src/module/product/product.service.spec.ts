import { productData } from "./product.data"
import { ProductRepository } from "./product.repository"
import { ProductService } from "./product.service"

describe('Product service', () => {
    let productService: ProductService
    let productRepository: ProductRepository


    beforeEach(async () => {
        productRepository = new ProductRepository(new Map())
        productService = new ProductService(productRepository)
        productService.initProductsDatabase(new Map)
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