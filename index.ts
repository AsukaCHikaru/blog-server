import { isExpressionStatement } from "typescript";
import * as Express from "express";
import { SetAPI } from "./api";

const app = Express();
const APP_PORT = 9000;

SetAPI(app);

app.listen(APP_PORT, () => {
  console.log(`Server is listening on port ${APP_PORT}`);
});
