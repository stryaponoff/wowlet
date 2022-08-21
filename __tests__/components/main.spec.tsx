import 'react-native'
import * as React from 'react'
import Main from '@/main'

jest.mock('@/repositories/SettingsRepository', () => require('../../__mock__/SettingsRepository'))
jest.mock('@/repositories/CardRepository', () => require('../../__mock__/CardRepository'))

// Note: test renderer must be required after react-native.
import * as renderer from 'react-test-renderer'

it('should render correctly', () => {
  renderer.create(<Main />)
})
