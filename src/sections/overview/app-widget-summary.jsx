import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { fShortenNumber } from 'src/utils/format-number';
import PeopleIcon from '@mui/icons-material/People';
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';

const widgetData = [
  {
    title: 'تعداد کاربران',
    total: 2500,
    icon: <PeopleIcon style={{ fontSize: '2rem' }} color="success" />,
  },
  {
    title: 'درخواست ها ی باز',
    total: 1500,
    icon: <HourglassEmptyIcon style={{ fontSize: '2rem' }} color="warning" />,
  },
  {
    title: 'طرح های فعال',
    total: 300,
    icon: <AssignmentTurnedInIcon style={{ fontSize: '2rem' }} color="error" />,
  },
];

export default function AppWidgetSummary({ color = 'primary', sx, ...other }) {
  return (
    <Stack
      direction="row"
      spacing={2}
      justifyContent="center"
      sx={{ mt: 8, mb: 8, mx: 'auto', maxWidth: '1200px', width: '100%' }}
    >
      {widgetData.map((widget, index) => (
        <Card
          key={index}
          sx={{
            p: 3,
            borderRadius: 2,
            width: '300px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            boxShadow: 3,
            transition: '0.3s',
            background: 'rgba(255, 255, 255, 0.8)',
            '&:hover': {
              transform: 'scale(1.05)',
              boxShadow: 6,
              background: 'rgba(255, 255, 255, 1)',
            },
            ...sx,
          }}
          {...other}
        >
          <Box
            sx={{
              width: 80,
              height: 80,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {widget.icon}
          </Box>

          <Stack spacing={1} sx={{ textAlign: 'right' }}>
            <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
              {fShortenNumber(widget.total)}
            </Typography>
            <Typography variant="subtitle1" sx={{ color: 'text.secondary' }}>
              {widget.title}
            </Typography>
          </Stack>
        </Card>
      ))}
    </Stack>
  );
}

AppWidgetSummary.propTypes = {
  color: PropTypes.string,
  sx: PropTypes.object,
};
