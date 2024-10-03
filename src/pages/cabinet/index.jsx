import React from 'react';
import {Tabs, Tab, Box, Grid, Paper, Typography, Divider, Button} from '@mui/material';
import Header from "../../components/header/index.jsx";
import BottomMenu from "../../components/BottomMenu/index.jsx";
import AppBar from "@mui/material/AppBar";
import useMediaQuery from "@mui/material/useMediaQuery";
import {useTheme} from '@mui/material/styles';
import UserInfo from "./UserInfo.jsx";
import UserProfile from "./UserProfile.jsx";

// Tab Panel Component
function TabPanel(props) {
    const {children, value, index, ...other} = props;
    return (
        <div role="tabpanel" hidden={value !== index} {...other}>
            {value === index && <Box p={3}>{children}</Box>}
        </div>
    );
}

// Main Component: index
const Index = () => {
    const [outerTabIndex, setOuterTabIndex] = React.useState(0); // State for Buyurtmalarim / Ma'lumotlarim
    const [innerTabIndex, setInnerTabIndex] = React.useState(0); // State for Barcha Buyurtmalar / To'lov qilinmagan / Fao'l

    const handleOuterTabChange = (event, newValue) => {
        setOuterTabIndex(newValue);
    };

    const handleInnerTabChange = (event, newValue) => {
        setInnerTabIndex(newValue);
    };

    const theme = useTheme()

    const isXs = useMediaQuery('(max-width:900px)');

    if (isXs) {
        return <UserProfile/>
    }
    return (
        <>
            {!isXs && <Header/>}

            <Box sx={{mt: isXs ? 0 : 10}}>
                <AppBar position="static" color="success">
                    <Box display={!isXs ? 'none' : "flex"} justifyContent="center" alignItems="center" p={2}>
                        <Typography variant="h6">Nuriddin Inoyatov</Typography>
                    </Box>
                </AppBar>
                <br/>
                {/* Sidebar and Tabs */}
                <Grid container>
                    <Grid item xs={12} sm={3} md={2}>
                        {/* Tabs for Sidebar */}
                        <Tabs
                            value={outerTabIndex}
                            onChange={handleOuterTabChange}
                            orientation="vertical"
                            variant="fullWidth"

                        >
                            <Tab label="Buyurtmalarim" color='success'/>
                            <Tab label="Ma'lumotlarim" color='success'/>
                        </Tabs>
                    </Grid>
                    <Grid item xs={12} sm={9} md={10}>
                        {/* Inner Tabs for Buyurtmalarim */}
                        {outerTabIndex === 0 && (
                            <>
                                <Tabs value={innerTabIndex} onChange={handleInnerTabChange} centered>
                                    <Tab label="Barcha buyurtmalar"/>
                                    <Tab label="To'lov qilinmagan"/>
                                    <Tab label="Fao'l"/>
                                </Tabs>

                                {/* Tab Panels */}
                                <TabPanel value={innerTabIndex} index={0}>
                                    {/* Order Cards */}
                                    <OrderCard
                                        orderId="21884395"
                                        status="Xaridorga berilgan"
                                        updateDate="2024 M04 25 18:59"
                                        deliveryDate="M04 25, Thu"
                                        location="Toshkent sh., Yunusobod tumani, Markaz-5, 51-uy (Minor)"
                                        price="89 000 so'm"
                                        orderDate="2024 M04 24, Wed 12:06"
                                    />
                                    <OrderCard
                                        orderId="17772874"
                                        status="Xaridorga berilgan"
                                        updateDate="2024 M02 26 19:56"
                                        deliveryDate="M02 26, Mon"
                                        location="Toshkent sh., Yunusobod tumani, Markaz-5, 51-uy (Minor)"
                                        price="89 000 so'm"
                                        orderDate="2024 M04 24, Wed 12:06"
                                    />
                                </TabPanel>

                                <TabPanel value={innerTabIndex} index={1}>
                                    <Typography variant="h6">No unpaid orders found.</Typography>
                                </TabPanel>

                                <TabPanel value={innerTabIndex} index={2}>
                                    <Typography variant="h6">No active orders found.</Typography>
                                </TabPanel>
                            </>
                        )}

                        {/* Content for Ma'lumotlarim Tab */}
                        {outerTabIndex === 1 && (
                            <TabPanel value={outerTabIndex} index={1}>
                                <UserInfo/>
                            </TabPanel>
                        )}
                    </Grid>
                </Grid>
            </Box>
            <BottomMenu/>
        </>
    );
};

// Order Card Component
const OrderCard = ({orderId, status, updateDate, deliveryDate, location, price, orderDate}) => (
    <Paper elevation={3} style={{marginBottom: '16px', padding: '16px'}}>
        <Typography variant="h6">Buyurtma ID raqami {orderId}</Typography>
        <Divider style={{margin: '8px 0'}}/>
        <Grid container spacing={2}>
            <Grid item xs={6}>
                <Typography variant="body1"><strong>Holat:</strong> {status}</Typography>
                <Typography variant="body1"><strong>Yangilangan:</strong> {updateDate}</Typography>
                <Typography variant="body1"><strong>Yetkazib berish sanasi:</strong> {deliveryDate}</Typography>
                <Typography variant="body1"><strong>Topshirish punkti:</strong> {location}</Typography>
            </Grid>
            <Grid item xs={6}>
                <Typography variant="body1"><strong>Buyurtma sanasi:</strong> {orderDate}</Typography>
                <Typography variant="body1"><strong>Buyurtma qiymati:</strong> {price}</Typography>
                <Button variant="outlined" color="primary">Elektron chek</Button>
            </Grid>
        </Grid>
        <Button variant="text">1 mahsulot</Button>
    </Paper>
);

export default Index;
