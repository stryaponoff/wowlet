import React, { useCallback, useLayoutEffect, useMemo, useRef } from 'react'
import { List } from 'react-native-paper'
import TextInput from '@/components/form/fields/TextInput'
import BarcodeFormatDropdown from '@/components/form/fields/BarcodeFormatDropdown'
import Button from '@/components/buttons/Button'
import { useTranslation } from 'react-i18next'
import { StyleSheet } from 'react-native'
import type { Barcode } from '@/services/barcode/types'
import { BarcodeFormatArr } from '@/services/barcode/types'
import type { RecordFieldType } from '@/utils/types/RecordFieldType'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useInjection } from 'inversify-react'
import { Services } from '@/ioc/services'
import { DateTime } from 'luxon'
import uuid from 'react-native-uuid'
import { observer } from 'mobx-react'
import type { CardStore } from '@/services/store/CardStore'
import { ColorPickerInput } from '@/components/form/fields/ColorPickerInput'
import { isRecordUnknown } from '@/utils/guards/isRecordUnknown'

type CardGeneralProps = {
  onAfterSubmit?: () => void
}

type CardExistingProps = CardGeneralProps & {
  cardId: string
  barcode?: never
}

const isCardExistingProps = (value: unknown): value is CardExistingProps => {
  return isRecordUnknown(value) && typeof value.cardId === 'string'
}

type CardNewProps = CardGeneralProps & {
  barcode: Barcode
  cardId?: never
}

type CardAddFormProps = CardNewProps | CardExistingProps

type CardAddFormFields = {
  code: RecordFieldType<Barcode, 'code'>
  codeFormat: RecordFieldType<Barcode, 'format'>
  name: string
  colorPrimary: string
  colorSecondary: string
}

export const CardEditForm: React.FC<CardAddFormProps> = observer(
  (props) => {
    const { t } = useTranslation()
    const cardStore = useInjection<CardStore>(Services.CardStore)

    const isNew = useMemo(() => !isCardExistingProps(props), [props])
    const card = useMemo(() => {
      if (!isCardExistingProps(props)) {
        return null
      }

      return cardStore.get(props.cardId)
    }, [cardStore.all])

    const initialValues = useMemo(
      () => {
        if (isCardExistingProps(props)) {
          return {
            name: card!.name,
            code: card!.barcode.code,
            codeFormat: card!.barcode.format,
            colorPrimary: card!.colorPrimary,
            colorSecondary: card!.colorSecondary,
          }
        }

        return {
          name: '',
          code: props.barcode.code,
          codeFormat: props.barcode.format,
          colorPrimary: '#b69df8',
          colorSecondary: '#ffffff',
        }
      },
      [props, cardStore.all]
    )

    const { handleBlur, handleChange, handleSubmit, setFieldValue, values, errors, touched } = useFormik<CardAddFormFields>({
      initialValues,
      validateOnBlur: true,
      validateOnChange: true,
      validateOnMount: false,
      validationSchema: Yup.object().shape({
        name: Yup.string().required(t('form:rules.required', { attribute: t('form:fields.name') })),
        code: Yup.string().required(t('form:rules.required', { attribute: t('form:fields.code') })),
        codeFormat: Yup.mixed()
          .required(t('form:rules.required', { attribute: t('form:fields.codeFormat') }))
          .oneOf(
            BarcodeFormatArr as unknown as any[], // TODO: Fix types
            t(
              'form:rules.oneOf',
              {
                attribute: t('form:fields.codeFormat'),
                values: BarcodeFormatArr.join(', '),
              }
            )
          ),
      }),
      onSubmit: async _values => {
        if (isNew) {
          cardStore.insert(String(uuid.v4()), {
            barcode: {
              code: _values.code,
              format: _values.codeFormat,
            },
            colorPrimary: _values.colorPrimary,
            colorSecondary: _values.colorSecondary,
            name: _values.name,
            createdAt: DateTime.now(),
            updatedAt: DateTime.now(),
          })
        } else if (card) {
          cardStore.update(card.id, {
            barcode: {
              code: _values.code,
              format: _values.codeFormat,
            },
            colorPrimary: _values.colorPrimary,
            colorSecondary: _values.colorSecondary,
            name: _values.name,
          })
        }

        if (props.onAfterSubmit) {
          props.onAfterSubmit()
        }
      },
    })

    const hasErrors = useCallback(
      (field: keyof typeof errors): boolean => !!errors[field] && !!touched[field],
      [errors, touched],
    )

    const codeInputRef = useRef<TextInput>(null)
    const nameInputRef = useRef<TextInput>(null)

    useLayoutEffect(() => {
      nameInputRef.current?.focus()
    }, [])

    return (
      <>
        <List.Section title={t('ScanScreen.form.sections.scannedData.header')}>
          <TextInput
            ref={codeInputRef}
            onChangeText={handleChange('code')}
            onBlur={handleBlur('code')}
            value={values.code}
            hasError={hasErrors('code')}
            errorText={errors.code}
            onSubmitEditing={() => nameInputRef.current?.focus()}
            returnKeyType="next"
            placeholder={t('form:fields.password')}
            label={t('ScanScreen.form.fields.codeValue.label')}
            style={styles.marginBottom}
          />

          <BarcodeFormatDropdown
            onChange={value => setFieldValue('codeFormat', value)}
            value={values.codeFormat}
            hasError={hasErrors('codeFormat')}
            errorText={errors.codeFormat}
            label={t('ScanScreen.form.fields.codeFormat.label')}
            style={styles.marginBottom}
          />
        </List.Section>

        <List.Section title={t('ScanScreen.form.sections.cardData.header')}>
          <TextInput
            ref={nameInputRef}
            onChangeText={handleChange('name')}
            onBlur={handleBlur('name')}
            value={values.name}
            hasError={hasErrors('name')}
            errorText={errors.name}
            // onSubmitEditing={() => nameInputRef.current?.focus()}
            returnKeyType="next"
            label={t('ScanScreen.form.fields.cardName.label')}
            placeholder={t('ScanScreen.form.fields.cardName.placeholder')}
            style={styles.marginBottom}
            icon="store"
          />
        </List.Section>

        <List.Section title={t('ScanScreen.form.sections.appearance.header')}>
          <ColorPickerInput
            label={t('ScanScreen.form.fields.primaryColor.label')}
            placeholder={t('ScanScreen.form.fields.primaryColor.placeholder')}
            style={styles.marginBottom}
            icon="palette"
            onChangeText={handleChange('colorPrimary')}
            onBlur={handleBlur('colorPrimary')}
            value={values.colorPrimary}
            hasError={hasErrors('colorPrimary')}
            errorText={errors.colorPrimary}
          />

          <ColorPickerInput
            label={t('ScanScreen.form.fields.secondaryColor.label')}
            placeholder={t('ScanScreen.form.fields.secondaryColor.placeholder')}
            style={styles.marginBottom}
            icon="palette"
            onChangeText={handleChange('colorSecondary')}
            onBlur={handleBlur('colorSecondary')}
            value={values.colorSecondary}
            hasError={hasErrors('colorSecondary')}
            errorText={errors.colorSecondary}
          />
        </List.Section>

        <Button
          icon={isNew ? 'credit-card-plus-outline' : 'credit-card-edit-outline'}
          onPress={handleSubmit}
        >
          {isNew ? t('ScanScreen.form.submitNew') : t('ScanScreen.form.submitEdit')}
        </Button>
      </>
    )
  }
)
const styles = StyleSheet.create({
  marginBottom: {
    marginBottom: 16,
  },
})
