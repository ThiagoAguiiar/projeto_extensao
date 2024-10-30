import authController from "../controllers/authController.js";
import sendStatus from "../utils/sendStatus.js";

const router = (app) => {
  app.post("/login", (req, res) => authController().login(req, res));
  app.get("/hello", (req, res) => sendStatus(res, 200, "Hello World!"));
};

export default router;
