# Instruções para Configuração e Execução

## 1. Configurar o banco de dados PostgreSQL com Docker
- Execute o comando para subir o container:
```bash
docker-compose up -d
```

## 2. Executar migrations
- Para criar as tabelas no banco de dados:
```bash
npx knex migrate:latest
```

## 3. Rodar seeds
- Para popular as tabelas com dados iniciais:
```bash
npx knex seed:run
```

## 4. Iniciar a aplicação
```bash
npm start
```

## Scripts adicionais
- `npm run db:reset` - Derruba, recria, migra e popula o banco automaticamente
