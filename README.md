# node-mvc
boilerplace-node-mongo-mvc

```
  Estrutura de diretórios
```

Diretório | Descrição
--------- | ------:
App | Diretório root para estrutura mvc, middleware e rotas
Config | Diretório de configuração de banco, porta, secret, app
Test | Diretório de TDD
Routes | Módulos de rota da api
Controllers | Onde ficam as controllers da aplicação 
Models | Schemas mongoose para MongoDB
Views | Estáticos Html/css
Middleware | Diretório de Middlewares

```
Como iniciar projeto

npm i
npm link
npm start
```
```
  Arquivo de configuração
  /config/config.json
  {
    "app_name": "boilerplate",
    "app_port": 9000,
    "secret": "3428ghne8wngbehvj458543",
    "expiresIn": "3600s",
    "mongo_connect": "mongodb://localhost/",
    "db_name":"node-mvc-boilerplate",
    "debug_mongoose": true
  }
```

```
Cors Middleware
/config/express.js
```

```
Comandos make
Exemplos: 

make controller:veiculo
make model:veiculo
make middleware:veiculo
make crud:veiculo
make generate:key
make install:socket
```

```
Tests run:
mocha
```
