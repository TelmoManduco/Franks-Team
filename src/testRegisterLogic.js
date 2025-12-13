// src/testRegisterLogic.js

// 1. Configuração do Ambiente e Dependências
// A leitura do .env foi removida/comentada para evitar o erro de 'undefined'.
// O caminho do ficheiro DB será hardcoded.
// require('dotenv').config({ path: '../.env' });

const { PrismaBetterSqlite3 } = require("@prisma/adapter-better-sqlite3");
const { PrismaClient } = require("@prisma/client");
const BetterSqlite3 = require("better-sqlite3");

// 2. Inicialização do Adaptador
// Hardcoding do caminho da base de dados para contornar o erro do process.env
// ATENÇÃO: Verifique se este caminho está correto para si!
const connectionString = "file:./database/dev.db";

// Inicializar o driver 'better-sqlite3' removendo o prefixo "file:"
const db = new BetterSqlite3(connectionString.replace("file:", ""));
const adapter = new PrismaBetterSqlite3(db);

// 3. Inicialização do Prisma Client, passando o adapter
const prisma = new PrismaClient({ adapter });

// Dados de teste (Altere o e-mail para forçar a gravação de um novo registro)
const testData = {
  email: "test_final_robust_db@example.com",
  password: "securePassword123",
  name: "Robust Test User",
};

async function testRegister() {
  console.log(
    "--- Teste de Lógica de Registo c/ Adaptador SQLite (Versão Robusta) ---",
  );

  // --- Teste 1: Gravação com Sucesso ---
  try {
    console.log(`\n[1/2] Tentativa de criar utilizador: ${testData.email}`);

    const newUser = await prisma.user.create({
      data: {
        email: testData.email,
        password: testData.password,
        name: testData.name,
      },
    });

    console.log("✅ SUCESSO: Utilizador criado e gravado.");
  } catch (error) {
    if (error.code === "P2002") {
      console.log(
        "⚠️ AVISO: O utilizador já existe. Prosseguindo para o Teste 2.",
      );
    } else {
      console.error("❌ ERRO GRAVE no Teste 1 (Gravação):", error);
      // Mostrar a stack trace completa para depuração
      // console.error(error);
    }
  }

  // --- Teste 2: Verificação de Email Duplicado ---
  try {
    console.log(`\n[2/2] Tentativa de criar o mesmo utilizador novamente...`);

    await prisma.user.create({
      data: { email: testData.email, password: "x", name: "Duplicate" },
    });

    console.log(
      "❌ FALHA: O Prisma deveria ter bloqueado a criação duplicada.",
    );
  } catch (error) {
    if (error.code === "P2002") {
      console.log(
        "✅ SUCESSO: O Prisma bloqueou corretamente o email duplicado (Erro P2002).",
      );
    } else {
      console.error("❌ ERRO GRAVE no Teste 2 (Duplicado):", error);
    }
  }
}

// Executar o teste e fechar a ligação
testRegister()
  .catch((e) => {
    console.error("ERRO FATAL:", e);
  })
  .finally(async () => {
    await prisma.$disconnect();
    console.log("\n--- Ligação Prisma Fechada ---");
  });
