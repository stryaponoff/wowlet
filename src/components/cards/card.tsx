import React, { useState } from 'react'
import type { LayoutChangeEvent } from 'react-native'
import { StyleSheet, View } from 'react-native'
import type Card from '@/entities/Card'
import { Avatar, Surface, Text, TouchableRipple } from 'react-native-paper'

export type CardProps = {
  data: Card,
  onPress?: () => void,
}

const CardComponent: React.FC<CardProps> = ({ data, onPress }) => {
  const [avatarSize, setAvatarSize] = useState(32)

  const calculateAvatarSize = (event: LayoutChangeEvent) => {
    const size = event.nativeEvent.layout.height / 1.5
    if (Number.isFinite(size)) {
      setAvatarSize(size)
    }
  }

  return (
    <View>
      <Surface
        style={[styles.cardWrapper, { backgroundColor: data.colorPrimary }]}
        onLayout={calculateAvatarSize}
        elevation={2}
      >
        <View>
          <Avatar.Text
            size={avatarSize}
            style={{ backgroundColor: data.colorSecondary }}
            // color={data.colorSecondary.toString()}
            label={data.name.slice(0, 1).toUpperCase()}
          />
        </View>

        <TouchableRipple
          style={StyleSheet.absoluteFill}
          onPress={onPress}
        >
          <View />
        </TouchableRipple>
      </Surface>

      <Text variant="titleSmall" style={styles.cardName} numberOfLines={1}>{data.name}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  cardWrapper: {
    overflow: 'hidden',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    aspectRatio:  3.37 / 2.125, // bank card aspect ratio
  },
  cardName: {
    width: '100%',
    textAlign: 'center',
  },
})

export default CardComponent
