import express from "express";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./config/swagger";
import emergencyRoutes from "./routes/emergencyRoutes";
import app from "./app";

const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

//Swagger Documentation
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec, {
    customCss: ".swagger-ui .topbar { display: none }",
    customSiteTitle: "First Aid API Documentation",
  }),
);

/**
 * @swagger
 * /health:
 *   get:
 *     summary: Health check do servidor
 *     description: Verifica se o servidor está funcionando corretamente
 *     tags: [Health]
 *     responses:
 *       200:
 *         description: Servidor funcionando
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/HealthCheck'
 */

app.get("/health", (req, res) => {
  res.json({
    status: "OK",
    message: "Server is running",
    timestamp: new Date().toISOString(),
  });
});

app.use("/api", emergencyRoutes);

//Inicia o servidor
app.listen(PORT, () => {
  console.log("server is running");
  console.log(`http://localhost:${PORT}`);
  console.log(`API: http://localhost:${PORT}/api/emergencies`);
  console.log(`Health: http://localhost:${PORT}/health`);
});
