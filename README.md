# SaleHunter - BackEnd

BackEnd para o projeto SaleHunter de engenharia de software - UTFPR-2023/1 
</br>
</br>

# 🔧 Instalação Docker e Docker compose
Para a utilização será necessário a instalação do [docker](https://www.docker.com/products/docker-desktop/) e [docker compose](https://docs.docker.com/compose/)

![fork](./imageReadme/dockerversion.png)

# 🔧 Clonando repositorio

Já pode ser clonado o repositório para sua máquina 
```
git clone Link-do-Repositorio
```

# 🔧 Configurando os arquivos

Dentro do arquivo existe um **.env.exemplo** que deve ser copiado em um **.env** dentro dele deve ser colocado as informações do banco de dados e da porta da api, caso queira usar o contêiner de banco de dados do docker deve ser usado conforme o exemplo: 

![.env](./imageReadme/env.png)

Então deve ser adicionado o seu **MYSQL_USER** e **MYSQL_PASSWORD**, caso esteja usando o padrão será **root** nos dois


# 🔧 Executando o Sistema

Assim que os arquivo estiver configurado basta apenas executar os comandos do docker

```
docker compose up --build
```

![.env](./imageReadme/dockercomposerbuild.png)

Com isso o mysql ja vai está rodando em sua maquina.

Agora para iniciar o sistema utilize

```
npm install
```
```
npm run dev
```

Com isso o sistema já vai estar rodando em http://localhost:3000


# Documentação 


# User

## /register
Utilizado para cadastrar um usuarios 

Type: <strong>POST</strong>

Dados esperado
```
um JSON:

{
	"name":"username" - string
	"email": "useremail" - string
	"password": "usersenha" - string
}
```

## /login
Utilizado para login do usuario


Type: <strong>POST</strong>

Dados esperado
```
um JSON:

{
	"email": "useremail" - string
	"password": "usersenha" - string
}
```

## /recoverpassword
Utilizado para recuperar a senha do usuarios 


Type: <strong>POST</strong>

Dados esperado
```
um JSON:
{
	"email": "useremail" - string
}
```

## /resetpassword
Utilizado para resetar a senha do usuarios 

Type: <strong>POST</strong>

Dados esperado
```
um JSON:
{
	"email": "useremail" - string
	"token": "usertoken" - string
	"password": "userpassword" - string
}
```


# Store

Type: <strong>POST</strong>

## /registerstore
Utilizado para resetar a senha do usuarios 

Dados esperado
```
um form-data:

"name": "nameStore" - string
"describe": "describreStore" - string
"link": "linkStore" - string
"image": "logoStore" - file(png/jpeg)

```

## /getonestore

Type: <strong>POST</strong>

Utilizado para resetar a senha do usuarios 

Dados esperado
```
um JSON:
{
"name": "nameStore" - string
}
```

## /getallstore
Utilizado para resetar a senha do usuarios 

Type: <strong>GET</strong> 

Dados esperado
```
NULL
```

## /updatestore
Utilizado para resetar a senha do usuarios 

Type: <strong>PUT</strong> 

Dados esperado
```
"name": "nameStore" - string
"newname": "nameStore" - string
"describe": "describreStore" - string
"link": "linkStore" - string
"image": "logoStore" - file(png/jpeg)
```