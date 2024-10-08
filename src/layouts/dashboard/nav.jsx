import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { alpha } from '@mui/material/styles';
import ListItemButton from '@mui/material/ListItemButton';
import { usePathname, useRouter } from 'src/routes/hooks';
import { RouterLink } from 'src/routes/components';
import { useResponsive } from 'src/hooks/use-responsive';
import Logo from 'src/components/logo';
import Scrollbar from 'src/components/scrollbar';
import { getCookie } from 'src/api/cookie';
import SvgColor from 'src/components/svg-color';
import navConfig from './config-navigation';
import { NAV } from './config-layout';

export default function Nav({ openNav, onCloseNav }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const router = useRouter();
  const cookie = getCookie('sym');
  const pathname = usePathname();
  const upLg = useResponsive('up', 'lg');
  const accessApi = getCookie('accessApi');


  const exit = () => {
    document.cookie.split(';').forEach((c) => {
      document.cookie = c
        .replace(/^ +/, '')
        .replace(/=.*/, `=;expires=${new Date().toUTCString()};path=/`);
    });
    router.push('/login');
  };

  useEffect(() => {
    if (!accessApi) {
      router.push('/login');
    }
  }, [accessApi, router]);



  useEffect(() => {
    if (openNav) {
      onCloseNav();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const renderAccount = <div />;

  const renderMenu = (
    <Stack component="nav" spacing={0.5} sx={{ px: 2, color: 'green' }}>
      {navConfig.map((item) =>
        cookie === 'fevisa' ? (
          <NavItem key={item.title} item={item} />
        ) : (
          item.title !== 'پیشرفت پروژه' && <NavItem key={item.title} item={item} />
        )
      )}
      <ListItemButton
        onClick={exit}
        sx={{
          minHeight: 44,
          borderRadius: 0.75,
          typography: 'body2',
          color: 'error.main',
          textTransform: 'capitalize',
          fontWeight: 'bold',
          '&:hover': {
            bgcolor: (theme) => alpha(theme.palette.error.main, 0.08),
          },
        }}
      >
        <Box component="span" sx={{ width: 24, height: 24, mr: 2 }}>
          <SvgColor src="/assets/icons/navbar/ic_exit.svg" sx={{ width: 1, height: 1 }} />
        </Box>
        <Box component="span">خروج</Box>
      </ListItemButton>
    </Stack>
  );

  const renderContent = (
    <Scrollbar
      sx={{
        height: 1,
        '& .simplebar-content': {
          height: 1,
          display: 'flex',
          flexDirection: 'column',
        },
      }}
    >
      <Logo sx={{ mt: 3, ml: 4 }} />
      {renderAccount}
      {renderMenu}
      <Box sx={{ flexGrow: 1 }} />
    </Scrollbar>
  );

  return (
    <Box
      sx={{
        flexShrink: { lg: 0 },
        width: { lg: NAV.WIDTH },
        bgcolor: 'background.default',
        boxShadow: 2,
        borderRadius: 2,
        position: 'relative',
      }}
    >
      {upLg ? (
        <Box
          sx={{
            height: 1,
            position: 'fixed',
            width: NAV.WIDTH,
            borderRight: (theme) => `dashed 1px ${theme.palette.divider}`,
            bgcolor: 'background.paper',
            boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
          }}
        >
          {renderContent}
        </Box>
      ) : (
        <>
          <IconButton
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            sx={{
              position: 'fixed',
              top: 16,
              right: 16,
              zIndex: 1201,
              padding: 1,
              borderRadius: '50%',
              '& .MuiSvgIcon-root': {
                fontSize: 36,
                color: 'text.primary',
              },
            }}
          >
            {mobileMenuOpen ? <CloseIcon style={{ marginRight: '200px' }} /> : <MenuIcon />}
          </IconButton>

          <Drawer
            anchor="right"
            open={mobileMenuOpen}
            onClose={() => setMobileMenuOpen(false)}
            PaperProps={{
              sx: {
                width: NAV.WIDTH,
                bgcolor: 'background.paper',
                boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
                transition: 'transform 0.3s ease',
                transform: mobileMenuOpen ? 'translateX(0)' : 'translateX(100%)',
                position: 'relative',
              },
            }}
          >
            <Box
              sx={{
                position: 'absolute',
                top: 16,
                left: 16,
                zIndex: 1202,
              }}
            >
              <IconButton
                onClick={() => setMobileMenuOpen(false)}
                sx={{
                  padding: 1,
                  bgcolor: 'background.paper',
                  borderRadius: '50%',
                  boxShadow: 3,
                  '& .MuiSvgIcon-root': {
                    fontSize: 36,
                    color: 'text.primary',
                  },
                  '&:hover': {
                    bgcolor: (theme) => alpha(theme.palette.primary.main, 0.1),
                  },
                }}
              />
            </Box>
            {renderContent}
          </Drawer>
        </>
      )}
    </Box>
  );
}

Nav.propTypes = {
  openNav: PropTypes.bool,
  onCloseNav: PropTypes.func,
};

function NavItem({ item }) {
  const pathname = usePathname();
  const active = item.path === pathname;

  return (
    <ListItemButton
      component={RouterLink}
      href={item.path}
      sx={{
        minHeight: 44,
        borderRadius: 0.75,
        typography: 'body2',
        color: active ? 'primary.main' : 'text.secondary',
        textTransform: 'capitalize',
        fontWeight: active ? 'bold' : 'medium',
        bgcolor: active ? (theme) => alpha(theme.palette.primary.main, 0.08) : 'transparent',
        '&:hover': {
          bgcolor: (theme) => alpha(theme.palette.primary.main, 0.12),
        },
        transition: 'background-color 0.3s, color 0.3s',
      }}
    >
      <Box component="span" sx={{ width: 24, height: 24, mr: 2 }}>
        {item.icon}
      </Box>
      <Box component="span">{item.title}</Box>
    </ListItemButton>
  );
}

NavItem.propTypes = {
  item: PropTypes.object,
};
