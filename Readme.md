# Como rodar a aplicação
## configuração
1. Rodar postgres com Container:
```bash
docker pull postgres:latest
```

```bash
docker run --name meu-postgres 
-e POSTGRES_USER=postgres 
-e POSTGRES_PASSWORD=123456 
-e POSTGRES_DB=app 
-p 5432:5432 
-d postgres:latest
```
```bash
psql -h localhost -p 5432 -U postgres -d app -f /home/laycon/Documentos/pessoal/codigos/microservice/services/checkout/create.sql
```

2. Derrubar a porta se estiver em uso:
```bash
sudo kill $(sudo lsof -t -i:5432)
```
E subir novamente:

```bash
docker run --name meu-postgres -e POSTGRES_USER=postgres -e POSTGRES_PASSWORD=123456 -e POSTGRES_DB=app -p 5432:5432 -d postgres:latest
```

3. Para usar o serviço do rabbitMQ:
```bash
docker run -d --name rabbitmq -p 5672:5672 -p 15672:15672 rabbitmq:management
```

Depois é só criar as filas usadas em http://localhost:15672/:
- paymentApproved
- orderPlaced

## rodar
Payment Queue /services/checkout:
```bash
npx nodemon src/main_queue.ts
```
Payment API /services/checkout:
```bash
npx nodemon src/main_api.ts
```


Checkout /services/checkout:
```bash
npx jest
```

