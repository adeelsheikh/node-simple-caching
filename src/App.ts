import express, { Request, Response } from 'express';
import { cacheSvc } from './core/services/CacheService';
import { registerApiRoutes } from './core/routes';
import { userSvc } from './core/services/UserService';

class App {
  public app: express.Application;
  public port: number;

  root = './';

  constructor(port: number) {
    this.app = express();
    this.port = port;

    this.initializeMiddleware();
  }

  public listen() {
    this.app.listen(this.port, () => {
      console.log(`App listening on the port ${this.port}`);
    });
  }

  private initializeMiddleware() {
    this.app.use(express.urlencoded({ extended: true }));

    this.app.get('/', (req: Request, res: Response) => {
      res.send('API is up and running.');
    });

    this.app.get('/api/cache/:id', async (req: Request, res: Response) => {
      const user = await userSvc.getUser(+req.params.id);

      res.send(user);
    });

    this.app.get('/api/cache/:id', async (req: Request, res: Response) => {
      const user = await userSvc.getUser(+req.params.id);

      res.send(user);
    });

    this.app.delete('/api/cache/:id', (req: Request, res: Response) => {
      cacheSvc.removeKey(`user_${+req.params.id}`);

      res.send('User is deleted.');
    });

    this.app.post('/api/cache/clear', (req: Request, res: Response) => {
      cacheSvc.clearCache();

      res.send('Cache is cleared.');
    });
  }
}

export default App;
