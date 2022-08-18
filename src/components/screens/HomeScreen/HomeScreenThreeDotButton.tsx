import React from 'react'
import { Appbar, Menu } from 'react-native-paper'
import { useTranslation } from 'react-i18next'
import { SettingsScreenName } from '@/screens/SettingsScreen'
import type { StackScreenProps } from '@react-navigation/stack'
import type { MainNavigatorParamList } from '@/navigation/MainNavigator'

type HomeScreenThreeDotButtonProps = StackScreenProps<MainNavigatorParamList, 'HomeScreen'>

export const HomeScreenThreeDotButton: React.FC<HomeScreenThreeDotButtonProps> = ({ navigation }) => {
  const { t } = useTranslation()

  const [visible, setVisible] = React.useState(false)
  const openMenu = () => setVisible(true)
  const closeMenu = () => setVisible(false)

  const settingsPressHandler = () => {
    closeMenu()
    navigation.navigate(SettingsScreenName)
  }

  return (
    <Menu
      visible={visible}
      onDismiss={closeMenu}
      anchor={<Appbar.Action icon="dots-vertical" onPress={openMenu} />}
    >
      <Menu.Item
        onPress={settingsPressHandler}
        title={t('HomeScreen.header.threeDotMenu.settingsButton')}
      />
    </Menu>
  )
}
