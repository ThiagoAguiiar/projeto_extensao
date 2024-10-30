import iniciarExpress from "./config/express.js";
import router from "./routes/router.js";

const app = iniciarExpress();

router(app);
