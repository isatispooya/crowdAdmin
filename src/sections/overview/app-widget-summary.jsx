import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { fShortenNumber } from 'src/utils/format-number';
import ListAltIcon from '@mui/icons-material/ListAlt';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import AssignmentLateIcon from '@mui/icons-material/AssignmentLate';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import useGetDashboard from './service/usegetdashboard';

export default function AppWidgetSummary({ color = 'primary', sx, ...other }) {
  const { data } = useGetDashboard();
  const widgetData = [
    {
      title: 'تعداد کل طرح‌ها',
      total: data ? data['all plan'] : 0,
      icon: <ListAltIcon style={{ fontSize: '2rem' }} color="action" />,
    },
    {
      title: 'تعداد طرح‌های منقضی شده',
      total: data ? data['expire plan'] : 0,
      icon: <AssignmentLateIcon style={{ fontSize: '2rem' }} color="error" />,
    },
    {
      title: 'تعداد طرح‌های فعال',
      total: data ? data['active plan'] : 0,
      icon: <PlayCircleOutlineIcon style={{ fontSize: '2rem' }} color="success" />,
    },
    {
      title: 'تعداد کل درخواست‌ها',
      total: data ? data['all cart'] : 0,
      icon: <ShoppingCartIcon style={{ fontSize: '2rem' }} color="primary" />,
    },
    {
      title: 'تعداد درخواست‌های پایان یافته',
      total: data ? data['expire cart'] : 0,
      icon: <CheckCircleOutlineIcon style={{ fontSize: '2rem' }} color="warning" />,
    },
    {
      title: 'تعداد درخواست‌های فعال',
      total: data ? data['active cart'] : 0,
      icon: <MonetizationOnIcon style={{ fontSize: '2rem' }} color="info" />,
    },
  ];

  return (
    <Grid
      container
      spacing={2}
      justifyContent="center"
      sx={{ mt: 8, mb: 8, mx: 'auto', maxWidth: '100%', width: '100%' }}
    >
      {widgetData.map((widget, index) => (
        <Grid item xs={12} sm={6} md={4} lg={2} key={index}>
          <Card
            sx={{
              p: 3,
              height: 200, // ارتفاع ثابت برای هر باکس
              borderRadius: 2,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
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
                mb: 2, 
              }}
            >
              {widget.icon}
            </Box>

            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                {fShortenNumber(widget.total)}
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                {widget.title}
              </Typography>
            </Box>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}

AppWidgetSummary.propTypes = {
  color: PropTypes.string,
  sx: PropTypes.object,
};
