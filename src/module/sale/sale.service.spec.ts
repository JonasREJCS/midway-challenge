import { ProductRepository } from "../product/product.repository"
import { ProductService } from "../product/product.service"
import { SaleService } from "./sale.service"

describe('Sale service', () => {
    let saleService: SaleService
    let productService: ProductService
    let productRepository: ProductRepository

    beforeEach(() => {
        productRepository = new ProductRepository(new Map())
        productService = new ProductService(productRepository)
        productService.initProductsDatabase()
        saleService = new SaleService(productRepository)
    })

    it('Should be defined', () => {
        expect(saleService).toBeDefined()
    })

    it('Should return registered sale', () => {
        const now = new Date()
        const id = '11111'
        const result = saleService.registerSale({
            cpf: '212.193.640-88',
            saleDate: now,
            soldProductId: 1
        })

        result.fiscalNote.id = id

        expect(result).toStrictEqual({
            "fiscalNote": {
                "cpf": "212.193.640-88",
                "id": id,
                "productId": 1,
                "saleDate": now,
            },
            "productData": {
                "descricao": "Calça Jeans",
                "id": 1,
                "nome": "Calça",
                "tamanho": "M",
                "tipo": "Jeans"
            }
        })
    })

})