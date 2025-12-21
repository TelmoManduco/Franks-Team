import express from "express";
import authRoutes from "./routes/auth";
import testDbRoutes from "./routes/test-db";
import cookieParser from "cookie-parser";


import path from "path";

export const app = express();

// --- Middlewares Globais ---
app.use(express.json()); // Para ler JSON
app.use(express.urlencoded({ extended: true })); // Para ler dados de formulários
app.use(cookieParser());


// --- Arquivos Estáticos ---
// Se tiveres uma pasta 'public' com HTML/CSS na raiz do projeto
app.use(express.static(path.join(process.cwd(), "public")));

// --- Rotas ---
app.use("/api", authRoutes);
app.use("/api", testDbRoutes);

// Opcional: Rota padrão para verificar se o servidor está vivo
app.get("/health", (req, res) => {
  res.json({ status: "ok", time: new Date().toISOString() });
});
