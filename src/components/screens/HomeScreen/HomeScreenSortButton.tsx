import React from 'react'
import { Appbar, Menu, Switch } from 'react-native-paper'
import { useTranslation } from 'react-i18next'
import { View } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

export const HomeScreenSortButton: React.FC = () => {
  const { t } = useTranslation()

  const [visible, setVisible] = React.useState(false)
  const openMenu = () => setVisible(true)
  const closeMenu = () => setVisible(false)

  const [isDesc, setIsDesc] = React.useState(false)

  const settingsPressHandler = () => {
    closeMenu()
    // TODO: Add navigation
  }

  return (
    <Menu
      visible={visible}
      onDismiss={closeMenu}
      anchor={<Appbar.Action icon="sort" onPress={openMenu} />}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 8 }}>
        <Icon name="sort-reverse-variant" size={24} />
        <Switch value={isDesc} onValueChange={setIsDesc} />
        <Icon name="sort-variant" size={24} />
      </View>

      <Menu.Item
        onPress={settingsPressHandler}
        title={t('HomeScreen.header.threeDotMenu.settingsButton')}
      />

      <Menu.Item
        onPress={settingsPressHandler}
        title={t('HomeScreen.header.threeDotMenu.settingsButton')}
      />
    </Menu>
  )
}
