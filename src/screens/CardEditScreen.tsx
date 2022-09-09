import React, { useLayoutEffect, useMemo } from 'react'
import type { StackScreenProps } from '@react-navigation/stack'
import type { MainNavigatorParamList } from '@/navigation/MainNavigator'
import BaseScreenWrapper from '@/components/screens/BaseScreenWrapper'
import BaseContentWrapper from '@/components/screens/BaseContentWrapper'
import { CardEditForm } from '@/components/form/CardEditForm'
import { HomeScreenName } from '@/screens/HomeScreen'
import { BarcodeScreenName } from '@/screens/BarcodeScreen'
import { observer } from 'mobx-react'
import { useInjection } from 'inversify-react'
import { Services } from '@/ioc/services'
import { useTranslation } from 'react-i18next'
import type { CardStore } from '@/services/store/CardStore'

export const CardEditScreenName = 'CardEditScreen' as const
type CardEditScreenProps = StackScreenProps<MainNavigatorParamList, typeof CardEditScreenName>

export const CardEditScreen: React.FC<CardEditScreenProps> = observer(
  ({ navigation, route }) => {
    const { t } = useTranslation()
    const cardStore = useInjection<CardStore>(Services.CardStore)

    const card = useMemo(() => cardStore.get(route.params.cardId), [cardStore.all])

    useLayoutEffect(() => {
      navigation.setOptions({
        title: t('CardEditScreen.title', { name: card.name }),
      })
    }, [])

    const navigateToBarcodeScreen = () => {
      navigation.reset({
        index: 0,
        routes: [
          {
            name: HomeScreenName,
          },
          {
            name: BarcodeScreenName,
            params: {
              cardId: card.id,
            },
          },
        ],
      })
    }

    return (
      <BaseScreenWrapper>
        <BaseContentWrapper>
          <CardEditForm
            cardId={card.id}
            onAfterSubmit={navigateToBarcodeScreen}
          />
        </BaseContentWrapper>
      </BaseScreenWrapper>
    )
  }
)
