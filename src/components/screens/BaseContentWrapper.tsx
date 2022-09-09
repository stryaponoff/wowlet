import React from 'react'
import type { PropsWithChildren } from 'react'
import type { ScrollViewProps } from 'react-native'
import { StyleSheet, ScrollView, View } from 'react-native'

type BaseContentWrapperProps =
  Pick<ScrollViewProps, 'keyboardShouldPersistTaps' | 'keyboardDismissMode'>
  & {
    noScroll?: boolean
    noHorizontalPadding?: boolean
    noVerticalPadding?: boolean
  }

const BaseContentWrapper: React.FC<PropsWithChildren<BaseContentWrapperProps>> = ({
  noScroll,
  noHorizontalPadding,
  noVerticalPadding,
  keyboardShouldPersistTaps = 'always',
  keyboardDismissMode = 'interactive',
  children,
}) => {
  if (noScroll) {
    return (
      <View
        style={[
          styles.container,
          noHorizontalPadding ? null : styles.horizontalPadding,
          noVerticalPadding ? null : styles.verticalPadding,
        ]}
      >
        {children}
      </View>
    )
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={[
        noHorizontalPadding ? null : styles.horizontalPadding,
        noVerticalPadding ? null : styles.verticalPadding,
      ]}
      keyboardShouldPersistTaps={keyboardShouldPersistTaps}
      keyboardDismissMode={keyboardDismissMode}
    >
      {children}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },
  horizontalPadding: {
    paddingHorizontal: 16,
  },
  verticalPadding: {
    paddingVertical: 16,
  },
})

export default BaseContentWrapper
