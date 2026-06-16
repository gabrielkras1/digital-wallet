import express from "express";
import accountRoutes from "./presentation/routes/account.routes";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    status: "API funcionando"
  });
});

app.use(accountRoutes);

app.listen(3000, () => {
  console.log("Servidor rodando na porta 3000");
});