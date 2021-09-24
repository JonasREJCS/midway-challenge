export interface ProductInterface {
    id?: number
    nome: string
    valor: number
    estoque: number
    tamanho: string
    tipo: string
    descricao: string
    dataCadastro: Date
    dataAtualizacao?: Date
}