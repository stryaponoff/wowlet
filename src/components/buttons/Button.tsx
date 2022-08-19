import type { PropsWithChildren } from 'react'
import React from 'react'
import type { ButtonProps as NativeButtonProps } from 'react-native'
import { Button as PaperButton } from 'react-native-paper'
import type { IconSource } from 'react-native-paper/lib/typescript/components/Icon'

type ButtonProps = Omit<
  NativeButtonProps,
  | 'color'
  | 'onPress'
  | 'onLongPress'
  | 'title'
> & {
  disabled?: boolean
  loading?: boolean
  compact?: boolean
  buttonColor?: string
  textColor?: string
  icon?: IconSource
  onPress?: (() => void) | undefined;
  onPressIn?: (() => void) | undefined;
  onPressOut?: (() => void) | undefined;
  onLongPress?: (() => void) | undefined;

}

const TextInput: React.FC<PropsWithChildren<ButtonProps>> = ({ children, ...props }) => {
  return (
    <PaperButton
      {...props}
      mode="contained"
    >
      {children}
    </PaperButton>
  )
}

export default TextInput
