import React from 'react'
import type { TextInputProps as NativeTextInputProps } from 'react-native'
import { TextInput as PaperTextInput } from 'react-native-paper'

type TextInputProps = NativeTextInputProps & {
  label?: string
  selectionColor?: string
  icon?: string
}

const TextInput: React.FC<TextInputProps> = ({ icon, ...props }) => {
  const leftIcon = icon
    ? (
      <PaperTextInput.Icon name={icon} rippleColor="transparent" />
    )
    : undefined

  return (
    <PaperTextInput
      {...props}
      label={props.label}
      placeholder={props.placeholder}
      mode="outlined"
      left={leftIcon}
    />
  )
}

export default TextInput
