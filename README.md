# 🧪 Mark85 — Automação de Testes E2E com Cypress

Projeto de automação de testes end-to-end (E2E) para API desenvolvido com **Cypress**, **MongoDB** e **CloudAMQP**.

Este projeto realiza testes automatizados em endpoints de usuários e tarefas, com suporte a integração com banco de dados MongoDB e filas de mensagens RabbitMQ.

---

## 📋 Sobre o Projeto

- **Testes de API**: Validação de operações CRUD em usuários e tarefas
- **Integração com MongoDB**: Limpeza e validação de dados em banco de dados
- **Integração com RabbitMQ**: Testes de filas de mensagens via CloudAMQP
- **Sessões**: Testes de autenticação e gerenciamento de sessões
- **Fixtures**: Dados pré-configurados para testes

---

## 🛠️ Tecnologias e Ferramentas

- **Cypress** (v15.10.0) — Framework de testes E2E
- **Allure Reports** (v3.5.0) — Geração de relatórios detalhados
- **Node.js** — Runtime JavaScript
- **MongoDB** (v7.1.0) — Banco de dados NoSQL
- **CloudAMQP** — Serviço de RabbitMQ na nuvem
- **dotenv** — Gerenciamento de variáveis de ambiente

---

## 📁 Estrutura do Projeto

```
cypress/
├── e2e/                          # Testes end-to-end
│   ├── sessions.cy.js            # Testes de autenticação/sessões
│   ├── users.cy.js               # Testes de usuários
│   └── tasks/                    # Testes de tarefas
│       ├── delete.cy.js          # Testes DELETE
│       ├── get.cy.js             # Testes GET
│       ├── post.cy.js            # Testes POST
│       └── put.cy.js             # Testes PUT
├── fixtures/                     # Dados pré-configurados
│   ├── tasks.json                # Dados de tarefas
│   └── users.json                # Dados de usuários
└── support/                      # Utilitários e configurações
    ├── e2e.js                    # Configurações globais
    ├── mongo.js                  # Conexão com MongoDB
    └── commands/
        ├── api.js                # Comandos de API
        └── rabbitmq.js           # Comandos de RabbitMQ
```

---

## ⚙️ Configuração do Projeto

### 1. **Clone o repositório**

```bash
git clone -b testing-api-rest-with-cypress --single-branch https://github.com/artur-dantas-r/skill-up-automation-e2e.git

cd mark85-cypress-api
```

### 2. **Instale as dependências**

```bash
yarn install
```

### 3. **Configure as variáveis de ambiente**

Crie um arquivo `.env` na raiz do projeto (use `.env.example` como referência):

```bash
cp .env.example .env
```

Preencha as seguintes variáveis:

```env
# MongoDB URI para conexão com banco de dados
MONGO_URI=mongodb+srv://usuario:senha@cluster.mongodb.net/?appName=AppName

# URL base da API a ser testada
BASE_URL=http://localhost:3333

# CloudAMQP - URL da API de filas
CLOUD_AMPQ_API=https://jaragua.lmq.cloudamqp.com/api/queues/seu-usuario

# CloudAMQP - Credenciais de autenticação (Basic Auth)
CLOUD_AMPQ_AUTH="Basic suaCredencialEmBase64"
```

---

## 🚀 Executar os Testes

### Abrir Cypress (modo interativo)

```bash
yarn run cy:open
```

Isso abrirá a interface do Cypress onde você pode:
- Selecionar testes individuais
- Visualizar a execução em tempo real
- Debugar falhas

### Executar todos os testes (headless)

```bash
yarn test
```

Os testes serão executados sem interface gráfica e o resultado será exibido no terminal.

### Gerar e visualizar relatório Allure Reports

Após executar os testes, gere e abra o relatório Allure:

```bash
npx allure serve allure-results
```

Isso abrirá um servidor local com o relatório interativo completo de todos os testes executados.

---

## 📝 Suites de Testes

### 🔐 Sessões (`sessions.cy.js`)
Testa autenticação e gerenciamento de sessões do usuário.

### 👤 Usuários (`users.cy.js`)
Testa operações relacionadas a usuários (criar, listar, atualizar, deletar).

### ✅ Tarefas (`tasks/`)
Testa operações CRUD de tarefas:
- **GET** — Recuperar tarefas
- **POST** — Criar novas tarefas
- **PUT** — Atualizar tarefas
- **DELETE** — Deletar tarefas

---

## 🔧 Recursos Especiais

### Integração com MongoDB

O projeto usa a função `connect` para conectar ao MongoDB e permite:
- Limpar dados de teste automaticamente
- Validar dados no banco antes/depois de testes
- Usar task do Cypress para deletar usuários

Exemplo de uso em `cypress.config.js`:
```javascript
on('task', {
  async deleteUser(email) {
    const users = db.collection('users')
    await users.deleteMany({ email: email })
    return null
  }
})
```

### Integração com RabbitMQ (CloudAMQP)

Testes de fila de mensagens via `rabbitmq.js` com autenticação básica.

### Comandos de API

Utilitários em `api.js` para simplificar requisições HTTP nos testes.

---

## 📊 Allure Reports

Este projeto está configurado para gerar relatórios detalhados com **Allure Reports**, proporcionando:

- **Visão geral dos testes**: Estatísticas de sucesso, falha e duração
- **Histórico de execuções**: Acompanhe a evolução dos testes ao longo do tempo
- **Detalhes de cada teste**: Steps, logs, screenshots e vídeos
- **Análise de falhas**: Identificar padrões e problemas comuns
- **Gráficos e métricas**: Visualização clara do status do projeto

### Estrutura de Resultados

Os resultados dos testes são salvos em `allure-results/` após cada execução.

### Visualizar Relatório

```bash
npx allure serve allure-results
```

Comando alternativo para gerar HTML estático:

```bash
npx allure generate allure-results -o allure-report
```

---

## 📊 Configurações do Cypress

Veja `cypress.config.js` para detalhes sobre:
- URL base da aplicação
- Variáveis de ambiente
- Tasks personalizadas
- Configurações de vídeo e screenshots
- Integração com Allure Reports

---

## 👤 Autor

**Artur Dantas Rodrigues**

---

## 📄 Licença

MIT