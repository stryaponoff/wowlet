import { useContext } from 'react'
import { ThemeContext } from '@/providers/themeProvider/ThemeProvider'

export const useTheme = () => {
  return useContext(ThemeContext)!
}
