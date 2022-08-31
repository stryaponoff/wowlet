import type { MutableRefObject } from 'react'
import React, { forwardRef, useRef } from 'react'
import type { TextInput as NativeTextInput, TextInputProps as NativeTextInputProps } from 'react-native'
import { HelperText, TextInput as PaperTextInput } from 'react-native-paper'
import { View } from 'react-native'

type TextInputProps = NativeTextInputProps & {
  label?: string
  selectionColor?: string
  icon?: string
  hasError?: boolean
  errorText?: string
  footnoteText?: string
}

export type TextInput = NativeTextInput
export const TextInput = forwardRef<NativeTextInput, TextInputProps>(
  ({ icon, style, ...props }, externalRef) => {
    const internalRef = useRef<NativeTextInput>(null)
    const ref = (externalRef as MutableRefObject<NativeTextInput>) || internalRef

    const leftIcon = icon
      ? (
        <PaperTextInput.Icon name={icon} rippleColor="transparent" />
      )
      : undefined

    return (
      <View style={style}>
        <PaperTextInput
          {...props}
          ref={ref}
          label={props.label}
          placeholder={props.placeholder}
          mode="outlined"
          left={leftIcon}
          error={props.hasError}
        />

        {props.errorText && (
          <HelperText type="error" visible={props.hasError}>
            { props.errorText }
          </HelperText>
        )}

        {props.footnoteText && (
          <HelperText type="info" visible={!props.hasError}>
            { props.footnoteText }
          </HelperText>
        )}
      </View>
    )
  }
)
export default TextInput
