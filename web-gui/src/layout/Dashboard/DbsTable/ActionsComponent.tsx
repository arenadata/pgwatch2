import { useState } from "react";
import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";

type Params = {
  uniqueName: string
  handleAlertOpen: (isOpen: boolean, text: string) => void
}

export const ActionsComponent = ({ uniqueName, handleAlertOpen }: Params) => {
  const [deleteClicked, setDeleteClicked] = useState(false);

  const handleDeleteOpen = () => {
    setDeleteClicked(true);
  };

  const handleDeleteClose = (event?: {}, reason?: string) => {
    if (reason === "backdropClick") {
      return;
    }

    setDeleteClicked(false);
  };

  if (uniqueName) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Button onClick={() => handleAlertOpen(true, "Updated!")} sx={{ marginRight: "7.5px", marginLeft: "2.5px" }} size="small" variant="outlined">Save</Button>

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
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Button onClick={() => handleAlertOpen(true, "Successfully created new instance!")} size="small" variant="outlined">Create</Button>
      </Box>
    );
  }
};
