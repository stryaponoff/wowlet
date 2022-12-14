import React from 'react'
import { Appbar, Menu, Switch } from 'react-native-paper'
import { useTranslation } from 'react-i18next'
import { StyleSheet, View } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { observer } from 'mobx-react'
import { useInjection } from 'inversify-react'
import { Services } from '@/ioc/services'
import type { CardStore } from '@/services/store/CardStore'
import type { MainStore } from '@/services/store/MainStore'

export const HomeScreenSortButton: React.FC = observer(() => {
  const cardStore = useInjection<CardStore>(Services.CardStore)
  const mainStore = useInjection<MainStore>(Services.MainStore)

  const { t } = useTranslation()

  const [visible, setVisible] = React.useState(false)
  const openMenu = () => setVisible(true)
  const closeMenu = () => setVisible(false)

  const isDesc = React.useMemo(() => cardStore.sorter.direction === 'desc', [cardStore.sorter.direction])
  const setIsDesc = (_isDesc: boolean) => {
    cardStore.setSortDirection(_isDesc ? 'desc' : 'asc')
  }

  const isSortByName = React.useMemo(() => cardStore.sorter.sortBy === 'name', [cardStore.sorter.sortBy])
  const setSortByName = () => {
    cardStore.setSortBy('name')
  }

  const isSortByCreatedAt = React.useMemo(() => cardStore.sorter.sortBy === 'createdAt', [cardStore.sorter.sortBy])
  const setSortByCreatedAt = () => {
    cardStore.setSortBy('createdAt')
  }

  const isSortByLastUsedAt = React.useMemo(() => cardStore.sorter.sortBy === 'lastUsedAt', [cardStore.sorter.sortBy])
  const setSortByLastUsedAt = () => {
    cardStore.setSortBy('lastUsedAt')
  }

  return (
    <Menu
      visible={visible}
      onDismiss={closeMenu}
      anchor={<Appbar.Action icon="sort" onPress={openMenu} />}
    >
      <View style={styles.sortDirectionWrapper}>
        <Icon name="sort-reverse-variant" size={24} color={mainStore.theme.colors.text} />

        <Switch
          value={isDesc}
          onValueChange={setIsDesc}
        />

        <Icon name="sort-variant" size={24} color={mainStore.theme.colors.text} />
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

      <Menu.Item
        leadingIcon={isSortByLastUsedAt ? 'radiobox-marked' : 'radiobox-blank'}
        onPress={setSortByLastUsedAt}
        title={t('sort.sortBy.lastUsedAt')}
      />
    </Menu>
  )
})

const styles = StyleSheet.create({
  sortDirectionWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 8,
  },
})
