import express from "express";
import cors from "cors";
import emergencyRoutes from "./routes/emergencyRoutes";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/health", (req, res) => {
  res.json({
    status: "ok",
    message: "Server is running",
    timestamp: new Date().toISOString(),
  });
});

app.use("/api", emergencyRoutes);

export default app;
