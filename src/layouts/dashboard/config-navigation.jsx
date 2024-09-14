/* eslint-disable import/no-extraneous-dependencies */
import SvgColor from 'src/components/svg-color';


// ----------------------------------------------------------------------

const icon = (name) => (
  <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
);



const navConfig = [

  {
    title: 'ایجاد و پیگیری درخواست',
    path: '/',
    icon: icon('ic_analytics'),
  },
  // {
  //   title: 'مشاهده طرح ها',
  //   path: '/request',
  //   icon: icon('ic_sheet'),
  // },
  {
    title: 'ایجاد طرح',
    path: '/plan',
    icon: icon('ic_sheet'),
  },
  {
    title: 'کاربران',
    path: '/user',
    icon: icon('ic_sheet'),
  },
];

export default navConfig;
