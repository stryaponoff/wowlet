export type SortDirection = 'asc' | 'desc'
export type SortBy = 'name' | 'createdAt' | 'lastUsedAt'
export type Sorter = {
  direction: SortDirection
  sortBy: SortBy
}
