import { useState } from "react";
import { Alert, Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Snackbar } from "@mui/material";

type Params = {
    uniqueName: string
}

export const ActionsComponent = ({ uniqueName }: Params) => {
    const [saveClicked, setSaveClicked] = useState(false);
    const [deleteClicked, setDeleteClicked] = useState(false);
    const [createClicked, setCreateClicked] = useState(false);

    const handleSaveClick = () => {
        setSaveClicked(true);
    };

    const handleSaveClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }

        setSaveClicked(false);
    };

    const handleDeleteOpen = () => {
        setDeleteClicked(true);
    };

    const handleDeleteClose = (event?: {}, reason?: string) => {
        if (reason === 'backdropClick') {
            return;
        }

        setDeleteClicked(false);
    };

    const handleCreateClick = () => {
        setCreateClicked(true);
    };

    const handleCreateClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }

        setCreateClicked(false);
    };

    if (uniqueName) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <Button onClick={handleSaveClick} sx={{ marginRight: '7.5px', marginLeft: '2.5px' }} size="small" variant="outlined">Save</Button>
                <Snackbar sx={{ position: 'absolute', marginLeft: 495 }} open={saveClicked} autoHideDuration={3000} onClose={handleSaveClose}>
                    <Alert sx={{ width: 500 }} variant="filled" onClose={handleSaveClose} severity="success">Updated!</Alert>
                </Snackbar>

                <Button onClick={handleDeleteOpen} size="small" variant="outlined">Delete</Button>
                <Dialog open={deleteClicked} onClose={handleDeleteClose}>
                    <DialogTitle>Warning</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            {`Remove DB "${uniqueName}" from monitoring? NB! This does not remove gathered metrics data from InfluxDB, see bottom of page for that`}
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleDeleteClose}>Ok</Button>
                        <Button onClick={handleDeleteClose}>Cancel</Button>
                    </DialogActions>
                </Dialog>
            </Box>
        );
    } else {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <Button onClick={handleCreateClick} size="small" variant="outlined">Create</Button>
                <Snackbar sx={{ position: 'absolute', marginLeft: 495 }} open={createClicked} autoHideDuration={3000} onClose={handleCreateClose}>
                    <Alert sx={{ width: 500 }} variant="filled" onClose={handleCreateClose} severity="success">Successfully created new instance!</Alert>
                </Snackbar>
            </Box>
        );
    }
};
