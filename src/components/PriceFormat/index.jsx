import React from 'react';
import { Controller } from 'react-hook-form';
import { NumericFormat } from 'react-number-format';
import TextField from '@mui/material/TextField';

const PriceInput = ({ control, name, label, max }) => {
    return (
        <Controller
            name={name}
            control={control}
            rules={{
                required: { value: true, message: 'Narxni kiritish majburiy' },
                max: { value: max, message: `Maximum value is ${max}` },
            }}
            render={({ field: { onChange, onBlur, value, ref }, fieldState: { error } }) => (
                <NumericFormat
                    thousandSeparator=","
                    decimalSeparator="."
                    isNumericString
                    decimalScale={0}
                    allowNegative={false}
                    allowLeadingZeros={false}
                    value={value}
                    onValueChange={(values) => onChange(values.value)}
                    customInput={TextField}
                    inputProps={{
                        ref,
                        onBlur,
                    }}
                    label={label}
                    variant="outlined"
                    fullWidth
                    error={!!error}
                    helperText={error ? error.message : ''}
                />
            )}
        />
    );
};

export default PriceInput;

