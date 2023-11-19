import { Snackbar } from '@mui/material'
import { useCustomSnackbar, useSnackbar } from '../../Recoil/Admin/snackbarState'
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import React from 'react';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref,
) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
export const CustomSnackbar = () => {
    const { snackbarState } = useCustomSnackbar();
    const { closeSnackbar } = useSnackbar();

    return (
        <Snackbar
            open={snackbarState.isOpen}
            autoHideDuration={3000}
            onClose={closeSnackbar}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            className="w-80">
            <Alert
                onClose={closeSnackbar}
                severity={snackbarState.severity}
                className="w-full">
                {snackbarState.text}
            </Alert>
        </Snackbar>
    )
}