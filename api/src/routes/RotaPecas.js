import authController from "../controllers/authController.js";
import authMiddleware from "../middleware/authMiddleware.js";
import status from "../utils/status.js";
import pecasController from "../controllers/pecasController.js";

const router = (app) => {
  const { login, logout } = authController();
  const { get, getById, post, put, delete: _delete } = pecasController();

  app.post("/login", (req, res) => {
    return login(req, res);
  });

  app.get("/logout", (req, res) => {
    return logout(req, res);
  });

  // Rotas protegidas pelo Middleware (PEÇAS)
  app.get("/admin/pecas", authMiddleware, (req, res) => {
    return get(req, res);
  });

  app.post("/admin/pecas", authMiddleware, (req, res) => {
    return post(req, res);
  });

  app.delete("/admin/pecas", authMiddleware, (req, res) => {
    return _delete(req, res);
  });

  app.get("/admin/pecas/getById", authMiddleware, (req, res) => {
    return getById(req, res);
  });

  app.put("/admin/pecas", authMiddleware, (req, res) => {
    return put(req, res);
  });

  /* [CRUD DE PEÇAS] */
  app.get('/admin/pecas', authMiddleware, (req, res) => {
    return get(res, req)
  })
};

export default router;
