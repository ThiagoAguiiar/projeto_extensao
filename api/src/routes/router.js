import authController from "../controllers/authController.js";
import authMiddleware from "../middleware/authMiddleware.js";
import enviarStatus from "../utils/enviarStatus.js";
import usuarioController from "../controllers/usuarioController.js";

const router = (app) => {
  const { login } = authController();
  const { getUsuarios, postUsuario, deleteUsuario, getUsuarioId } =
    usuarioController();

  app.post("/login", (req, res) => {
    return login(req, res);
  });

  app.get("/hello", (req, res) => {
    return enviarStatus(res, 200, "Hello World!");
  });

  // Rotas protegidas pelo Middleware (USUÁRIOS)
  app.get("/admin/usuarios", authMiddleware, (req, res) => {
    return getUsuarios(req, res);
  });

  app.post("/admin/usuarios", authMiddleware, (req, res) => {
    return postUsuario(req, res);
  });

  app.delete("/admin/usuarios", authMiddleware, (req, res) => {
    return deleteUsuario(req, res);
  });

  app.get("/admin/usuarios/getById", authMiddleware, (req, res) => {
    return getUsuarioId(req, res);
  });
};

export default router;
