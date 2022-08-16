export interface BaseRepositoryInterface<T> {
  insert(id: string, entity: T): void
  replace(id: string, entity: T): void
  update(id: string, data: Partial<T>): void
  delete(id: string): void
  get(id: string): T
  getAll(): T[]
}
