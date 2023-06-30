import { CommonRoutesConfig } from "../common/common.routes.config";

export class UsersRoutes extends CommonRoutesConfig {
  constructor(app: any) {
    super(app, "UserRoutes");
  }

  configureRoutes() {
    this.app
      .route(`/users`)
      .get((req: any, res: any) => {
        res.status(200).send(`List of users`);
      })
      .post((req: any, res: any) => {
        res.status(200).send(`Post to users`);
      });

    this.app
      .route(`/users/:userId`)
      .all((req: any, res: any, next: any) => {
        // this middleware function runs before any request to /users/:userId
        // but it doesn't accomplish anything just yet---
        // it simply passes control to the next applicable function below using next()
        next();
      })
      .get((req: any, res: any) => {
        res.status(200).send(`GET requested for id ${req.params.userId}`);
      })
      .put((req: any, res: any) => {
        res.status(200).send(`PUT requested for id ${req.params.userId}`);
      })
      .patch((req: any, res: any) => {
        res.status(200).send(`PATCH requested for id ${req.params.userId}`);
      })
      .delete((req: any, res: any) => {
        res.status(200).send(`DELETE requested for id ${req.params.userId}`);
      });

    return this.app;
  }
}
