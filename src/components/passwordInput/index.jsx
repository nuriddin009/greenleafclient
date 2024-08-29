import React, {useState} from 'react';
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import {InputAdornment} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Visibility from "@mui/icons-material/Visibility";
import FormControl from "@mui/material/FormControl";

function Index({label = "Parol", color, value, onChange, ...props}) {
    const [showPassword, setShowPassword] = useState(false);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    return (
        <FormControl sx={{mt: 1}} color={color} fullWidth variant="outlined">
            <InputLabel htmlFor="outlined-adornment-password">{label}</InputLabel>
            <OutlinedInput
                id="outlined-adornment-password"
                type={showPassword ? 'text' : 'password'}
                value={value}
                onChange={onChange}
                endAdornment={
                    <InputAdornment position="end">
                        <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                        >
                            {showPassword ? <VisibilityOff/> : <Visibility/>}
                        </IconButton>
                    </InputAdornment>
                }
                label={label}
                {...props}
            />
        </FormControl>
    );
}

export default Index;