import 'react-native'
import { fireEvent, render, screen, waitFor, waitForElementToBeRemoved } from '@testing-library/react-native'
import { Provider as PaperProvider } from 'react-native-paper'
import * as React from 'react'
import { ThreeDotMenu } from '@/components/ThreeDotMenu'

describe('Component: ThreeDotMenu', () => {
  const itemCallback = jest.fn()
  const menuItemLabel = 'test-item'
  const menuItems = [{ key: 'test-item', label: menuItemLabel, onPress: itemCallback }]

  beforeEach(() => {
    render(
      <PaperProvider>
        <ThreeDotMenu items={menuItems} />
      </PaperProvider>
    )
  })

  it('should show no items by default', () => {
    // Menu is closed so no items should be found
    expect(screen.queryByText(menuItemLabel)).toBeNull()
  })

  describe('after activator button pressed', () => {
    beforeEach(async () => {
      fireEvent.press(screen.getByTestId('activator'))
      await waitFor(() => screen.getByText(menuItemLabel))
    })

    it('should open the menu', async () => {
      expect(() => screen.getByText(menuItemLabel)).not.toThrowError()
    })

    it('should call given callback on given item press', () => {
      expect(itemCallback).not.toBeCalled()
      fireEvent.press(screen.getByText(menuItemLabel))
      expect(itemCallback).toBeCalled()
    })

    it('should close the menu on given item press', async () => {
      fireEvent.press(screen.getByText(menuItemLabel))
      await waitForElementToBeRemoved(() => screen.getByText(menuItemLabel))
      expect(screen.queryByText(menuItemLabel)).toBeNull()
    })
  })
})


