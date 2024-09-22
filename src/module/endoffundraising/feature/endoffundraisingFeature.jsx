import { Box, TextField, Typography, Chip } from '@mui/material';
import { Check as CheckIcon, Close as CloseIcon } from '@mui/icons-material';

const EndOffUndraisingFeature = () => {
  const List = [
    { title: 'چک سود', data: '5654', cost: '25000' },
    { title: 'چک سود', data: '453', cost: '25000' },
    { title: 'چک سود', data: '4543543', cost: '25000' },
    { title: 'چک سود', data: '34234', cost: '25000' },
    { title: 'چک اصل', status1: true, status2: false },
  ];

  return (
    <>
      {List.map((list, index) => (
        <Box
          key={index}
          sx={{
            display: 'flex',
            alignItems: 'center',
            marginBottom: 2,
          }}
        >
          <Typography sx={{ marginRight: 2 }}>{list.title}</Typography>
          {list.data === undefined && list.cost === undefined ? (
            <Chip icon={<CloseIcon />} label=" " color="error" />
          ) : (
            <>
              {list.data && (
                <TextField label="تاریخ" value={list.data} sx={{ flexGrow: 1, marginRight: 2 }} />
              )}
              {list.cost && <TextField label="مبلغ" value={list.cost} sx={{ flexGrow: 1 }} />}
            </>
          )}
          {list.status1 !== undefined && (
            <Chip
              icon={list.status1 ? <CheckIcon /> : <CloseIcon />}
              color={list.status1 ? 'success' : 'error'}
              sx={{ marginLeft: 2 }}
            />
          )}
        </Box>
      ))}
    </>
  );
};

export default EndOffUndraisingFeature;
