import React from 'react';
import {Box, Typography, Button} from '@mui/material';
import emptyImg from './img.png';

const EmptyTableData = ({
                            message = "No data available",
                            onActionClick,
                            actionLabel = "Add New Item",
                        }) => {
    return (
        <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            p={4}
            height="100%"
        >
            <Box mb={2}>
                <img
                    src={emptyImg}
                    alt="Empty data"
                    style={{maxWidth: '100%', height: 'auto', maxHeight: 200}}
                />
            </Box>
            <Typography variant="h6" color="textSecondary" gutterBottom textAlign='center'>
                {message}
            </Typography>
            {onActionClick && (
                <Button variant="contained" color="success" onClick={onActionClick}>
                    {actionLabel}
                </Button>
            )}
        </Box>
    );
};

export default EmptyTableData;
