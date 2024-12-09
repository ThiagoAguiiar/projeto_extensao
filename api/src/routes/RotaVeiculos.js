import authController from "../controllers/authController.js";
import authMiddleware from "../middleware/authMiddleware.js";
import status from "../utils/status.js";
import veiculoController from "../controllers/veiculosController.js";

const router = (app) => {
  const { login, logout } = authController();
  const { get, getByPlate, post, put, delete: _delete } = veiculoController();

  app.post("/login", (req, res) => {
    return login(req, res);
  });

  app.get("/logout", (req, res) => {
    return logout(req, res);
  });

  // Rotas protegidas pelo Middleware (VEÍCULOS)
  app.get("/admin/veiculos", authMiddleware, (req, res) => {
    return get(req, res);
  });

  app.post("/admin/veiculos", authMiddleware, (req, res) => {
    return post(req, res);
  });

  app.delete("/admin/veiculos", authMiddleware, (req, res) => {
    return _delete(req, res);
  });

  app.get("/admin/veiculos/getById", authMiddleware, (req, res) => {
    return getByPlate(req, res);
  });

  app.put("/admin/veiculos", authMiddleware, (req, res) => {
    return put(req, res);
  });

  /* [CRUD DE VEÍCULOS] */
  app.get('/admin/veiculos', authMiddleware, (req, res) => {
    return get(res, req)
  })
};

export default router;
