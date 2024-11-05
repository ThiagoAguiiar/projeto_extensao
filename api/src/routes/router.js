import authController from "../controllers/authController.js";
import adminController from "../controllers/adminController.js";
import authMiddleware from "../middleware/authMiddleware.js";
import sendStatus from "../utils/sendStatus.js";

const router = (app) => {
  const { login } = authController();
  const { getUsuarios, postUsuario } = adminController();

  app.post("/login", (req, res) => {
    return login(req, res);
  });

  app.get("/hello", (req, res) => {
    return sendStatus(res, 200, "Hello World!");
  });

  // Rotas protegidas pelo Middleware
  app.get("/admin/usuarios", authMiddleware, (req, res) => {
    return getUsuarios(req, res);
  });

  app.post("/admin/usuarios", authMiddleware, (req, res) => {
    return postUsuario(req, res);
  });
};

export default router;
