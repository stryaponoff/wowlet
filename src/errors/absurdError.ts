export default class AbsurdError extends Error {
  constructor(_: never) {
    super('Unreachable statement')
  }
}
