export default class EntityDoesNotExistError extends Error {
  constructor(id: string) {
    super(`Entity "${id}" does not exist in the repo`)
  }
}
