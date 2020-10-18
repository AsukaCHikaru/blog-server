import * as Express from "express";
import { SetAPI } from "./api";

const app = Express();
const APP_PORT = 9000;

app.use(
  (req: Express.Request, res: Express.Response, next: Express.NextFunction) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
  }
);
SetAPI(app);

app.listen(APP_PORT, () => {
  console.log(`Server is listening on port ${APP_PORT}`);
});
