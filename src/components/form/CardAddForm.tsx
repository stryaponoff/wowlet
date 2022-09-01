import React, { useCallback, useLayoutEffect, useRef } from 'react'
import { List } from 'react-native-paper'
import TextInput from '@/components/form/fields/TextInput'
import BarcodeFormatDropdown from '@/components/form/fields/BarcodeFormatDropdown'
import Button from '@/components/buttons/Button'
import { useTranslation } from 'react-i18next'
import { StyleSheet } from 'react-native'
import type { Barcode } from '@/services/barcode/types'
import type { RecordFieldType } from '@/utils/types/RecordFieldType'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { BarcodeFormatArr } from '@/services/barcode/types'
import { useInjection } from 'inversify-react'
import { Services } from '@/ioc/services'
import { DateTime } from 'luxon'
import uuid from 'react-native-uuid'
import { observer } from 'mobx-react'
import type { CardStore } from '@/services/store/CardStore'

type CardAddFormProps = {
  barcode: Barcode
  onAfterSubmit?: () => void,
}

type CardAddFormFields = {
  code: RecordFieldType<Barcode, 'code'>
  codeFormat: RecordFieldType<Barcode, 'format'>
  name: string
}

export const CardAddForm: React.FC<CardAddFormProps> = observer(
  ({ barcode, onAfterSubmit }) => {
    const cardStore = useInjection<CardStore>(Services.CardStore)
    const { t } = useTranslation()

    const { handleBlur, handleChange, handleSubmit, setFieldValue, values, errors, touched } = useFormik<CardAddFormFields>({
      initialValues: {
        name: '',
        code: barcode.code,
        codeFormat: barcode.format,
      },
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
        cardStore.insert(String(uuid.v4()), {
          barcode: {
            code: _values.code,
            format: _values.codeFormat,
          },
          colorPrimary: 'red',
          colorSecondary: 'white',
          name: _values.name,
          createdAt: DateTime.now(),
          updatedAt: DateTime.now(),
        })

        if (onAfterSubmit) {
          onAfterSubmit()
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

        {/*<List.Section title={t('ScanScreen.form.sections.appearance.header')}>*/}
        {/*  <TextInput*/}
        {/*    label={t('ScanScreen.form.fields.primaryColor.label')}*/}
        {/*    placeholder={t('ScanScreen.form.fields.primaryColor.placeholder')}*/}
        {/*    style={styles.marginBottom}*/}
        {/*    icon="eyedropper"*/}
        {/*  />*/}

        {/*  <TextInput*/}
        {/*    label={t('ScanScreen.form.fields.secondaryColor.label')}*/}
        {/*    placeholder={t('ScanScreen.form.fields.secondaryColor.placeholder')}*/}
        {/*    style={styles.marginBottom}*/}
        {/*    icon="eyedropper-plus"*/}
        {/*  />*/}
        {/*</List.Section>*/}

        <Button
          icon="credit-card-plus-outline"
          onPress={handleSubmit}
        >
          {t('ScanScreen.form.submit')}
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
