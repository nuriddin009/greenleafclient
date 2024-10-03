import {Box, Typography, Button} from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import {useNavigate} from "react-router-dom";

const EmptyWishlist = () => {
    const navigate = useNavigate()
    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                height: "70vh",
                textAlign: "center",
                padding: "20px",
            }}
        >
            <FavoriteBorderIcon
                sx={{fontSize: 100, color: "grey.400", marginBottom: "20px"}}
            />
            <Typography variant="h4" gutterBottom sx={{color: "grey.700"}}>
                Sizning istaklar ro'yxatingiz bo'sh!
            </Typography>
            <Typography
                variant="body1"
                sx={{color: "grey.600", marginBottom: "30px", maxWidth: "400px"}}
            >
                Ko'rinishidan, siz hali hech qanday mahsulotni istaklar ro'yxatiga
                qo'shmadingiz. Bizning to'plamimizni ko'rib chiqing va sevimli
                mahsulotlaringizni saqlang.
            </Typography>
            <Button
                variant="contained"
                color="primary"
                size="large"
                sx={{textTransform: "none", borderRadius: "25px", padding: "10px 20px"}}
                onClick={() => navigate('/')}
            >
                Xaridni boshlash
            </Button>
        </Box>
    );
};

export default EmptyWishlist;