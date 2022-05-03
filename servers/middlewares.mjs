import bodyParser from "body-parser";
import morgan from "morgan";

export function assignMiddlewares(app) {
  // We don't care about CORS because this will only ever run locally:
  const allowCrossDomainMiddleware = (request, response, next) => {
    response.header("Access-Control-Allow-Origin", "*");
    response.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
    response.header("Access-Control-Allow-Headers", "*");

    next();
  };

  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  app.use(morgan("dev"));

  app.use(allowCrossDomainMiddleware);
}
