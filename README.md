# Nodevil
NodeJs estruturado em MVC com implementação para Socket.io, MongoDb, Sequilize e GraphQl

```
  Estrutura de diretórios
```

Diretório | Descrição
--------- | ------:
App | Diretório root para estrutura mvc, middleware e rotas
Config | Diretório de configuração de banco, porta, secret, app
Test | Diretório de TDD
Routes | Módulos de rota de api ou web templates
Controllers | Onde ficam as controllers da aplicação 
Models/mongoose | Schemas para MongoDb
Models/sequelize | Models, Migrations e Seeders do sequelize
Views | Templates ejs
Middleware | Diretório de Middlewares
GraphQl | Diretório recursos do graphql api


### Como iniciar projeto
```
npm i       (Instalação de dependências)
npm link    (Criar um link simbolico para o arquivo make.js)
npm run dev (Inicia a aplicação com nodemon)
npm start   (Inicia a aplicação em produção)

Abra o browser no endereço: http://localhost:9000
```

### Arquivo de configuração
- Caso não crie a chave mongodb, não haverá conexão com mongodb
- Caso não crie a chave sequelizedb, não haverá conexão com sequelize
```
    /config/config.json
    {
        "app_port": 9005,
        "secret": "3428ghne8wngbehvj458543",
        "expiresIn": "3600s",
        "mongodb":{
            "uri":"mongodb://localhost/",
            "db_name": "node-mvc"
        },
        "sequelizedb":{
            "username": "root",
            "password": "password",
            "database": "nodejs",
            "host": "127.0.0.1",
            "dialect": "mysql",
            "operatorsAliases": false
        },
        "debug": {
            "mongoose":false,
            "log":true,
            "request_log":true
        }
    }
```


### Documentação GraphQl
```
Abra o browser no endereço: http://localhost:9000/graphql
Documentação disponível clicando na aba "Docs"
```


### Como iniciar container docker
```
sudo ./docker_run.sh
```

### Cors Middleware
```
/config/express.js
```

### Comandos make
```
Exemplos: 

- make controller:veiculo

- make model[mongoose]:veiculo
- make model[sequelize]:veiculo

- make middleware:veiculo

- make crud[mongoose]:veiculo
- make crud[sequelize]:veiculo

- make generate:key
- make install:socket
```


### Testes unitários
```
Execução dos testes:
mocha
```

### Comandos do Sequelize

Você pode executar comandos sequelize desde que utilizando o parâmetro --env sequelizedb. Ex:

- npx sequelize-cli model:generate --name Animal --attributes firstName:string, year:integer --env sequelizedb
- npx sequelize-cli db:migrate --env sequelizedb
- npx sequelize-cli db:seed:all --env sequelizedb
- npx sequelize-cli db:migrate:undo --env sequelizedb

**Obs: Mais comandos disponíveis em: [sequelize.org](https://sequelize.org/master/manual/getting-started.html)**





# Colaboradores

Desenvolvedor | Thumbnail
--------- | ------:
[Soriano](https://github.com/gustavoSoriano) | <img src="https://avatars3.githubusercontent.com/u/20995835?s=460&v=4" width="100"/>
[David](https://github.com/DavidWilliamBalbino) | <img src="https://avatars0.githubusercontent.com/u/19325395?s=460&v=4" width="100"/>
[Lucas Galhardo](https://github.com/LucasGalhardoLima) | <img src="https://avatars0.githubusercontent.com/u/29153930?s=460&v=4" width="100"/>
