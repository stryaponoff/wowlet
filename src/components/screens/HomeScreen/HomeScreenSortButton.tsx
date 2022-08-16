import React from 'react'
import { Appbar, Menu, Switch } from 'react-native-paper'
import { useTranslation } from 'react-i18next'
import { View } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { observer } from 'mobx-react'
import { useInjection } from 'inversify-react'
import { Services } from '@/ioc/services'
import type { CardStore } from '@/services/store/CardStore'

export const HomeScreenSortButton: React.FC = observer(() => {
  const cardStore = useInjection<CardStore>(Services.CardStore)

  const { t } = useTranslation()

  const [visible, setVisible] = React.useState(false)
  const openMenu = () => setVisible(true)
  const closeMenu = () => setVisible(false)

  const isDesc = React.useMemo(() => cardStore.sortDirection === 'desc', [cardStore.sortDirection])
  const setIsDesc = (_isDesc: boolean) => {
    cardStore.setSortDirection(_isDesc ? 'desc' : 'asc')
  }

  const isSortByName = React.useMemo(() => cardStore.sortBy === 'name', [cardStore.sortBy])
  const setSortByName = () => {
    cardStore.setSortBy('name')
  }

  const isSortByCreatedAt = React.useMemo(() => cardStore.sortBy === 'createdAt', [cardStore.sortBy])
  const setSortByCreatedAt = () => {
    cardStore.setSortBy('createdAt')
  }

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
        <Switch
          value={isDesc}
          onValueChange={setIsDesc}
        />
        <Icon name="sort-variant" size={24} />
      </View>

      <Menu.Item
        leadingIcon={isSortByName ? 'radiobox-marked' : 'radiobox-blank'}
        onPress={setSortByName}
        title={t('sort.sortBy.name')}
      />

      <Menu.Item
        leadingIcon={isSortByCreatedAt ? 'radiobox-marked' : 'radiobox-blank'}
        onPress={setSortByCreatedAt}
        title={t('sort.sortBy.createdAt')}
      />
    </Menu>
  )
})
