import { Box, FormControlLabel, Switch, TextField } from '@mui/material';
import { useState } from 'react';

const Resume = () => {
  const [switchStates, setSwitchStates] = useState({
    name: false,
    nationalCode: false,
    resumeFile: false,
  });

  const handleSwitchChange = (inputName) => (event) => {
    setSwitchStates((prevStates) => ({
      ...prevStates,
      [inputName]: event.target.checked,
    }));
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '50vh',
        padding: '0 16px',
        backgroundColor: '#f5f5f5',
      }}
    >
      <Box
        sx={{
          width: '100%',
          maxWidth: '900px',
          padding: 3,
          backgroundColor: '#ffffff',
          borderRadius: '16px',
          boxShadow: '0px 10px 20px rgba(0, 0, 0, 0.1)',
          display: 'flex',
          flexDirection: 'column',
          gap: 3,
        }}
      >
        <form className="w-full">
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: '1fr 1fr 1fr' },
              gap: 2,
              marginBottom: 4,
            }}
          >
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
                alignItems: 'flex-start',
              }}
            >
              <FormControlLabel
                control={
                  <Switch checked={switchStates.name} onChange={handleSwitchChange('name')} />
                }
                label="نام و نام خانوادگی"
                sx={{ mb: 1 }}
              />
              <TextField label="نام و نام خانوادگی" variant="outlined" fullWidth sx={{ mb: 2 }} />
            </Box>

            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
                alignItems: 'flex-start',
              }}
            >
              <FormControlLabel
                control={
                  <Switch
                    checked={switchStates.nationalCode}
                    onChange={handleSwitchChange('nationalCode')}
                  />
                }
                label="کد ملی"
                sx={{ mb: 1 }}
              />
              <TextField
                type="text"
                name="national_code"
                inputProps={{ maxLength: 10 }}
                required
                label="کد ملی"
                variant="outlined"
                fullWidth
                sx={{ mb: 2 }}
              />
            </Box>

            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
                alignItems: 'flex-start',
              }}
            >
              <FormControlLabel
                control={
                  <Switch
                    checked={switchStates.resumeFile}
                    onChange={handleSwitchChange('resumeFile')}
                  />
                }
                label="پیوست رزومه"
                sx={{ mb: 1 }}
              />
              <input
                type="file"
                name="resume_file"
                style={{ width: '100%', marginBottom: '16px' }}
              />
            </Box>
          </Box>
        </form>
      </Box>
    </div>
  );
};

export default Resume;
