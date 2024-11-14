import authController from "../controllers/authController.js";
import authMiddleware from "../middleware/authMiddleware.js";
import status from "../utils/status.js";
import usuarioController from "../controllers/usuarioController.js";

const router = (app) => {
  const { login } = authController();

  const { get, getById, post, put, delete: _delete } = usuarioController();

  app.post("/login", (req, res) => {
    return login(req, res);
  });

  app.get("/hello", (req, res) => {
    return status(res, 200, "Hello World!");
  });

  // Rotas protegidas pelo Middleware (USUÁRIOS)
  app.get("/admin/usuarios", authMiddleware, (req, res) => {
    return get(req, res);
  });

  app.post("/admin/usuarios", authMiddleware, async (req, res) => {
    return await post(req, res);
  });

  app.delete("/admin/usuarios", authMiddleware, (req, res) => {
    return _delete(req, res);
  });

  app.get("/admin/usuarios/getById", authMiddleware, (req, res) => {
    return getById(req, res);
  });

  app.put("/admin/usuarios", authMiddleware, (req, res) => {
    return put(req, res);
  });
};

export default router;
