# Skill Up — Automação E2E

Projeto de testes end-to-end (E2E) para mobile (Android) usando WebdriverIO + Appium. O conjunto de testes cobre fluxos básicos de criação, edição e exclusão de notas (ex.: Color Note) e segue um padrão Page Object com ações, asserções e fluxos reutilizáveis.

**Visão Geral**

- **Stack:** WebdriverIO, Appium, Node.js
- **Plataforma alvo:** Android (emulador ou dispositivo real)
- **Objetivo:** testes E2E para os fluxos de notas (adicionar, editar, excluir)

**Estrutura do Projeto**

- **`config/`**: arquivos de configuração do WebdriverIO
	- [config/wdio.conf.js](config/wdio.conf.js) — configuração local
	- [config/wdio.cloud.conf.js](config/wdio.cloud.conf.js) — configuração para provedores na nuvem
- **`app/android/`**: apks ou arquivos relacionados ao app Android usado nos testes
- **`test/`**: código dos testes e helpers
	- `actions/` — ações reutilizáveis (ex.: interações com telas)
	- `assertions/` — asserções customizadas
	- `flows/` — fluxos de teste compostos (combinações de ações)
	- `screens/` — Page Objects / representações de telas
	- `specs/` — arquivos de especificação (os testes em si)
	- `utils/` — utilitários auxiliares
- **`images/`**: imagens e recursos usados nos testes
- **`package.json`**: dependências e scripts do projeto

**Pré-requisitos**

- Node.js (recomenda-se v14+)
- npm ou yarn
- Java JDK (necessário para Android/emulador)
- Android SDK + Platform Tools (`adb`) e um emulador ou dispositivo Android
- Appium (servidor local) ou conta em um provedor de nuvem (BrowserStack, Sauce Labs, etc.)
- Variáveis de ambiente configuradas quando necessário (ex.: `ANDROID_HOME`, credenciais do provedor de nuvem)

**Instalação**

```bash
git clone -b appium-webdriverio --single-branch https://github.com/artur-dantas-r/skill-up-automation-e2e.git
cd skill-up-automation-e2e
npm install
```

**Configuração**

- Ajuste capacidades e o caminho do `app` em [config/wdio.conf.js](config/wdio.conf.js) para executar localmente.
- Para execução em provedor na nuvem, configure as credenciais e capacidades em [config/wdio.cloud.conf.js](config/wdio.cloud.conf.js).

**Executando os testes**

- Executar todos os testes localmente:
```bash
npx wdio run ./config/wdio.conf.js
```
- Executar um spec específico:
```bash
npx wdio run ./config/wdio.conf.js --spec ./test/specs/color-note/add-note.spec.js
```
- Executar usando configuração de nuvem:
```bash
npx wdio run ./config/wdio.cloud.conf.js
```

**Scripts úteis**

- `npm run wdio:local` — executa testes localmente usando `config/wdio.conf.js`.
- `npm run wdio:cloud` — executa testes em provedores na nuvem usando `config/wdio.cloud.conf.js`.

Exemplos rápidos:

```bash
npm run wdio:local
npm run wdio:cloud
```

Nota: para execução local em CI é necessário um runner self-hosted com Android e Appium; nesse caso use `npm run wdio:local`.

Observação: se existirem scripts npm configurados em `package.json`, também é possível usar `npm run <script>`.

**Como escrever novos testes**

- Siga o padrão existente: crie/atualize um `screen` em `test/screens/`, reutilize `actions/` para interações e `assertions/` para verificações. Escreva o teste em `test/specs/` e, quando aplicável, componha o fluxo em `test/flows/`.

**Dicas e Troubleshooting**

- Certifique-se de que o Appium esteja rodando (local) ou que as credenciais do provedor de nuvem estejam corretas.
- Verifique dispositivos conectados com `adb devices`.
- Confirme o caminho do APK configurado em `config/wdio.conf.js`.

**Contribuindo**

- Abra uma issue para discutir mudanças importantes.
- Envie PRs com mudanças pequenas e testes quando apropriado.

---