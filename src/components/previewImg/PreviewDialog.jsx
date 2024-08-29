import {Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography} from '@mui/material';
import parse from "html-react-parser";

function PreviewDialog({open, onClose, image}) {
    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Image Preview</DialogTitle>
            <DialogContent>
                <img
                    src={image?.attachment?.url}
                    alt="Preview"
                    style={{width: '100%', maxHeight: '200px', objectFit: 'contain', marginTop: '10px'}}
                />
                <hr/>
                <Typography>{image?.description? parse(image?.description) : ''}</Typography>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary">
                    Chiqish
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default PreviewDialog;