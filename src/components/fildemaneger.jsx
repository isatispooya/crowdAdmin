/* eslint-disable no-return-assign */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/prop-types */
import {
  Box,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
  Switch,
  TextField,
} from '@mui/material';
import React from 'react';

const Fildemnager = () => {
  const types = [
    { type: false, title: 'حقیقی' },
    { type: true, title: 'حقوقی' },
  ];
  const movazaf = [
    { type: false, title: 'خیر' },
    { type: true, title: 'بله' },
  ];

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Box
        sx={{
          width: '100%',
          maxWidth: '1000px',
          padding: 3,
          backgroundColor: '#ffffff',
          borderRadius: '16px',
          boxShadow: '0px 10px 20px rgba(0, 0, 0, 0.1)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 2,
          marginTop: '100px',
        }}
      >
        <form className="mt-8 max-w-4xl flex items-center justify-center self-center">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
            <div className="mb-6">
              <TextField id="outlined-basic" label="نام و نام خانوادگی" variant="outlined" />
            </div>

            <div className="mb-6">
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">نوع شرکت</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="نوع شرکت"
                  onChange={(e) => e.target.value}
                >
                  {types.map((typeObj, index) => (
                    <MenuItem key={index} value={typeObj.type}>
                      {typeObj.title}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>

            <div className="mb-6">
              <TextField id="outlined-basic" label="سمت" variant="outlined" />
            </div>

            <div className="mb-6">
              <TextField
                type="text"
                name="national_code"
                maxLength={10}
                onInput={(e) => (e.target.value = e.target.value.replace(/[^0-9]/g, ''))}
                required
                id="outlined-basic"
                label="کد ملی"
                variant="outlined"
              />
            </div>

            <div className="mb-6">
              <TextField
                type="text"
                required
                onInput={(e) => (e.target.value = e.target.value.replace(/[^0-9]/g, ''))}
                name="national_id"
                id="outlined-basic"
                label="کد شناسه"
                variant="outlined"
              />
            </div>

            <div className="mb-6">
              <TextField
                type="text"
                onInput={(e) => (e.target.value = e.target.value.replace(/[^0-9]/g, ''))}
                required
                maxLength={11}
                name="phone"
                id="outlined-basic"
                label="شماره تلفن"
                variant="outlined"
              />
            </div>

            <div className="mb-6">
              <TextField
                type="text"
                required
                name="representative"
                id="outlined-basic"
                label="نماینده"
                variant="outlined"
              />
            </div>
            <div className="mb-6">
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">موظف</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="موظف"
                  onChange={(e) => e.target.value}
                >
                  {movazaf.map((typeObj, index) => (
                    <MenuItem key={index} value={typeObj.type}>
                      {typeObj.title}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
            <div dir="rtl">
              <FormControlLabel label="وضعیت" control={<Switch defaultChecked />} />
            </div>
          </div>
        </form>
      </Box>
    </div>
  );
};

export default Fildemnager;
