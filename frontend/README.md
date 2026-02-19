![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)

🏥 First Aid Interface

Interface web para visualizar e gerenciar procedimentos de primeiros socorros.

## Tecnologias

- React 19
- TypeScript
- Vite
- React Router
- Feature-Sliced Design (FSD)

## Arquitetura

Este projeto utiliza uma versão simplificada do Feature-Sliced Design:

src/
├── app/ # Configuração global (router, providers)
├── pages/ # Páginas (rotas)
├── features/ # Funcionalidades específicas
└── shared/ # Recursos compartilhados (ui, api, types, hooks)

### Camadas:

- **app**: Configuração da aplicação (rotas, providers globais)
- **pages**: Componentes de página que correspondem a rotas
- **features**: Funcionalidades de negócio auto-contidas
- **shared**: Componentes UI, API, types e hooks reutilizáveis

### Regra de Dependência:

app → pages → features → shared

Camadas superiores podem usar inferiores, mas não o contrário.

## 🔌 API

O frontend se comunica com o backend via proxy configurado no Vite:

- Desenvolvimento: `http://localhost:3000` → `http://localhost:4000/api`
- Produção: Configurar variável de ambiente `VITE_API_URL`

## Features

- ✅ Listagem de emergências
- ✅ Detalhes de emergência
- ✅ Criação de emergência (admin)
- ✅ Navegação por slug ou ID
- ✅ Design responsivo
- ✅ Tipagem TypeScript completa

## 🎯 Boas Práticas Aplicadas

- **Separação de Responsabilidades**: Lógica separada de UI (hooks)
- **Componentes Reutilizáveis**: UI components em `shared/ui`
- **API Centralizada**: Todas as chamadas em `shared/api`
- **Custom Hooks**: Lógica de estado encapsulada
- **TypeScript**: Tipagem forte em todo o projeto
- **Feature-Sliced Design**: Arquitetura escalável

## 📖 Aprend mais

- [Vite Documentation](https://vitejs.dev/)
- [React Documentation](https://react.dev/)
- [Feature-Sliced Design](https://feature-sliced.design/)
  \`\`\`

---

## **6.2 - Adicionar comentários nos arquivos principais**

Adicione comentários explicativos nos arquivos chave:

### **useFetch.ts:**

```typescript
/**
 * Hook genérico para fazer fetching de dados
 *
 * @example
 * const { data, loading, error, refetch } = useFetch(() => api.get('/users'));
 *
 * @param fetchFn - Função que retorna uma Promise com os dados
 * @returns { data, loading, error, refetch }
 */
export function useFetch<T>(fetchFn: () => Promise<T>): UseFetchReturn<T> {
  // ...
}
```

### **emergencies.ts:**

```typescript
/**
 * API Client para endpoints de emergências
 *
 * Centraliza todas as chamadas relacionadas a emergências
 */
export const emergenciesApi = {
  /** Lista todas as emergências */
  getAll: () => api.get<Emergency[]>("/emergencies"),

  /** Busca emergência por ID ou slug */
  getById: (id: string) => api.get<Emergency>(`/emergencies/${id}`),

  // ...
};
```
