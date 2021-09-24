import { productDatabaseMock } from "../product/mocks/productDatabase.mock"
import { ProductInterface } from "../product/product.interface"
import { ProductRepository } from "../product/product.repository"
import { ProductService } from "../product/product.service"
import { SaleInterface } from "./interfaces"
import { saleDatabaseMock } from "./mocks/saleDatabase.mock"
import { SaleRepository } from "./sale.repository"
import { SaleService } from "./sale.service"
import { SaleErrorsEnum } from "./saleErrors.enum"

describe('Sale service', () => {
    let saleService: SaleService
    let saleModel = {
        create: async (): Promise<SaleInterface> => Promise.resolve(saleDatabaseMock),
        findByIdAndDelete: async (): Promise<void> => Promise.resolve(null),
        findOne: async (): Promise<SaleInterface> => Promise.resolve(saleDatabaseMock),
    }
    let productModel = {
        findOne: async (): Promise<ProductInterface> => Promise.resolve(productDatabaseMock),
        findOneAndUpdate: async (): Promise<ProductInterface> => Promise.resolve(productDatabaseMock),
    }
    let productService: ProductService
    let saleRepository: SaleRepository
    let productRepository: ProductRepository

    beforeEach(() => {
        saleModel = {
            create: async (): Promise<SaleInterface> => Promise.resolve(saleDatabaseMock),
            findByIdAndDelete: async (): Promise<void> => Promise.resolve(null),
            findOne: async (): Promise<SaleInterface> => Promise.resolve(saleDatabaseMock),
        }
        productModel = {
            findOne: async (): Promise<ProductInterface> => Promise.resolve(productDatabaseMock),
            findOneAndUpdate: async (): Promise<ProductInterface> => Promise.resolve(productDatabaseMock),
        }
        productRepository = new ProductRepository(productModel as any)
        saleRepository = new SaleRepository(saleModel as any)
        productService = new ProductService(productRepository)
        saleService = new SaleService(saleRepository, productService)
    })

    it('Should be defined', () => {
        expect(saleService).toBeDefined()
    })

    it('Should return registered sale', async () => {
        const now = new Date()
        const result = await saleService.registerSale({
            cpf: '212.193.640-88',
            saleDate: now,
            soldProductId: 1
        })

        const saleDatabaseMockCopy = { ...saleDatabaseMock }

        delete saleDatabaseMockCopy._id
        delete result._id
        delete saleDatabaseMockCopy.fiscalNote.id
        delete result.fiscalNote.id

        saleDatabaseMockCopy.fiscalNote.saleDate = now

        expect(result).toStrictEqual(saleDatabaseMockCopy)
    })

    it('[ERROR] Should throw error if sale registration is called and product is not found', async () => {
        productModel = {
            findOne: async (): Promise<ProductInterface> => Promise.resolve(null),
            findOneAndUpdate: async (): Promise<ProductInterface> => Promise.resolve(null),
        }

        productRepository = new ProductRepository(productModel as any)
        saleRepository = new SaleRepository(saleModel as any)
        productService = new ProductService(productRepository)
        saleService = new SaleService(saleRepository, productService)
        
        await expect(saleService.registerSale({
            cpf: '212.193.640-88',
            saleDate: new Date(),
            soldProductId: 1
        })).rejects.toThrowError(SaleErrorsEnum.REGISTRATION_PRODUCT_NOT_FOUND)
    })

    it('[ERROR] Should throw error if sale registration is called and product is out of stock', async () => {
        const outOfStockProduct: ProductInterface = {... productDatabaseMock}
        outOfStockProduct.estoque = 0
        
        productModel = {
            findOne: async (): Promise<ProductInterface> => Promise.resolve(outOfStockProduct),
            findOneAndUpdate: async (): Promise<ProductInterface> => Promise.resolve(outOfStockProduct),
        }

        productRepository = new ProductRepository(productModel as any)
        saleRepository = new SaleRepository(saleModel as any)
        productService = new ProductService(productRepository)
        saleService = new SaleService(saleRepository, productService)
        
        await expect(saleService.registerSale({
            cpf: '212.193.640-88',
            saleDate: new Date(),
            soldProductId: 1
        })).rejects.toThrowError(SaleErrorsEnum.PRODUCT_OUT_OF_STOCK)
    })

    it('Should cancel sale', async () => {
        await expect(saleService.cancelSale({
            cpf: '212.193.640-88',
            productId: 1,
            fiscalNoteId: '1',
        })).resolves.not.toThrow()
    })

    it('[ERROR] Should throw error if sale cancelation is called and product is not found', async () => {
        saleModel = {
            create: async (): Promise<SaleInterface> => Promise.resolve(saleDatabaseMock),
            findByIdAndDelete: async (): Promise<void> => Promise.resolve(null),
            findOne: async (): Promise<SaleInterface> => Promise.resolve(null),
        }
        productModel = {
            findOne: async (): Promise<ProductInterface> => Promise.resolve(null),
            findOneAndUpdate: async (): Promise<ProductInterface> => Promise.resolve(null),
        }

        productRepository = new ProductRepository(productModel as any)
        saleRepository = new SaleRepository(saleModel as any)
        productService = new ProductService(productRepository)
        saleService = new SaleService(saleRepository, productService)
        
        await expect(saleService.cancelSale({
            cpf: '212.193.640-88',
            productId: 1,
            fiscalNoteId: '1',
        })).rejects.toThrowError(SaleErrorsEnum.CANCELATION_PRODUCT_NOT_FOUND)
    })

    it('[ERROR] Should throw error if sale cancelation is called and sale is not found', async () => {
        saleModel = {
            create: async (): Promise<SaleInterface> => Promise.resolve(saleDatabaseMock),
            findByIdAndDelete: async (): Promise<void> => Promise.resolve(null),
            findOne: async (): Promise<SaleInterface> => Promise.resolve(null),
        }
        productModel = {
            findOne: async (): Promise<ProductInterface> => Promise.resolve(productDatabaseMock),
            findOneAndUpdate: async (): Promise<ProductInterface> => Promise.resolve(productDatabaseMock),
        }
        
        productRepository = new ProductRepository(productModel as any)
        saleRepository = new SaleRepository(saleModel as any)
        productService = new ProductService(productRepository)
        saleService = new SaleService(saleRepository, productService)
        
        await expect(saleService.cancelSale({
            cpf: '212.193.640-88',
            productId: 1,
            fiscalNoteId: '1',
        })).rejects.toThrowError(SaleErrorsEnum.SALE_CANCELATION_NOT_FOUND)
    })

    it('[ERROR] Should throw error if sale cancelation is called and cpf is undefined', async () => {
        await expect(saleService.cancelSale({
            cpf: undefined,
            productId: 1,
            fiscalNoteId: '1',
        })).rejects.toThrowError(SaleErrorsEnum.INVALID_CPF)
    })

    it('[ERROR] Should throw error if sale cancelation is called and productId is undefined', async () => {
        await expect(saleService.cancelSale({
            cpf: '212.193.640-88',
            productId: undefined,
            fiscalNoteId: '1',
        })).rejects.toThrowError(SaleErrorsEnum.INVALID_PRODUCT_ID)
    })

    it('[ERROR] Should throw error if sale cancelation is called and fiscalNoteId is undefined', async () => {
        await expect(saleService.cancelSale({
            cpf: '212.193.640-88',
            productId: 1,
            fiscalNoteId: undefined,
        })).rejects.toThrowError(SaleErrorsEnum.INVALID_FISCAL_NOTE_ID)
    })


    it('Should trim cpf and return registered sale', async () => {
        const now = new Date()
        const result = await saleService.registerSale({
            cpf: '    212.193.640-88     ',
            saleDate: now,
            soldProductId: 1
        })

        const saleDatabaseMockCopy = { ...saleDatabaseMock }

        delete saleDatabaseMockCopy._id
        delete result._id
        delete saleDatabaseMockCopy.fiscalNote.id
        delete result.fiscalNote.id

        saleDatabaseMockCopy.fiscalNote.saleDate = now

        expect(result).toStrictEqual(saleDatabaseMockCopy)
    })

    it('[ERROR] Should throw error if cpf is undefined', async () => {
        expect(saleService.registerSale({
            cpf: undefined,
            saleDate: new Date(),
            soldProductId: 1
        })).rejects.toThrowError(SaleErrorsEnum.INVALID_CPF)
    })

    it('[ERROR] Should throw error if cpf is null', async () => {
        expect(saleService.registerSale({
            cpf: null,
            saleDate: new Date(),
            soldProductId: 1
        })).rejects.toThrowError(SaleErrorsEnum.INVALID_CPF)
    })


    it('[ERROR] Should throw error if saleDate is undefined', async () => {
        expect(saleService.registerSale({
            cpf: '212.193.640-88',
            saleDate: undefined,
            soldProductId: 1
        })).rejects.toThrowError(SaleErrorsEnum.INVALID_DATE)
    })

    it('[ERROR] Should throw error if saleDate is null', async () => {
        expect(saleService.registerSale({
            cpf: '212.193.640-88',
            saleDate: null,
            soldProductId: 1
        })).rejects.toThrowError(SaleErrorsEnum.INVALID_DATE)
    })

    it('[ERROR] Should throw error if soldProductId is undefined', async () => {
        expect(saleService.registerSale({
            cpf: '212.193.640-88',
            saleDate: new Date(),
            soldProductId: undefined
        })).rejects.toThrowError(SaleErrorsEnum.INVALID_PRODUCT_ID)
    })

    it('[ERROR] Should throw error if soldProductId is null', async () => {
        expect(saleService.registerSale({
            cpf: '212.193.640-88',
            saleDate: new Date(),
            soldProductId: null
        })).rejects.toThrowError(SaleErrorsEnum.INVALID_PRODUCT_ID)
    })
})