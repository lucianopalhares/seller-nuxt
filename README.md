<p align="center"><img src="https://cdn-icons-png.flaticon.com/512/2544/2544336.png" width="400" alt="Seller fRONT"></p>

## Seller Front

### Descrição

Gestão de vendas, vendedores e cálculo de comissão das vendas (a comissão é de 8.5% sobre o valor da venda)

- Criar vendedor
- Listar todos os vendedores
- Lançar nova venda
- Listar todas as vendas de um vendedor

### Tecnologias usadas:

* nuxtjs
* node
* npm

### Instalação

#### instale a aplicação

```
docker-compose up -d
```

#### entre na aplicação 

```
docker exec -it seller-nuxt bash
```

#### instale as dependencias necessarias

```
npm install
```

#### faça o build

```
npm run build
```

#### inicie a aplicação

```
npm run dev
```

#### clique na url que ira exibir, acesse a pagina /login

### API de consumo

#### siga as instrucoes do seguinte repositorio para rodar a api de consumo

https://github.com/lucianopalhares/seller-microservice

#### rota da api:

para autenticação, vendas e vendedores:

http://localhost:8000


### License

Open-sourced software licensed under the [MIT license](https://opensource.org/licenses/MIT).
