# Nodevil
Node and Mongo MVC

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
Models | Schemas mongoose para MongoDB
Views | Templates ejs
Middleware | Diretório de Middlewares

```
Como iniciar projeto

npm i
npm link
npm start

Open the browser on the page http://localhost:9000
```
```
  Arquivo de configuração
  /config/config.json
  {
    "app_name": "app_demo",
    "app_port": 9000,
    "secret": "3428ghne8wngbehvj458543",
    "expiresIn": "3600s",
    "mongo_connect": "mongodb://localhost/",
    "db_name":"node-mvc",
    "debug": {
        "mongoose":false,
        "log":true,
        "request_log":true
    }
  }
```


```
Como iniciar container docker
sudo ./docker_run.sh
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


# Colaboradores

Desenvolvedor | Thumbnail
--------- | ------:
[Soriano](https://github.com/gustavoSoriano) | <img src="https://avatars3.githubusercontent.com/u/20995835?s=460&v=4" width="100"/>
[David](https://github.com/DavidWilliamBalbino) | <img src="https://avatars0.githubusercontent.com/u/19325395?s=460&v=4" width="100"/>
[Lucas Galhardo](https://github.com/LucasGalhardoLima) | <img src="https://avatars0.githubusercontent.com/u/29153930?s=460&v=4" width="100"/>
