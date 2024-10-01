/* eslint-disable import/no-extraneous-dependencies */
import SvgColor from 'src/components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => (
  <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
);

const navConfig = [
  {
    title: 'داشبورد',
    path: '/',
    icon: icon('ic_sheet'),
  },

  {
    title: 'ایجاد و پیگیری درخواست',
    path: '/card',
    icon: icon('ic_analytics'),
  },

  {
    title: ' طرح',
    path: '/plans',
    icon: icon('ic_sheet'),
  },
  {
    title: 'اطلاعات کاربران',
    path: '/user',
    icon: icon('ic_sheet'),
  },
  {
    title: 'اطلاعات پرداخت',
    path: '/payment',
    icon: icon('ic_sheet'),
  },
];

export default navConfig;
