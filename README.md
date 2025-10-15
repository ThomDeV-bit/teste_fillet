# README.md

# Aplicação NestJS com Docker

Este projeto é uma aplicação **NestJS** pronta para rodar com **Docker**, permitindo um setup rápido sem precisar instalar Node.js ou bancos de dados localmente.

---

## Pré-requisitos

Antes de começar, você precisa ter instalado:

* [Docker](https://www.docker.com/get-started)
* [Docker Compose](https://docs.docker.com/compose/install/)

## Rodando com Docker

### 1️⃣ Build e start dos containers

```bash
docker-compose up -d
```
### rodar os testes
```bash
docker-compose exec app run npm test
```
### rodar os aplicação
```bash
docker-compose exec app npm run start
```

### parar os containers
```bash
docker-compose down
```

* O comando irá:

  * Construir a imagem Docker da aplicação NestJS
  * Subir o container da aplicação
  * Subir o container do banco de dados

### 2️⃣ Acessando a aplicação

* A aplicação ficará disponível em: `http://localhost:3000`
* Se você estiver usando Swagger, geralmente em: `http://localhost:3000/api`

---

### 3️⃣ Comandos úteis

* **Parar containers**:

```bash
docker-compose down
```

* **Rodar em modo detach (background)**:

```bash
docker-compose up -d
```

* **Ver logs da aplicação**:

```bash
docker-compose logs -f
```

* **Rebuild da imagem** (quando alterar dependências):

```bash
docker-compose build --no-cache
```

---

## Rodando testes

Rodar os testes dentro do container:

```bash
docker-compose exec app npm run test
```

Ou localmente:

```bash
npm install
npm run test
```

---

## Scripts npm disponíveis

* `npm run start` → Inicia a aplicação
* `npm run start:dev` → Inicia em modo desenvolvimento (watch)
* `npm run build` → Compila a aplicação
* `npm run test` → Executa os testes unitários
* `npm run test:watch` → Testes em modo watch
* `npm run lint` → Checa lint do projeto

---

## Observações

* Certifique-se de que as portas definidas no `.env` e `docker-compose.yml` não estejam em conflito com outros serviços.
* O `docker-compose.yml` pode incluir outros serviços como Redis, RabbitMQ, etc., se necessário.
* Para ambientes de produção, configure volumes, redes e variáveis de ambiente adequadamente.

