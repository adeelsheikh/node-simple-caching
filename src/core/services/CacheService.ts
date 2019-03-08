class CacheService {
  private collection: { [key: string]: any } = {};

  clearCache(): void {
    this.collection = {};
  }

  containsKey(key: string): boolean {
    return key in this.collection;
  }

  async get<T>(key: string, callback: () => T): Promise<T> {
    return new Promise<T>(async resolve => {
      if (!this.collection[key]) {
        await this.set(key, callback);
      }

      resolve(this.collection[key]);
    });
  }

  getValue<T>(key: string, value: T) {
    this.setValue(key, value);

    return this.collection[key];
  }

  async set<T>(key: string, callback: () => T): Promise<void> {
    return new Promise<void>(async resolve => {
      this.collection[key] = await callback();

      resolve();
    });
  }

  setValue<T>(key: string, value: T) {
    if (this.collection[key]) {
      return this.collection[key];
    }

    this.collection[key] = value;
  }

  removeKey(key: string) {
    delete this.collection[key];
  }
}

export const cacheSvc = new CacheService();
