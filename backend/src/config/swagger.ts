// src/config/swagger.ts

import swaggerJsdoc from "swagger-jsdoc";

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "First Aid API",
      version: "1.0.0",
      description:
        "API RESTful for managing medical emergencies and first aid procedures.",
      contact: {
        name: "Israel Baracho",
        email: "israbaracho@gmail.com",
        url: "https://github.com/IsraBaracho",
      },
      license: {
        name: "MIT",
        url: "https://opensource.org/licenses/MIT",
      },
    },
    servers: [
      {
        url: "http://localhost:4000",
        description: "Development server",
      },
    ],
    tags: [
      {
        name: "Emergencies",
        description: "Endpoints para gerenciar emergências médicas",
      },
      {
        name: "Health",
        description: "Endpoint de health check",
      },
    ],
    components: {
      schemas: {
        Step: {
          type: "object",
          required: ["title", "description"],
          properties: {
            title: {
              type: "string",
              description: "Título do passo",
              example: "Resfrie a área",
            },
            description: {
              type: "string",
              description: "Descrição detalhada do passo",
              example:
                "Coloque a área queimada sob água fria corrente por 10-20 minutos",
            },
          },
        },
        Emergency: {
          type: "object",
          required: [
            "id",
            "slug",
            "title",
            "tags",
            "description",
            "cta",
            "steps",
          ],
          properties: {
            id: {
              type: "string",
              description: "ID único da emergência (gerado automaticamente)",
              example: "queimadura-de-primeiro-grau-1733328000",
            },
            slug: {
              type: "string",
              description: "Slug da emergência (gerado do título)",
              example: "queimadura-de-primeiro-grau",
            },
            title: {
              type: "string",
              description: "Título da emergência",
              example: "Queimadura de Primeiro Grau",
            },
            tags: {
              type: "array",
              items: {
                type: "string",
              },
              description: "Tags relacionadas",
              example: ["queimadura", "urgente", "primeiros-socorros"],
            },
            description: {
              type: "string",
              description: "Descrição da emergência",
              example: "Procedimento para tratar queimaduras leves",
            },
            cta: {
              type: "string",
              nullable: true,
              description: "Call to action / aviso importante",
              example:
                "Se a queimadura for grave, procure atendimento médico imediatamente",
            },
            steps: {
              type: "array",
              items: {
                $ref: "#/components/schemas/Step",
              },
              description: "Passos do procedimento",
            },
          },
        },
        CreateEmergencyDTO: {
          type: "object",
          required: ["title", "steps"],
          properties: {
            title: {
              type: "string",
              description: "Título da emergência",
              example: "Queimadura de Primeiro Grau",
            },
            steps: {
              type: "array",
              items: {
                $ref: "#/components/schemas/Step",
              },
              description: "Passos do procedimento (mínimo 1)",
              minItems: 1,
            },
            slug: {
              type: "string",
              description:
                "Slug customizado (opcional, será gerado se não fornecido)",
              example: "queimadura-primeiro-grau",
            },
            tags: {
              type: "array",
              items: {
                type: "string",
              },
              description: "Tags relacionadas",
              example: ["queimadura", "urgente"],
            },
            description: {
              type: "string",
              description: "Descrição da emergência",
              example: "Procedimento para tratar queimaduras leves",
            },
            cta: {
              type: "string",
              description: "Call to action / aviso importante",
              example: "Procure médico se grave",
            },
          },
        },
        UpdateEmergencyDTO: {
          type: "object",
          properties: {
            title: {
              type: "string",
              description: "Novo título da emergência",
              example: "Queimadura Grave de Primeiro Grau",
            },
            slug: {
              type: "string",
              description: "Novo slug",
              example: "queimadura-grave",
            },
            tags: {
              type: "array",
              items: {
                type: "string",
              },
              description: "Novas tags",
            },
            description: {
              type: "string",
              description: "Nova descrição",
            },
            cta: {
              type: "string",
              description: "Novo call to action",
            },
            steps: {
              type: "array",
              items: {
                $ref: "#/components/schemas/Step",
              },
              description: "Novos passos",
            },
          },
        },
        Error: {
          type: "object",
          properties: {
            error: {
              type: "string",
              description: "Mensagem de erro",
              example: "Emergency not found",
            },
          },
        },
        HealthCheck: {
          type: "object",
          properties: {
            status: {
              type: "string",
              example: "ok",
            },
            message: {
              type: "string",
              example: "Server is running",
            },
            timestamp: {
              type: "string",
              format: "date-time",
              example: "2024-12-04T10:30:00.000Z",
            },
          },
        },
      },
    },
  },
  apis: ["./src/routes/*.ts", "./src/server.ts"],
};

const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec;
