# 🛡️ Autenticação JWT: Node.js (Backend) & React (Frontend)

[cite_start]Este projeto implementa autenticação JWT (JSON Web Token) [cite: 14] utilizando Node.js/Express para o Backend e React para o Frontend.

## 🚀 Como Rodar o Projeto

### Pré-requisitos
* Node.js e npm instalados.

### 1. Backend (Servidor)

O servidor é responsável por emitir o token no login e validar o token em rotas protegidas.

1.  Navegue até a pasta `server`:
    ```bash
    cd server
    ```
2.  Instale as dependências:
    ```bash
    npm install
    ```
3.  **Crie o arquivo `.env`** (para o segredo) na pasta `server` e adicione a chave. **Não use o valor de exemplo, gere uma chave forte.**
    ```
    # [cite_start]O segredo deve ser mantido em variáveis de ambiente, não no código.
    JWT_SECRET="SEU_SEGREDO_DE_32_CARACTERES_OU_MAIS"
    PORT=3001
    ```
4.  Inicie o servidor (ele rodará na porta 3001):
    ```bash
    npm run dev
    ```

### 2. Frontend (Cliente)

[cite_start]O cliente armazena o token e o envia no header Authorization.

1.  Abra um **novo terminal** e navegue até a pasta `client`:
    ```bash
    cd ../client
    ```
2.  Instale as dependências:
    ```bash
    npm install
    ```
3.  Inicie a aplicação React (ela rodará na porta 3000):
    ```bash
    npm start
    ```

## 🔑 Credenciais de Teste

| Campo | Valor |
| :--- | :--- |
| **E-mail** | `user@teste.com` |
| **Senha** | `password123` |

## ✔️ Critérios de Aceitação

* A rota `/login` retorna `{ token }` para as credenciais válidas.
* A rota `/private` só responde `200 OK` quando o header `Authorization: Bearer <token>` é válido.