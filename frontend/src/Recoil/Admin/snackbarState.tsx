import { AlertColor } from '@mui/material'
import { atom, useRecoilState, useSetRecoilState } from 'recoil'

type SNACKBAR_STATE = {
    isOpen: boolean
    text?: string
    severity?: AlertColor
}

type SNACKBAR_PARAMS = Pick<SNACKBAR_STATE, 'text' | 'severity'>

const snackbarStateAtom = atom<SNACKBAR_STATE>({
    key: 'snackbarState',
    default: {
        isOpen: false,
    },
})

export const useSnackbar = () => {
    const setSnackbarState = useSetRecoilState(snackbarStateAtom)

    const openSnackbar = ({ text, severity }: SNACKBAR_PARAMS) => {
        setSnackbarState({
            isOpen: true,
            text,
            severity,
        })
    }

    const closeSnackbar = () => {
        setSnackbarState({
            isOpen: false,
        })
    }

    return { openSnackbar, closeSnackbar }
}

export const useCustomSnackbar = () => {
    const [snackbarState, setSnackbarState] = useRecoilState(snackbarStateAtom)

    return { snackbarState, setSnackbarState }
}