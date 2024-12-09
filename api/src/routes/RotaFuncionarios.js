import authController from "../controllers/authController.js";
import authMiddleware from "../middleware/authMiddleware.js";
import status from "../utils/status.js";
import funcionarioController from "../controllers/funcionarioController.js";
import usuarioController from "../controllers/clienteController.js";

const router = (app) => {
  const { login, logout } = authController();
  const { get, getById, post, put, delete: _delete } = funcionarioController();

  app.get("/hello", (req, res) => {
    return status(res, 200, "Hello World!");
  });

  app.post("/login", (req, res) => {
    return login(req, res);
  });

  app.get("/logout", (req, res) => {
    return logout(req, res);
  });

  // Rotas protegidas pelo Middleware (FUNCIONÁRIOS)
  app.get("/admin/funcionarios", authMiddleware, (req, res) => {
    return get(req, res);
  });

  app.post("/admin/funcionarios", authMiddleware, (req, res) => {
    return post(req, res);
  });

  app.delete("/admin/funcionarios", authMiddleware, (req, res) => {
    return _delete(req, res);
  });

  app.get("/admin/funcionarios/getById", authMiddleware, (req, res) => {
    return getById(req, res);
  });

  app.put("/admin/funcionarios", authMiddleware, (req, res) => {
    return put(req, res);
  });

  /* [CRUD - USUÁRIOS] */
  app.get('/admin/usuarios', authMiddleware, (req, res) => {
    return get(res, req)
  })
};

export default router;
