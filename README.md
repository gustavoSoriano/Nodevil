# node-mvc
boilerplace-node-mvc

```
  Estrutura de diretórios
```

Diretório | Descrição
--------- | ------:
App | Diretório root para estrutura mvc, middleware e rotas
Config | Diretório de configuração de banco, porta, secret, app
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

node make controller:veiculo
node make model:veiculo
node make middleware:veiculo
node make crud:veiculo
node make generate:key
```
