import React from 'react'
import { Appbar, Menu } from 'react-native-paper'

type MenuItem = {
  key: string
  icon?: string
  label: string
  onPress: () => void
}

type HomeScreenThreeDotButtonProps = {
  items: MenuItem[]
}

export const ThreeDotMenu: React.FC<HomeScreenThreeDotButtonProps> = (props) => {
  const [visible, setVisible] = React.useState(false)
  const openMenu = () => setVisible(true)
  const closeMenu = () => setVisible(false)

  return (
    <Menu
      visible={visible}
      onDismiss={closeMenu}
      anchor={
        <Appbar.Action
          icon="dots-vertical"
          onPress={openMenu}
          testID="activator"
        />
      }
    >
      {props.items.map(item => (
        <Menu.Item
          key={item.key}
          leadingIcon={item.icon}
          onPress={() => {
            closeMenu()
            item.onPress()
          }}
          title={item.label}
        />
      ))}
    </Menu>
  )
}
