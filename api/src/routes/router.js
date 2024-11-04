import authController from "../controllers/authController.js";
import authMiddleware from "../middleware/authMiddleware.js";
import sendStatus from "../utils/sendStatus.js";

const router = (app) => {
  const { login } = authController();

  app.post("/login", (req, res) => {
    return login(req, res);
  });

  app.get("/hello", (req, res) => {
    return sendStatus(res, 200, "Hello World!");
  });

  app.get("/admin", authMiddleware, (req, res) => {
    return sendStatus(res, 200, "Hello World");
  });
};

export default router;
