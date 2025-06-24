# Nativa GraphQL: essencial\_api

## 📜 Sobre o Projeto

Este projeto, intitulado "essencial\_api", serve como porta de entrada para a trilha de projetos "Nativa GQL". O objetivo principal é configurar um ambiente de desenvolvimento Node.js robusto e criar um microsserviço que encapsula a "essência" da marca Nativa. Isso é alcançado através da exposição de um único endpoint HTTP que retorna frases inspiradoras da marca de forma aleatória.

O desenvolvimento é feito em TypeScript, utilizando o framework Express.js, e todo o código-fonte deve residir em um diretório `src/`.

## 🛠️ Tecnologias Utilizadas

A seguir estão as tecnologias e ferramentas utilizadas na construção deste projeto:

  - **Node.js**: Ambiente de execução para JavaScript no servidor.
  - **TypeScript**: Superset de JavaScript que adiciona tipagem estática.
  - **Express.js**: Framework web para Node.js, utilizado para criar o servidor e as rotas.
  - **ts-node**: Permite a execução de arquivos TypeScript diretamente no ambiente Node.js.
  - **nodemon**: Ferramenta que monitora alterações nos arquivos e reinicia o servidor automaticamente durante o desenvolvimento.
  - **dotenv**: Módulo para carregar variáveis de ambiente a partir de um arquivo `.env`.
  - **tsconfig-paths**: Ferramenta para carregar módulos usando os caminhos definidos no `tsconfig.json`.

### Dependências do Projeto:

  - `dotenv`: ^16.5.0
  - `express`: ^5.1.0

### Dependências de Desenvolvimento:

  - `@types/express`: ^5.0.3
  - `@types/node`: ^24.0.3
  - `nodemon`: ^3.1.10
  - `ts-node`: ^10.9.2
  - `tsconfig-paths`: ^4.2.0
  - `typescript`: ^5.8.3

## 🏛️ Arquitetura do Projeto

A estrutura de arquivos do projeto é organizada para separar as responsabilidades, facilitando a manutenção e escalabilidade.

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
│   ├── utils/
│   │   └── math.ts
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

    Após a execução, o servidor estará rodando na porta definida no seu ambiente (padrão: `3333`) e a seguinte mensagem será exibida no console: `🚀 Servidor rodando na porta 3333`.

### Outros Scripts Disponíveis

  - **Build:**
    Compila o código TypeScript para JavaScript, gerando os arquivos no diretório `dist/`.

    ```bash
    npm run build
    ```

  - **Start:**
    Inicia o servidor a partir dos arquivos JavaScript compilados. Ideal para produção.

    ```bash
    npm run start
    ```

## 🌐 Endpoints da API

A API possui um único endpoint conforme as especificações:

  - **`GET /dica-do-dia`**
      - **Descrição:** Retorna uma "dica do dia" selecionada aleatoriamente de uma lista de frases da marca Nativa.
      - **Resposta de Sucesso (200 OK):** O corpo da resposta é um objeto JSON com uma única chave "dica".
        ```json
        {
          "dica": "uma frase inspiradora da Nativa"
        }
        ```
      - **Resposta de Erro (500 Internal Server Error):** Caso ocorra um problema no servidor.
        ```json
        {
          "message": "Internal Server Error"
        }
        ```