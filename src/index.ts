import "dotenv/config";
import { app } from "./app"; // Importa o app já configurado do apps.ts

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
