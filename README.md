# Nativa GraphQL: gql_catalog

## 📜 Sobre o Projeto

Este projeto, intitulado **"gql_catalog"**, é o segundo círculo da trilha de projetos "Nativa GQL". O objetivo principal é evoluir o microsserviço inicial, transformando-o em uma API GraphQL completa para servir o catálogo de produtos da marca Nativa.

Adotando uma filosofia **Schema-First**, o desenvolvimento garante que o esquema GraphQL seja a fonte única da verdade, definindo um contrato claro para a API. A implementação é feita em TypeScript, utilizando **Express.js** e **Apollo Server**.

## 🛠️ Tecnologias Utilizadas

A seguir estão as tecnologias e ferramentas utilizadas na construção deste projeto:

-   **Node.js**: Ambiente de execução para JavaScript no servidor.
-   **TypeScript**: Superset de JavaScript que adiciona tipagem estática.
-   **Express.js**: Framework web para Node.js, utilizado para criar o servidor base.
-   **Apollo Server**: Servidor GraphQL para Express que nos permite definir e rodar nossa API.
-   **GraphQL**: Linguagem de consulta para APIs e um ambiente de execução para atender a essas consultas com seus dados existentes.
-   **ts-node**: Permite a execução de arquivos TypeScript diretamente no ambiente Node.js.
-   **nodemon**: Ferramenta que monitora alterações nos arquivos e reinicia o servidor automaticamente.
-   **dotenv**: Módulo para carregar variáveis de ambiente a partir de um arquivo `.env`.
-   **tsconfig-paths**: Ferramenta para carregar módulos usando os caminhos definidos no `tsconfig.json`.

### Dependências do Projeto:

-   `@apollo/server`: ^4.12.2
-   `@as-integrations/express5`: ^1.1.0
-   `dotenv`: ^16.5.0
-   `express`: ^5.1.0
-   `graphql`: ^16.11.0
-   `morgan`: ^1.10.0

### Dependências de Desenvolvimento:

-   `@types/express`: ^5.0.3
-   `@types/morgan`: ^1.9.10
-   `@types/node`: ^24.0.3
-   `nodemon`: ^3.1.10
-   `ts-node`: ^10.9.2
-   `tsconfig-paths`: ^4.2.0
-   `typescript`: ^5.8.3

## 🏛️ Arquitetura do Projeto

A estrutura de arquivos foi expandida para suportar a API GraphQL, separando o esquema, os resolvers e os serviços de dados.

```
/
├── src/
│   ├── api/
│   │   ├── controllers/
│   │   │   └── phrase.controller.ts
│   │   ├── routes/
│   │   │   ├── index.ts
│   │   │   └── phrases.routes.ts
│   │   └── services/
│   │       └── phrase.service.ts
│   ├── config/
│   │   └── index.ts
│   ├── data/
│   │   ├── lineList.json
│   │   └── productList.json
│   ├── graphql/
│   │   ├── resolvers.ts
│   │   └── schema.graphql
│   ├── models/
│   │   ├── line.model.ts
│   │   └── product.model.ts
│   ├── services/
│   │   ├── line.service.ts
│   │   └── product.service.ts
│   ├── utils/
│   │   ├── math.ts
│   │   └── string.ts
│   ├── index.ts
│   └── server.ts
├── .gitignore
├── package-lock.json
├── package.json
└── tsconfig.json
```

## 🚀 Como Executar Localmente

Para executar o projeto em seu ambiente local, certifique-se de ter o Node.js e o npm instalados. Em seguida, siga os passos abaixo.

1.  **Clone o repositório:**

    ```bash
    git clone https://github.com/JonatasArao/nativa-graphql.git
    ```

2.  **Instale as dependências:**
    Navegue até o diretório raiz do projeto e execute o comando:

    ```bash
    npm install
    ```

3.  **Execute em modo de desenvolvimento:**
    Este comando iniciará o servidor usando `nodemon` para observar as alterações nos arquivos TypeScript e reiniciar o servidor automaticamente.

    ```bash
    npm run dev
    ```

    Após a execução, as seguintes mensagens serão exibidas no console, indicando que tanto o endpoint REST quanto o GraphQL estão ativos:
    
    ```
    🚀 Servidor de dicas rodando em http://localhost:3333/dica-do-dia
    🚀 Servidor GraphQL rodando em http://localhost:3333/graphql
    ```

### Outros Scripts Disponíveis

-   **Build:**
    Compila o código TypeScript para JavaScript, gerando os arquivos no diretório `dist/`.

    ```bash
    npm run build
    ```

-   **Start:**
    Inicia o servidor a partir dos arquivos JavaScript compilados. Ideal para produção.

    ```bash
    npm run start
    ```

## 🌐 Endpoints e Queries

A API agora expõe tanto um endpoint REST legado quanto a nova API GraphQL.

### API REST

-   **`GET /dica-do-dia`**
    -   **Descrição:** Retorna uma "dica do dia" selecionada aleatoriamente de uma lista de frases da marca Nativa.
    -   **Resposta de Sucesso (200 OK):**
        ```json
        {
          "dica": "uma frase inspiradora da Nativa"
        }
        ```

### API GraphQL (`/graphql`)

O endpoint GraphQL oferece um playground (Apollo Sandbox) para executar queries e explorar o esquema.

#### Queries Disponíveis

-   **Buscar todas as linhas de produtos:**
    ```graphql
    query {
      lines {
        id
        name
        concept
      }
    }
    ```

-   **Buscar produtos por ID da linha:**
    ```graphql
    query {
      products(filter: { lineId: "L001" }) {
        id
        name
        price
        line {
          id
          name
        }
      }
    }
    ```

-   **Buscar um produto específico por ID:**
    ```graphql
    query {
      product(id: "P001") {
        id
        name
        description
        keyIngredients
        onSale
        promotionalPrice
      }
    }
    ```

-   **Busca textual livre em produtos e linhas:**
    A query de busca é flexível e pesquisa no nome, descrição, ingredientes e também no nome e conceito da linha associada.
    ```graphql
    query {
      products(filter: { query: "hidratante" }) {
        id
        name
        description
        line {
          name
        }
      }
    }
    ```