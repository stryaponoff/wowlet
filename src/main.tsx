import React from 'react'
import { enableScreens } from 'react-native-screens'
import { Provider as ContainerProvider } from 'inversify-react'
import container from '@/ioc/inversify.config'
import App from '@/app'

enableScreens()

export default () => {
  return (
    <ContainerProvider container={container}>
      <App />
    </ContainerProvider>
  )
}
