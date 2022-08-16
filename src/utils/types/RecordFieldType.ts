export type RecordFieldType<T extends Record<any, any>, K extends keyof T> = Pick<T, K>[K]
