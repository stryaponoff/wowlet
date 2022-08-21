import 'reflect-metadata'
import CardService from '@/services/card/CardService'
import type CardRepository from '@/repositories/CardRepository'

const CardRepoMock = {
  getCards: jest.fn(),
  setCards: jest.fn(),
  getSorter: jest.fn(),
  setSorter: jest.fn(),
} as unknown as CardRepository

describe('CardService', () => {
  const service = new CardService(CardRepoMock)

  it('should get cards', () => {
    expect(CardRepoMock.getCards).not.toBeCalled()
    service.getCards()
    expect(CardRepoMock.getCards).toBeCalled()
  })

  it('should set cards', () => {
    expect(CardRepoMock.setCards).not.toBeCalled()
    service.setCards([])
    expect(CardRepoMock.setCards).toBeCalled()
  })

  it('should get sorter', () => {
    expect(CardRepoMock.getSorter).not.toBeCalled()
    service.getSorter()
    expect(CardRepoMock.getSorter).toBeCalled()
  })

  it('should set sorter', () => {
    expect(CardRepoMock.setSorter).not.toBeCalled()
    service.setSorter({ direction: 'asc', sortBy: 'createdAt' })
    expect(CardRepoMock.setSorter).toBeCalled()
  })
})
