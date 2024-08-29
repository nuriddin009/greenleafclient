import React from 'react';
import {Button} from "@mui/material";
import DashboardCustomizeIcon from "@mui/icons-material/DashboardCustomize";

function Index(props) {
    return (
        <div className={'dashboard'}>
            <Button
                variant='text'
                size='large'
                color='success'
                startIcon={<DashboardCustomizeIcon/>}
            >Dashboard</Button>
        </div>
    );
}

export default Index;