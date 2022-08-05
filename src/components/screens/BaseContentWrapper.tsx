import React, { PropsWithChildren } from 'react'
import { StyleSheet, View } from 'react-native'

const BaseContentWrapper: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <View style={styles.container}>
      {children}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 8,
  },
})

export default BaseContentWrapper
