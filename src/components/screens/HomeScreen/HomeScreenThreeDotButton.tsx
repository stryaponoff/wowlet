import React from 'react'
import { Appbar, Menu } from 'react-native-paper'
import { useTranslation } from 'react-i18next'

export const HomeScreenThreeDotButton: React.FC = () => {
  const { t } = useTranslation()

  const [visible, setVisible] = React.useState(false)
  const openMenu = () => setVisible(true)
  const closeMenu = () => setVisible(false)

  const settingsPressHandler = () => {
    closeMenu()
    // TODO: Add navigation
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
