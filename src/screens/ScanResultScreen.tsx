import React from 'react'
import { StyleSheet } from 'react-native'
import type { StackScreenProps } from '@react-navigation/stack'
import type { MainNavigatorParamList } from '@/navigation/MainNavigator'
import { List } from 'react-native-paper'
import BaseScreenWrapper from '@/components/screens/BaseScreenWrapper'
import BaseContentWrapper from '@/components/screens/BaseContentWrapper'
import TextInput from '@/components/form/fields/TextInput'
import { useTranslation } from 'react-i18next'
import BarcodeFormatDropdown from '@/components/form/fields/BarcodeFormatDropdown'
import Button from '@/components/buttons/Button'

export const ScanResultScreenName = 'ScanResultScreen' as const
type ScanResultScreenProps = StackScreenProps<MainNavigatorParamList, typeof ScanResultScreenName>

export const ScanResultScreen: React.FC<ScanResultScreenProps> = ({ route }) => {
  const { t } = useTranslation()

  return (
    <BaseScreenWrapper>
      <BaseContentWrapper>
        <List.Section title={t('ScanScreen.form.sections.scannedData.header')}>
          <TextInput
            value={route.params.barcode.code}
            label={t('ScanScreen.form.fields.codeValue.label')}
            style={styles.marginBottom}
          />

          <BarcodeFormatDropdown
            label={t('ScanScreen.form.fields.codeFormat.label')}
            value={route.params.barcode.format}
            style={styles.marginBottom}
          />
        </List.Section>

        <List.Section title={t('ScanScreen.form.sections.cardData.header')}>
          <TextInput
            label={t('ScanScreen.form.fields.cardName.label')}
            placeholder={t('ScanScreen.form.fields.cardName.placeholder')}
            style={styles.marginBottom}
            icon="store"
          />
        </List.Section>

        <List.Section title={t('ScanScreen.form.sections.appearance.header')}>
          <TextInput
            label={t('ScanScreen.form.fields.primaryColor.label')}
            placeholder={t('ScanScreen.form.fields.primaryColor.placeholder')}
            style={styles.marginBottom}
            icon="eyedropper"
          />

          <TextInput
            label={t('ScanScreen.form.fields.secondaryColor.label')}
            placeholder={t('ScanScreen.form.fields.secondaryColor.placeholder')}
            style={styles.marginBottom}
            icon="eyedropper-plus"
          />
        </List.Section>

        <Button
          icon="credit-card-plus-outline"
        >
          {t('ScanScreen.form.submit')}
        </Button>
      </BaseContentWrapper>
    </BaseScreenWrapper>
  )
}

const styles = StyleSheet.create({
  marginBottom: {
    marginBottom: 16,
  },
})
