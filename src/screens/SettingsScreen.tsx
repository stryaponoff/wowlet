import React, { useMemo } from 'react'
import { StyleSheet, View } from 'react-native'
import type { StackScreenProps } from '@react-navigation/stack'
import type { MainNavigatorParamList } from '@/navigation/MainNavigator'
import { FAB, List, Switch } from 'react-native-paper'
import { ScanScreenName } from '@/screens/ScanScreen'
import BaseScreenWrapper from '@/components/screens/BaseScreenWrapper'
import BaseContentWrapper from '@/components/screens/BaseContentWrapper'
import { observer } from 'mobx-react'
import CardList from '@/components/cards/cardList'
import { BarcodeScreenName } from '@/screens/BarcodeScreen'
import type Card from '@/entities/Card'
import { useInjection } from 'inversify-react'
import { Services } from '@/ioc/services'
import type { RecordFieldType } from '@/utils/types/RecordFieldType'
import type { CardStore } from '@/services/store/CardStore'
import { useTranslation } from 'react-i18next'
import type { MainStore } from '@/services/store/MainStore'
import AbsurdError from '@/errors/absurdError'

export const SettingsScreenName = 'SettingsScreen' as const
type SettingsScreenProps = StackScreenProps<MainNavigatorParamList, typeof SettingsScreenName>

const ICON_THEME_DARK = 'brightness-1' as const
const ICON_THEME_LIGHT = 'brightness-7' as const
const ICON_THEME_AUTO = 'brightness-auto' as const

export const SettingsScreen: React.FC<SettingsScreenProps> = observer(({ navigation }) => {
  const mainStore = useInjection<MainStore>(Services.MainStore)

  const themeIcon = useMemo<string>(() => {
    switch (mainStore.preferredThemeType) {
    case 'dark':
      return ICON_THEME_DARK
    case 'light':
      return ICON_THEME_LIGHT
    case 'auto':
      return ICON_THEME_AUTO
    default:
      throw new AbsurdError(mainStore.preferredThemeType)
    }
  }, [mainStore.preferredThemeType])

  const toggleTheme = () => {
    switch (mainStore.preferredThemeType) {
    case 'dark':
      mainStore.setPreferredThemeType('light')
      break
    case 'light':
      mainStore.setPreferredThemeType('auto')
      break
    case 'auto':
      mainStore.setPreferredThemeType('dark')
      break
    default:
      throw new AbsurdError(mainStore.preferredThemeType)
    }
  }

  const { t } = useTranslation()

  return (
    <BaseScreenWrapper>
      <BaseContentWrapper noHorizontalPadding>
        <List.Section>
          <List.Item
            title={t('SettingsScreen.appearance.title')}
            description={t(`SettingsScreen.appearance.${mainStore.preferredThemeType}`)}
            onPress={toggleTheme}
            left={() => <List.Icon icon={themeIcon} />}
          />

          <List.Accordion
            title={t('SettingsScreen.appearance.title')}
            description={t(`SettingsScreen.appearance.${mainStore.preferredThemeType}`)}
            left={() => <List.Icon icon={themeIcon} />}
          >
            <List.Item
              title={t('SettingsScreen.appearance.auto')}
              onPress={() => mainStore.setPreferredThemeType('auto')}
              left={() => (
                <List.Icon
                  icon={ICON_THEME_AUTO}
                  color={
                    mainStore.preferredThemeType === 'auto'
                      ? mainStore.theme.colors.primary
                      : mainStore.theme.colors.text
                  }
                />
              )}
            />

            <List.Item
              title={t('SettingsScreen.appearance.dark')}
              onPress={() => mainStore.setPreferredThemeType('dark')}
              left={() => (
                <List.Icon
                  icon={ICON_THEME_DARK}
                  color={
                    mainStore.preferredThemeType === 'dark'
                      ? mainStore.theme.colors.primary
                      : mainStore.theme.colors.text
                  }
                />
              )}
            />

            <List.Item
              title={t('SettingsScreen.appearance.light')}
              onPress={() => mainStore.setPreferredThemeType('light')}
              left={() => (
                <List.Icon
                  icon={ICON_THEME_LIGHT}
                  color={
                    mainStore.preferredThemeType === 'light'
                      ? mainStore.theme.colors.primary
                      : mainStore.theme.colors.text
                  }
                />
              )}
            />
          </List.Accordion>
        </List.Section>
      </BaseContentWrapper>
    </BaseScreenWrapper>
  )
})
