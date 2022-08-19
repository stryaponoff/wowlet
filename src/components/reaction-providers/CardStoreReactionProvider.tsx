import type { PropsWithChildren } from 'react'
import React, { useLayoutEffect } from 'react'
import { observer } from 'mobx-react'
import { useInjection } from 'inversify-react'
import { Services } from '@/ioc/services'
import { reaction } from 'mobx'
import type { CardStore } from '@/services/store/CardStore'
import type CardService from '@/services/card/CardService'

const CardStoreReactionProvider: React.FC<PropsWithChildren> = observer(({ children }) => {
  const cardStore = useInjection<CardStore>(Services.CardStore)
  const cardService = useInjection<CardService>(Services.CardService)

  useLayoutEffect(() => {
    reaction(
      () => cardStore.entities,
      value => {
        cardService.setCards(Object.values(value))
      }
    )

    reaction(
      () => cardStore.sorter,
      value => {
        cardService.setSorter(value)
      },
    )
  }, [cardStore, cardService])

  return (
    <>
      {children}
    </>
  )
})

export default CardStoreReactionProvider
