import { SaleInterface } from "../interfaces";

export const saleDatabaseMock: SaleInterface = {
    "productData": {
        "id": 1,
        "nome": "Calça",
        "tipo": "Jeans",
        "tamanho": "M",
        "descricao": "Calça Jeans"
    },
    "fiscalNote": {
        "productId": 1,
        "cpf": "212.193.640-88",
        "saleDate": new Date("2021-01-23T00:00:00.000Z")
    },
}