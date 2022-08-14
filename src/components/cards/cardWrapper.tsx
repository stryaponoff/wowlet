import type { PropsWithChildren } from 'react'
import React, { useMemo } from 'react'
import { StyleSheet, View } from 'react-native'

export type CardWrapperProps = {
  index: number,
  numColumns: number,
  totalItems: number,
  paddingBase?: number
}

const PADDING_BASE_DEFAULT = 24

const CardWrapper: React.FC<PropsWithChildren<CardWrapperProps>> = ({
  index,
  numColumns,
  totalItems,
  paddingBase = PADDING_BASE_DEFAULT,
  children,
}) => {
  const isFirstRow = index < numColumns
  const isLastRow = !isFirstRow && Math.floor(totalItems / numColumns) === Math.floor(totalItems / (index + 1))
  const isMiddleRow = !isFirstRow && !isLastRow

  const isFirstInRow = numColumns === 1 || index % numColumns === 0
  const isLastInRow = numColumns === 1 || index % numColumns  === numColumns - 1
  const isInTheMiddleOfRow = !isFirstInRow && !isLastInRow

  const styles = useMemo(
    () => (
      StyleSheet.create({
        wrapper: {
          padding: paddingBase,
          maxWidth: `${100 / numColumns}%`,
          flex: 1,
        },
        wrapperFirstInRow: {
          paddingRight: paddingBase / 3,
        },
        wrapperLastInRow: {
          paddingLeft: paddingBase / 3,
        },
        wrapperInTheMiddleOfRow: {
          paddingHorizontal: paddingBase * 2 / 3,
        },
        wrapperFirstRow: {
          paddingBottom: paddingBase / 2,
        },
        wrapperLastRow: {
          paddingTop: paddingBase / 2,
        },
        wrapperMiddleRow: {
          paddingVertical: paddingBase / 2,
        },
      })
    ),
    [numColumns, paddingBase]
  )

  return (
    <View style={[
      styles.wrapper,
      isFirstRow ? styles.wrapperFirstRow : null,
      isLastRow ? styles.wrapperLastRow : null,
      isMiddleRow ? styles.wrapperMiddleRow : null,
      isFirstInRow ? styles.wrapperFirstInRow : null,
      isLastInRow ? styles.wrapperLastInRow : null,
      isInTheMiddleOfRow ? styles.wrapperInTheMiddleOfRow : null,
    ]}>
      {children}
    </View>
  )
}

export default CardWrapper
