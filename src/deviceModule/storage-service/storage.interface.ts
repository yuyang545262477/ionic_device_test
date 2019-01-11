export interface StorageInterface {
  getToken(): string;

  get<T>(key: string): Promise<T>;

  set<T>(key: string, value: T): Promise<T>;

  clear(): Promise<void>
}
