import App from './App';

const port = process.env.PORT ? parseInt(process.env.PORT) : 3000;
new App(port).listen();
