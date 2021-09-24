<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# run docker containers
$ docker-compose up  

# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).

# Desafio Node.js Midway/Riachuelo:

Nosso desafio consiste em 2 partes, ambos podem ser entregues no mesmo repositório de sua preferência. Em caso de dúvidas, favor nos contate pelo e-mail utilizado para envio deste arquivo.

Após finalizar, nos informe via e-mail para que possamos realizar a validação da solução proposta :)

## Parte 1:

Em uma loja do grupo, devido a um erro humano, tivemos um problema de duplicação de cadastro de itens de estoque. Identificamos o problema e precisamos atualizar nossa base removendo as duplicações, para isto, gostaríamos que você desenvolvesse uma função que verificasse as duplicações e retornasse uma lista com os produtos atualizados, de acordo com os dados abaixo:

### Dados do produto:

    id
    nome
    valor
    estoque
    tamanho
    tipo
    descricao
    dataCadastro

### Dados da base atual:

    id: 1
    nome: Calça
    valor: 100
    estoque: 5
    tamanho: M
    tipo: Jeans
    descricao: Calça Jeans
    dataCadastro: 2021-06-20T20:32:36.931Z

    id: 3
    nome: Calça
    valor: 100
    estoque: 3
    tamanho: m
    tipo: Jeans
    descricao: Calça Jeans m
    dataCadastro: 2021-06-21T18:42:56.931Z

### Dados da base após a atualização:

    id: 1
    nome: Calça
    valor: 100
    estoque: 8
    tamanho: M
    tipo: Jeans
    descricao: Calça Jeans
    dataCadastro: 2021-06-20T20:32:36.931Z
    dataAtualizacao: 2021-06-21T18:42:56.931Z

Um produto é considerado duplicado quando ele tem o mesmo nome, mesmo valor, mesmo tamanho e mesmo tipo. Os campos que são texto não devem ser considerados diferentes caso haja distinção apenas de letras maiúsculas ou minúsculas.

## Parte 2

Gostaríamos que você criasse uma solução para realizar a manutenção do produto, para ser utilizada no momento de venda e da devolução dos mesmos, seguindo os critérios abaixo:

### Endpoint de Venda

Deve ser criado um endpoint onde possamos realizar a venda dos produtos assim como a geração da nota fiscal da mesma.

A NF deve ser armazenada na mesma base de dados utilizada para a persistência dos produtos.

#### Parâmetros de entrada:

    Data da venda
    Item vendido
    CPF do cliente

#### Parâmetros de saída:

- Dados do produto:
  - ID
  - Nome
  - Tamanho
  - Tipo
  - Descrição
- Dados da Nota Fiscal
  - ID do produto
  - CPF
  - ID da Nota Fiscal (pode ser um UUID)
  - Data da Venda

### Endpoint de devolução:

Deve ser realizado o cancelamento da NF assim como a atualização dos dados do produto corretamente.

#### Parâmetros de entrada:

- ID da NF
- ID do produto
- CPF do cliente

#### Parâmetros de saída:

- Parâmetro de sucesso da execução da devolução

#### Observações

- Deve ser utilizada a estrutura de dados de produtos da Parte 1 deste desafio para construção da Parte 2.
- É importante que sejam realizadas as devidas validações para não gerar inconsistência de base.
- Não é necessário realizar a manutenção de produtos neste desafio, somente consultar os mesmos de um local/base de dados de sua preferência.

