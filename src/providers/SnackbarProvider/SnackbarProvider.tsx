import type { PropsWithChildren } from 'react'
import React, { createContext, useState } from 'react'
import type { SnackbarActionProps } from '@/components/Snackbar'
import { Snackbar } from '@/components/Snackbar'

export const SnackbarContext = createContext({
  notify: (_text: string, _action?: SnackbarActionProps) => {},
})

export const SnackbarProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [snackbarText, setSnackbarText] = useState('')
  const [snackbarAction, setSnackbarAction] = useState<SnackbarActionProps | undefined>()
  const [visible, setVisible] = useState(false)

  const onDismissSnackBar = () => {
    setVisible(false)
    setSnackbarText('')
    setSnackbarAction(undefined)
  }

  const notify = (text: string, action?: SnackbarActionProps) => {
    setSnackbarText(text)
    setSnackbarAction(action)
    setVisible(true)
  }

  return (
    <SnackbarContext.Provider
      value={{
        notify,
      }}
    >
      {children}

      <Snackbar
        visible={visible}
        onDismiss={onDismissSnackBar}
        action={snackbarAction}
      >
        {snackbarText}
      </Snackbar>
    </SnackbarContext.Provider>
  )
}
