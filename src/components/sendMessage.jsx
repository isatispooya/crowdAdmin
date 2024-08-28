import * as React from 'react';
import Box from '@mui/material/Box';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import { Button, FormControlLabel, Switch } from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

const SendMessage = () => (
  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
    <Box
      sx={{
        width: '100%',
        maxWidth: '1000px',
        padding: 3,
        backgroundColor: '#ffffff',
        borderRadius: '16px',
        boxShadow: '0px 10px 20px rgba(0, 0, 0, 0.1)',
        border: '1px solid #1e88e5',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 2,
        marginTop: '100px',
      }}
    >
      <TextareaAutosize
        placeholder="متن پیام خود را بنویسید..."
        minRows={4}
        style={{
          width: '100%',
          padding: '16px',
          height: '100px',
          border: '1px solid #1e88e5',
          borderRadius: '8px',
          outline: 'none',
          resize: 'none',
          boxSizing: 'border-box',
        }}
      />
      <Box
        display="flex"
        flexDirection="row"
        alignItems="center"
        gap={2}
        width="100%"
        justifyContent="space-between"
      >
        <div dir="ltr">
          <FormControlLabel control={<Switch defaultChecked />} label="وضعیت ارسال پیام" />
        </div>

        <Button
          variant="contained"
          sx={{
            backgroundColor: '#1565c0',
            color: 'white',
            '&:hover': {
              backgroundColor: '#0d47a1',
            },
          }}
          size="medium"
          endIcon={<ArrowBackIosIcon />}
        >
          ارسال
        </Button>
      </Box>
    </Box>
  </div>
);

export default SendMessage;
