![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)

# 🏥 First Aid

Aplicação fullstack para consulta e gerenciamento de procedimentos de primeiros socorros. O projeto é dividido em duas partes: uma API RESTful (backend) e uma interface web (frontend).

---

## 📁 Estrutura do Repositório

```
/
├── backend/   # API RESTful com Node.js, TypeScript e Express
└── frontend/  # Interface web com React, TypeScript e Vite
```

---

## 🚀 Tecnologias

**Backend**
- Node.js + TypeScript
- Express
- Arquitetura em camadas (Models → Repositories → Services → Controllers)

**Frontend**
- React + TypeScript
- Vite (com HMR)
- Arquitetura FSD (Feature Slice Design)

---

## ⚙️ Como Executar

### Backend

```bash
cd backend
npm install
npm run dev
```

O servidor estará disponível em `http://localhost:4000`.

### Frontend

```bash
cd frontend
npm install
npm run dev
```

A aplicação estará disponível em `http://localhost:5173` (ou porta configurada pelo Vite).

---

## 📡 API — Endpoints Principais

Base URL: `http://localhost:4000/api`

| Método | Rota | Descrição |
|--------|------|-----------|
| GET | `/emergencies` | Lista todas as emergências |
| GET | `/emergencies/:id` | Busca por ID ou slug |
| POST | `/emergencies` | Cria uma nova emergência |
| PUT | `/emergencies/:id` | Atualiza uma emergência |
| DELETE | `/emergencies/:id` | Remove uma emergência |

> Para mais detalhes sobre a API, consulte o [README do backend](./backend/README.md).


## 👨‍💻 Autor

**Israel Baracho**
- GitHub: [@IsraBaracho](https://github.com/IsraBaracho)
- LinkedIn: [Israel Baracho](https://www.linkedin.com/in/israel-baracho-830111324/)
- Email: israbaracho@gmail.com

---

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.