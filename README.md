# API de Transferências e Usuários

Esta API permite o registro, login, consulta de usuários e transferências de valores entre usuários. O objetivo é servir de base para estudos de testes e automação de APIs.

## Tecnologias
- Node.js
- Express
- Swagger (documentação)

## Instalação

1. Clone o repositório ou copie os arquivos para seu ambiente.
2. Instale as dependências:
   ```
npm install express swagger-ui-express
   ```

## Como rodar

- Para rodar o servidor:
  ```
  node server.js
  ```
- O servidor será iniciado na porta 3000 (ou definida na variável de ambiente `PORT`).

## Endpoints

- `POST /register` — Registra um novo usuário. Exemplo de body:
  ```json
  {
    "username": "joao",
    "password": "1234",
    "favorecidos": ["maria"]
  }
  ```
- `POST /login` — Realiza login. Exemplo de body:
  ```json
  {
    "username": "joao",
    "password": "1234"
  }
  ```
- `GET /users` — Lista todos os usuários cadastrados.
- `POST /transfer` — Realiza uma transferência. Exemplo de body:
  ```json
  {
    "from": "joao",
    "to": "maria",
    "amount": 1000
  }
  ```
- `GET /transfers` — Lista todas as transferências realizadas.
- `GET /api-docs` — Acessa a documentação Swagger da API.

## Regras de Negócio
- Login exige usuário e senha.
- Não é permitido registrar usuários duplicados.
- Transferências para destinatários que não são "favorecidos" só podem ser feitas se o valor for menor que R$ 5.000,00.
- O banco de dados é em memória (os dados são perdidos ao reiniciar o servidor).

## Testes
- O arquivo `app.js` exporta a aplicação Express sem o método `listen()`, facilitando testes com Supertest.

---

Acesse a documentação interativa em [http://localhost:3000/api-docs](http://localhost:3000/api-docs) após iniciar o servidor.
