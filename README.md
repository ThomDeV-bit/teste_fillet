Teste Técnico - Aplicação Node.js com MySQL e Docker
Este projeto é uma solução de backend desenvolvida em Node.js 20 utilizando TypeScript e TypeORM, conteinerizada com Docker e Docker Compose, utilizando MySQL como banco de dados.

📋 Requisitos do Projeto
O projeto foi estruturado para atender🛠️ aos seguintes requisitos técnicos:

Utilização de Docker (Para conteinerização da aplicação e do banco de dados).

Banco de dados MySQL (Para persistência de dados).

Ambiente Node.js 20 (Com suporte total a TypeScript).

Testes Unitários (Para garantir a integridade das funcionalidades).

Pequena Documentação para uso da API (Detalhada abaixo).

1. Pré-requisitos
Para executar o projeto, você precisa ter instalado na sua máquina:

Node.js (v18 ou superior, embora o contêiner use v20).

Docker

Docker Compose (Geralmente incluído na instalação do Docker Desktop).

2. Configuração do Ambiente
2.1. Variáveis de Ambiente (.env)
Crie um arquivo chamado .env na raiz do projeto, seguindo o exemplo abaixo. Essas variáveis são usadas tanto pelo Docker Compose quanto pela sua aplicação Node.js para se conectar ao banco de dados.

O valor de MYSQL_HOST deve ser o nome do serviço MySQL no seu docker-compose.yml (mysqldb) ou localhost caso esteja rodando a aplicação localmente.

# ⚙️ Configurações do Banco de Dados (MySQL)
# Estas variáveis são injetadas no serviço 'mysqldb' e 'app'

# Host para conexão interna (nome do serviço no Docker Compose)
MYSQL_HOST=mysqldb
# Porta interna do MySQL no contêiner
MYSQL_LOCAL_PORT=3306
# Porta externa para acessar o MySQL diretamente (opcional, mas útil)
MYSQL_EXTERNAL_PORT=3307

# Credenciais do usuário da aplicação
MYSQL_USERNAME=fillet_user # NUNCA use 'root' aqui para o usuário da aplicação
MYSQL_PASSWORD=123456
MYSQL_DATABASE=teste_fillet_db

# Senha do usuário ROOT do MySQL (para inicialização do banco)
MYSQL_ROOT_PASSWORD=123456

# 🚀 Configurações da Aplicação
NODE_ENV=development # production, development, test
APP_PORT=3000

2.2. Arquivos de Configuração
Dockerfile: Contém a definição da imagem Node.js 20, a instalação de dependências e a compilação do código TypeScript (npm run build).

docker-compose.yml: Define os dois serviços principais:

mysqldb: Contêiner MySQL.

app: Contêiner Node.js.

Importante: O comando de inicialização do app (sh -c "npm run build && npm run start:prod") garante que o código seja recompilado dentro do contêiner antes de iniciar, resolvendo conflitos com a montagem de volume em desenvolvimento.

3. Execução do Projeto (Docker)
Para subir a aplicação e o banco de dados, use o Docker Compose.

Build e Inicialização:
Execute o comando abaixo na raiz do projeto. O --build garante que as imagens sejam reconstruídas caso haja mudanças no Dockerfile.

docker compose up --build -d

A flag -d executa os contêineres em detached mode (em segundo plano).

Verificação:
Após a inicialização, verifique o status dos contêineres:

docker compose ps

Ambos os serviços (fillet_db e teste_fillet) devem estar com status Up.

Acesso à Aplicação:
A API estará acessível em: http://localhost:3000

Logoff:
Para parar e remover os contêineres e a rede criada:

docker compose down

4. Testes Unitários
O projeto utiliza o Jest (ou o framework configurado) para testes unitários, que garantem que cada unidade do código (serviços, controllers, entities) funcione conforme o esperado.

Para rodar os testes, use o comando:

docker compose exec app npm run test

O comando exec garante que os testes sejam executados dentro do contêiner da aplicação, onde todas as dependências estão configuradas.

Comando de Teste Contínuo (Watch Mode):

docker compose exec app npm run test:watch

5. Documentação da API
A aplicação oferece endpoints RESTful para o gerenciamento de recursos (ex: Clientes). O acesso deve ser feito na porta 3000.

5.1. Recursos: /clientes
Método

Endpoint

Descrição

Status de Resposta

GET

/clientes

Retorna uma lista de todos os clientes.

200 OK

GET

/clientes/:id

Retorna os detalhes de um cliente específico.

200 OK, 404 Not Found

POST

/clientes

Cria um novo cliente no banco de dados.

201 Created, 400 Bad Request

PUT

/clientes/:id

Atualiza completamente um cliente existente.

200 OK, 404 Not Found

DELETE

/clientes/:id

Remove um cliente específico do banco de dados.

204 No Content, 404 Not Found

5.2. Exemplos de Uso
Criar um Novo Cliente (POST /clientes)
Requisição:

POST http://localhost:3000/clientes
Content-Type: application/json

{
    "nome": "João Silva",
    "email": "joao.silva@exemplo.com",
    "telefone": "999999999"
}

Resposta (201 Created):

{
    "id": "uuid-gerado-pelo-sistema",
    "nome": "João Silva",
    "email": "joao.silva@exemplo.com",
    "telefone": "999999999",
    "criadoEm": "2025-10-14T15:00:00.000Z"
}

Buscar Todos os Clientes (GET /clientes)
Requisição:

GET http://localhost:3000/clientes

Resposta (200 OK):

[
    {
        "id": "uuid-001",
        "nome": "João Silva",
        "email": "joao.silva@exemplo.com",
        "telefone": "999999999"
    },
    {
        "id": "uuid-002",
        "nome": "Maria Souza",
        "email": "maria.souza@exemplo.com",
        "telefone": "888888888"
    }
]
