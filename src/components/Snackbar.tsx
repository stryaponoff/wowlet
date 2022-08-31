import type { PropsWithChildren } from 'react'
import React from 'react'
import { Snackbar as PaperSnackbar } from 'react-native-paper'

export type SnackbarActionProps = {
  label: string
  onPress: () => void
}

export type SnackbarProps = {
  visible: boolean
  onDismiss: () => void
  action?: SnackbarActionProps
}

export const Snackbar: React.FC<PropsWithChildren<SnackbarProps>> = ({ children, ...props }) => {
  return (
    <PaperSnackbar
      onDismiss={props.onDismiss}
      visible={props.visible}
      action={props.action}
    >
      {children}
    </PaperSnackbar>
  )
}
