import { useContext } from 'react'
import { SnackbarContext } from '@/providers/SnackbarProvider/SnackbarProvider'

export const useSnackbar = () => {
  return useContext(SnackbarContext)
}
