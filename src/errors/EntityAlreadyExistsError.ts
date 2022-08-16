export default class EntityAlreadyExistsError extends Error {
  constructor(id: string) {
    super(`Entity "${id}" already exists in the repo`)
  }
}
