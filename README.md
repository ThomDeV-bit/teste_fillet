# README.md

# Aplicação NestJS com Docker

Este projeto é uma aplicação **NestJS** pronta para rodar com **Docker**, permitindo um setup rápido sem precisar instalar Node.js ou bancos de dados localmente.

---

## Pré-requisitos

Antes de começar, você precisa ter instalado:

* [Docker](https://www.docker.com/get-started)
* [Docker Compose](https://docs.docker.com/compose/install/)

## Rodando com Docker

### 1️⃣ Criar a rede interna (subnet)

Para isolar os containers e permitir comunicação interna, criamos uma rede Docker chamada `internal_network`:

```bash
docker network create --driver bridge internal_network
```

### 2️⃣ Build e start dos containers

```bash
docker-compose up -d
```
### rodar os testes

```bash
docker-compose exec app run npm test
```

* O comando irá:

  * Construir a imagem Docker da aplicação NestJS
  * Subir o container da aplicação
  * Subir o container do banco de dados

### 3️⃣ Acessando a aplicação

* A aplicação ficará disponível em: `http://localhost:3000`
* Se você estiver usando Swagger, geralmente em: `http://localhost:3000/api`

---

### Comandos úteis

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

## Observações

* Certifique-se de que as portas definidas no `.env` e `docker-compose.yml` não estejam em conflito com outros serviços.


