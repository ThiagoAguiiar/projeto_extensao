import initExpress from "./config/express.js";
import router from "./routes/router.js";

const app = initExpress();

router(app);
