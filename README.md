# Skill Up — Automação E2E

Projeto de testes end-to-end (E2E) para mobile (Android) usando WebdriverIO + Appium. O conjunto de testes cobre fluxos de login de um [sample app](https://github.com/saucelabs/my-demo-app-android) e segue um padrão Page Object com ações, asserções e fluxos reutilizáveis.

**Visão Geral**

- **Stack:** WebdriverIO, Appium, Node.js
- **Plataforma alvo:** Android
- **Objetivo:** testes E2E para os fluxo de login

**Estrutura do Projeto**

- **`config/`**: arquivos de configuração do WebdriverIO
	- [config/wdio.conf.js](config/wdio.conf.js) — configuração local
- **`app/android/`**: apks ou arquivos relacionados ao app Android usado nos testes
- **`test/`**: código dos testes e helpers
	- `actions/` — ações reutilizáveis (ex.: interações com telas)
	- `assertions/` — asserções customizadas
	- `flows/` — fluxos de teste compostos (combinações de ações)
	- `screens/` — Page Objects / representações de telas
	- `specs/` — arquivos de especificação (os testes em si)
	- `utils/` — utilitários auxiliares
- **`package.json`**: dependências e scripts do projeto

**Pré-requisitos**

- Node.js (recomenda-se v14+)
- npm ou yarn
- Java JDK (necessário para Android/emulador)
- Android SDK + Platform Tools (`adb`) e um emulador ou dispositivo Android
- Appium 3 (servidor local)

**Instalação**

```bash
git clone -b sample-app --single-branch https://github.com/artur-dantas-r/skill-up-automation-e2e.git
cd skill-up-automation-e2e
npm install
```

**Configuração**

- Ajuste capacidades e o caminho do `app` em [config/wdio.conf.js](config/wdio.conf.js) para executar localmente.

**Executando os testes**

- Executar todos os testes localmente:
- `npm run wdio:local` 

**Como escrever novos testes**

- Siga o padrão existente: crie/atualize um `screen` em `test/screens/`, reutilize `actions/` para interações e `assertions/` para verificações. Escreva o teste em `test/specs/` e, quando aplicável, componha o fluxo em `test/flows/`.

**Dicas e Troubleshooting**

- Certifique-se de que o Appium esteja rodando (local).
- Verifique dispositivos conectados com `adb devices`.
- Confirme o caminho do APK configurado em `config/wdio.conf.js`.