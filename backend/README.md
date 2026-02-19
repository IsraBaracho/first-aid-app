![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge)
![Swagger](https://img.shields.io/badge/Swagger-85EA2D?style=for-the-badge&logo=swagger&logoColor=black)

# 🏥 First Aid API

API RESTful para gerenciamento de procedimentos de primeiros socorros, desenvolvida com Node.js, TypeScript e Express.

## 📋 Sobre o Projeto

Esta API permite criar, visualizar, atualizar e deletar procedimentos de emergências médicas, com informações detalhadas sobre cada passo a ser seguido em situações de primeiros socorros.

## 🚀 Tecnologias Utilizadas

- **Node.js** - Ambiente de execução JavaScript
- **TypeScript** - Superset JavaScript com tipagem estática
- **Express** - Framework web minimalista
- **CORS** - Middleware para permitir requisições cross-origin
- **File System (fs)** - Armazenamento em JSON

## 📂 Arquitetura do Projeto

O projeto segue uma arquitetura em camadas (Layered Architecture):

```
src/
├── models/          # Interfaces e tipos TypeScript
├── repositories/    # Camada de acesso aos dados
├── services/        # Lógica de negócio
├── controllers/     # Camada de apresentação HTTP
├── routes/          # Definição de rotas
└── server.ts        # Configuração e inicialização do servidor
```

## 🔧 Instalação e Execução

### **Pré-requisitos:**

- Node.js (v16 ou superior)
- npm ou yarn

### **Passo a passo:**

1. Clone o repositório:

```bash
git clone https://github.com/seu-usuario/first-aid-api.git
cd first-aid-api
```

2. Instale as dependências:

```bash
npm install
```

3. Execute em modo de desenvolvimento:

```bash
npm run dev
```

4. O servidor estará rodando em:

```
http://localhost:4000
```

## 📡 Endpoints da API

### **Base URL:** `http://localhost:4000/api`

### **Health Check:**

```http
GET /health
```

Verifica se o servidor está funcionando.

---

### **1. Listar todas as emergências**

```http
GET /api/emergencies
```

---

### **2. Buscar emergência por ID ou slug**

```http
GET /api/emergencies/:id
```

**Parâmetros:**

- `id` (string) - ID ou slug da emergência

**Exemplo:**

```http
GET /api/emergencies/queimadura-1733328000
GET /api/emergencies/queimadura
```

---

### **3. Criar nova emergência**

```http
POST /api/emergencies
```

**Campos obrigatórios:**

- `title` (string)
- `steps` (array) - pelo menos 1 step

**Campos opcionais:**

- `slug` (string) - gerado automaticamente se não fornecido
- `tags` (array)
- `description` (string)
- `cta` (string)

---

### **4. Atualizar emergência**

```http
PUT /api/emergencies/:id
```

---

### **5. Deletar emergência**

```http
DELETE /api/emergencies/:id
```

## ``

`

## 🧪 Testando a API

### **Postman**

1. Importe a collection do Postman
2. Configure a base URL: `http://localhost:4000`
3. Teste os endpoints

## 📦 Estrutura de Dados

Os dados são armazenados em `data/emergencies.json`:

```json
[
  {
    "id": "queimadura-1733328000",
    "slug": "queimadura",
    "title": "Queimadura",
    "tags": [],
    "description": "",
    "cta": null,
    "steps": [
      {
        "title": "Resfrie a área",
        "description": "Use água fria corrente"
      }
    ]
  }
]
```

---

## 🚧 Próximas Melhorias

- [ ] Implementar banco de dados (MongoDB/PostgreSQL)
- [ ] Adicionar autenticação JWT
- [ ] Implementar paginação
- [ ] Adicionar busca e filtros
- [ ] Implementar rate limiting
- [ ] Adicionar logs estruturados
- [ ] Implementar testes automatizados (Jest)
- [ ] Adicionar validação com Zod
- [ ] Documentação Swagger/OpenAPI
- [ ] Deploy (Railway/Heroku)

---

## 👨‍💻 Autor

**Israel Baracho**

- GitHub: [@IsraBaracho](https://github.com/IsraBaracho)
- LinkedIn: [Israel Baracho](https://www.linkedin.com/in/israel-baracho-830111324/)
- Email: israbaracho@gmail.com

---

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.
