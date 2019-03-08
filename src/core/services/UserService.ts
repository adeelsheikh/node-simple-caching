import { cacheSvc } from './CacheService';
class UserService {
  private users: IUser[];

  constructor() {
    this.users = [
      {
        id: 1,
        name: 'John Papa'
      },
      {
        id: 2,
        name: 'Mosh Hamedani'
      }
    ];
  }

  getUser(id: number) {
    return cacheSvc.get(`user_${id}`, async () => {
      return new Promise<IUser>(resolve => {
        setTimeout(() => {
          resolve(this.users.find(x => x.id === id));
        }, 2000);
      });
    });
  }
}

export const userSvc = new UserService();

interface IUser {
  id: number;
  name: string;
}
