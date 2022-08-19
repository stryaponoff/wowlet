import React from 'react'
import type { PropsWithChildren } from 'react'
import { StyleSheet, View } from 'react-native'

type BaseContentWrapperProps = {
  noHorizontalPadding?: boolean,
  noVerticalPadding?: boolean,
}

const BaseContentWrapper: React.FC<PropsWithChildren<BaseContentWrapperProps>> = ({
  noHorizontalPadding,
  noVerticalPadding,
  children,
}) => {
  return (
    <View style={[
      styles.container,
      noHorizontalPadding ? null : styles.horizontalPadding,
      noVerticalPadding ? null : styles.verticalPadding,
    ]}>
      {children}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  horizontalPadding: {
    paddingHorizontal: 16,
  },
  verticalPadding: {
    paddingVertical: 16,
  },
})

export default BaseContentWrapper
