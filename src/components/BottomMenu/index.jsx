import React, {useEffect} from 'react';
import {BottomNavigation, BottomNavigationAction} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import ManageSearchIcon from "@mui/icons-material/ManageSearch";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Box from "@mui/material/Box";
import {useLocation, useNavigate} from "react-router-dom";

function Index(props) {
    const navigate = useNavigate(); // For navigation
    const [value, setValue] = React.useState(0); // For Bottom Navigation
    const sxStyle = {
        color: 'success.main', // Sets the color of the icon and label
        '& .MuiBottomNavigationAction-label': {
            color: 'success.main', // Sets the color of the label
        },
        '& .MuiBottomNavigationAction-icon': {
            color: 'success.main', // Sets the color of the icon
        },
        '&.Mui-selected': {
            color: 'success.main', // Ensures the color remains the same when selected
        },
    };

    const {pathname} = useLocation()

    useEffect(() => {
        switch (pathname) {
            case '/' :
                setValue(0)
                break;
            case '/katalog':
                setValue(1)
                break;
            case '/basket':
                setValue(2)
                break;
            case '/cabinet':
                setValue(3)
                break;
            default:
                setValue(4)
                break;
        }
    }, [pathname]);

    return (
        <Box
            sx={{
                display: {xs: 'block', md: 'none'}, // Show only on mobile/tablet
                width: '100%',
                position: 'fixed',
                bottom: 0,
                zIndex: 1000,
                backgroundColor: '#f5f5f5', // Same background as toolbar for consistency
                borderTop: '1px solid #e0e0e0', // Add a border on the top for separation
            }}
        >
            <BottomNavigation
                value={value}
                onChange={(event, newValue) => {
                    setValue(newValue);
                    switch (newValue) {
                        case 0 :
                            navigate('/')
                            break;
                        case 1:
                            navigate('/katalog')
                            break;
                        case 2:
                            navigate('/basket')
                            break;
                        case 3:
                            navigate('/cabinet')
                            break;
                    }
                }}
                color={'success'}
                showLabels={false}
            >
                <BottomNavigationAction
                    label='Bosh sahifa'
                    icon={<HomeIcon/>}
                    sx={sxStyle}
                />
                <BottomNavigationAction
                    label={'Katalog'}
                    icon={<ManageSearchIcon fontSize={'medium'}/>}
                    sx={sxStyle}
                />
                <BottomNavigationAction
                    label={'Savat'}
                    icon={<ShoppingCartIcon/>}
                    sx={sxStyle}
                />

                <BottomNavigationAction
                    label={'Kabinet'}
                    icon={<AccountCircleIcon/>}
                    sx={sxStyle}
                />
            </BottomNavigation>
        </Box>
    );
}

export default Index;