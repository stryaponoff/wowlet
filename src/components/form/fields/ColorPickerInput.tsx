import type { MutableRefObject } from 'react'
import React, { forwardRef, useRef } from 'react'
import type { TextInput as NativeTextInput, TextInputProps as NativeTextInputProps } from 'react-native'
import { Keyboard, StyleSheet, View } from 'react-native'
import { Button, Dialog, HelperText, Portal, TextInput as PaperTextInput } from 'react-native-paper'
import ColorPicker from 'react-native-wheel-color-picker'

type ColorPickerInputProps = NativeTextInputProps & {
  label?: string
  selectionColor?: string
  icon?: string
  hasError?: boolean
  errorText?: string
  footnoteText?: string
}

export type ColorPickerInput = NativeTextInput
export const ColorPickerInput = forwardRef<NativeTextInput, ColorPickerInputProps>(
  ({ icon, style, ...props }, externalRef) => {
    const internalRef = useRef<NativeTextInput>(null)
    const ref = (externalRef as MutableRefObject<NativeTextInput>) || internalRef

    const [pickerHeight, setPickerHeight] = React.useState(0)
    const [pickerVisible, setPickerVisible] = React.useState(false)
    const openPicker = () => {
      Keyboard.dismiss()
      setPickerVisible(true)
    }
    const closePicker = () => setPickerVisible(false)

    const leftIcon = icon
      ? (
        <PaperTextInput.Icon icon={icon} />
      )
      : undefined

    const rightIcon: React.ReactNode = (
      <PaperTextInput.Icon icon="eyedropper" onPress={openPicker} />
    )

    return (
      <View style={style}>
        <PaperTextInput
          {...props}
          ref={ref}
          label={props.label}
          placeholder={props.placeholder}
          mode="outlined"
          left={leftIcon}
          right={rightIcon}
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

        <Portal>
          <Dialog
            visible={pickerVisible}
            onDismiss={closePicker}
          >
            {/* TODO: Add i18n */}
            <Dialog.Title>Color picker</Dialog.Title>

            <Dialog.Content>
              <View
                style={{ minHeight: pickerHeight }}
                onLayout={({ nativeEvent: { layout: { width } } }) => {
                  setPickerHeight(width)
                }}
              >
                <ColorPicker
                  style={styles.overflowHidden}
                  color={props.value}
                  onColorChangeComplete={props.onChangeText}
                />
              </View>
            </Dialog.Content>

            <Dialog.Actions>
              <Button onPress={closePicker}>Done</Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
      </View>
    )
  }
)

const styles = StyleSheet.create({
  overflowHidden: {
    overflow: 'hidden',
  },
})
