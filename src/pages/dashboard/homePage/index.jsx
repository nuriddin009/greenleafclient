import React from 'react';
import {Button} from "@mui/material";
import DashboardCustomizeIcon from "@mui/icons-material/DashboardCustomize";
import Home from "../../home/index.jsx";
function Index(props) {
    return (
        <div className={'dashboard w-full'}>
            <Button
                variant='text'
                size='large'
                color='success'
                startIcon={<DashboardCustomizeIcon/>}
            >Dashboard</Button>


            <Home/>


        </div>
    );
}

export default Index;