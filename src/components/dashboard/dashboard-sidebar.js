import { useEffect, useMemo, useRef, useState } from 'react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { Box, Button, Chip, Divider, Drawer, Typography, useMediaQuery } from '@mui/material';
import { Calendar as CalendarIcon } from '../../icons/calendar';
import { Cash as CashIcon } from '../../icons/cash';
import { ChartBar as ChartBarIcon } from '../../icons/chart-bar';
import { ChartPie as ChartPieIcon } from '../../icons/chart-pie';
import { ChatAlt2 as ChatAlt2Icon } from '../../icons/chat-alt2';
import { ClipboardList as ClipboardListIcon } from '../../icons/clipboard-list';
import { CreditCard as CreditCardIcon } from '../../icons/credit-card';
import { Home as HomeIcon } from '../../icons/home';
import { LockClosed as LockClosedIcon } from '../../icons/lock-closed';
import { Mail as MailIcon } from '../../icons/mail';
import { MailOpen as MailOpenIcon } from '../../icons/mail-open';
import { Newspaper as NewspaperIcon } from '../../icons/newspaper';
import { OfficeBuilding as OfficeBuildingIcon } from '../../icons/office-building';
import { ReceiptTax as ReceiptTaxIcon } from '../../icons/receipt-tax';
import { Selector as SelectorIcon } from '../../icons/selector';
import { Share as ShareIcon } from '../../icons/share';
import { ShoppingBag as ShoppingBagIcon } from '../../icons/shopping-bag';
import { ShoppingCart as ShoppingCartIcon } from '../../icons/shopping-cart';
import {PaperAirplane as PaperAirplaneIcon} from '../../icons/paper-airplane';
import { Truck as TruckIcon } from '../../icons/truck';
import { UserCircle as UserCircleIcon } from '../../icons/user-circle';
import { FolderOpen as FolderOpenIcon } from '../../icons/folder-open';
import { Users as UsersIcon } from '../../icons/users';
import { XCircle as XCircleIcon } from '../../icons/x-circle';
import { Logo } from '../logo';
import { Scrollbar } from '../scrollbar';
import { DashboardSidebarSection } from './dashboard-sidebar-section';
import { OrganizationPopover } from './organization-popover';
import SettingsIcon from '@mui/icons-material/Settings';

/* Esto es el Navbar Lateral que aparece a la izquierda de la pantalla con los enlaces a las distintas funciones.
*
* */

/* Aquí están todos los enlaces a las distintas secciones de la página, junto con sus respectivos iconos.
*
* Agregué un enlace a la funcionalidad de enviar Campañas de Email de Marketing a través de Mailrelay. Además, le
* agregué un icono de un sobre / carta a esta función.
* */
const getSections = (t) => [
  {
    title: t('Configuración del Gym'),
    items: [
      {
        title: t('Creación de espacios y salas'),
        path: '/rooms',
        icon: <ChartBarIcon fontSize="small" />
      },
      {
        title: t('Actividades'),
        path: '/activities',
        icon: <HomeIcon fontSize="small" />
      },
      {
        title: t('Grupos de actividades'),
        path: '/groups',
        icon: <ChartPieIcon fontSize="small" />
      },
    ]
  },
  {
    title: t('Clientes'),
    items: [
      {
        title: t('General'),
        path: '/clients',
        icon: <UsersIcon fontSize="small" />
      },
      {
        title: t('Cuotas'),
        path: '/subscriptions',
        icon: <HomeIcon fontSize="small" />
      },
      {
        title: t('Bonos'),
        path: '/vouchers',
        icon: <ChartBarIcon fontSize="small" />
      },
      {
        title: t('Productos'),
        path: '/products/',
        icon: <ChartPieIcon fontSize="small" />
      },
      {
        title: t('Servicios'),
        path: '/services/',
        icon: <PaperAirplaneIcon fontSize="small" />
      },
        // Enlace a la página para ver y Subir Documentos a los Clientes.
      {
        title: t('Documentos'),
        path: '/documents',
        // path: '/documents/upload-documents',
        icon: <PaperAirplaneIcon fontSize="small" />
      },

        // Esto es un enlace a la funcionalidad de enviar Campañas de Email de Marketing a través de Mailrelay.
      {
        title: t('Campañas de Email'),
        path: '/email-campaigns/',
        icon: <MailIcon fontSize="small" />
      },
      {
        title: t('Registro de accesos'),
        path: '/access',
        icon: <FolderOpenIcon fontSize="small" />
      },
    ]
  },
  {
    title: t('Finanzas'),
    items: [
      {
        title: t('General'),
        path: '/finances',
        icon: <ChartPieIcon fontSize="small" />
      },
      {
        title: t('Gastos'),
        path: '/expenses',
        icon: <CashIcon fontSize="small" />
      },
      {
        title: t('Ingresos'),
        path:'/profits',
        icon: <ReceiptTaxIcon fontSize="small" />,
      },
      {
        title: t('Proveedores'),
        path: '/suppliers/',
        icon: <TruckIcon fontSize="small" />,
      },
      {
        title: t('Configuracion'),
        path: '/finances/config',
        icon: <SettingsIcon fontSize="small" />
      }
    ]
  },
  {
    title: t('General'),
    items: [
      {
        title: t('Overview'),
        path: '/dashboard',
        icon: <HomeIcon fontSize="small" />
      },
      {
        title: t('Analytics'),
        path: '/dashboard/analytics',
        icon: <ChartBarIcon fontSize="small" />
      },
      {
        title: t('Finance'),
        path: '/dashboard/',
        icon: <ChartPieIcon fontSize="small" />
      },
      {
        title: t('Logistics'),
        path: '/dashboard/logistics',
        icon: <TruckIcon fontSize="small" />,
        chip: <Chip
          color="secondary"
          label={(
            <Typography
              sx={{
                fontSize: '10px',
                fontWeight: '600'
              }}
            >
              NEW
            </Typography>
          )}
          size="small"
        />
      },
      {
        title: t('Account'),
        path: '/dashboard/account',
        icon: <UserCircleIcon fontSize="small" />
      }
    ]
  },
  {
    title: t('Management'),
    items: [
      {
        title: t('Customers'),
        path: '/dashboard/customers',
        icon: <UsersIcon fontSize="small" />,
        children: [
          {
            title: t('List'),
            path: '/dashboard/customers'
          },
          {
            title: t('Details'),
            path: '/dashboard/customers/1'
          },
          {
            title: t('Edit'),
            path: '/dashboard/customers/1/edit'
          }
        ]
      },
      {
        title: t('Orders'),
        icon: <ShoppingCartIcon fontSize="small" />,
        path: '/dashboard/orders',
        children: [
          {
            title: t('List'),
            path: '/dashboard/orders'
          },
          {
            title: t('Details'),
            path: '/dashboard/orders/1'
          }
        ]
      },
      {
        title: t('Invoices'),
        path: '/dashboard/invoices',
        icon: <ReceiptTaxIcon fontSize="small" />,
        children: [
          {
            title: t('List'),
            path: '/dashboard/invoices'
          },
          {
            title: t('Details'),
            path: '/dashboard/invoices/1'
          }
        ]
      }
    ]
  },
  {
    title: t('Platforms'),
    items: [
      {
        title: t('Job Listings'),
        path: '/dashboard/jobs',
        icon: <OfficeBuildingIcon fontSize="small" />,
        children: [
          {
            title: t('Browse'),
            path: '/dashboard/jobs'
          },
          {
            title: t('Details'),
            path: '/dashboard/jobs/companies/1'
          },
          {
            title: t('Create'),
            path: '/dashboard/jobs/new'
          }
        ]
      },
      {
        title: t('Social Media'),
        path: '/dashboard/social',
        icon: <ShareIcon fontSize="small" />,
        children: [
          {
            title: t('Profile'),
            path: '/dashboard/social/profile'
          },
          {
            title: t('Feed'),
            path: '/dashboard/social/feed'
          }
        ]
      },
      {
        title: t('Blog'),
        path: '/blog',
        icon: <NewspaperIcon fontSize="small" />,
        children: [
          {
            title: t('Post List'),
            path: '/blog'
          },
          {
            title: t('Post Details'),
            path: '/blog/1'
          },
          {
            title: t('Post Create'),
            path: '/blog/new'
          }
        ]
      }
    ]
  },
  {
    title: t('Apps'),
    items: [
      {
        title: t('Kanban'),
        path: '/dashboard/kanban',
        icon: <ClipboardListIcon fontSize="small" />
      },
      {
        title: t('Mail'),
        path: '/dashboard/mail',
        icon: <MailIcon fontSize="small" />
      },
      {
        title: t('Chat'),
        path: '/dashboard/chat',
        icon: <ChatAlt2Icon fontSize="small" />
      },
      {
        title: t('Calendar'),
        path: '/dashboard/calendar',
        icon: <CalendarIcon fontSize="small" />
      }
    ]
  },
  {
    title: t('Pages'),
    items: [
      {
        title: t('Auth'),
        path: '/authentication',
        icon: <LockClosedIcon fontSize="small" />,
        children: [
          {
            title: t('Register'),
            path: '/authentication/register?disableGuard=true'
          },
          {
            title: t('Login'),
            path: '/authentication/login?disableGuard=true'
          }
        ]
      },
      {
        title: t('Pricing'),
        path: '/dashboard/pricing',
        icon: <CreditCardIcon fontSize="small" />
      },
      {
        title: t('Checkout'),
        path: '/checkout',
        icon: <CashIcon fontSize="small" />
      },
      {
        title: t('Contact'),
        path: '/contact',
        icon: <MailOpenIcon fontSize="small" />
      },
      {
        title: t('Error'),
        path: '/error',
        icon: <XCircleIcon fontSize="small" />,
        children: [
          {
            title: '401',
            path: '/401'
          },
          {
            title: '404',
            path: '/404'
          },
          {
            title: '500',
            path: '/500'
          }
        ]
      }
    ]
  }
];

export const DashboardSidebar = (props) => {
  const { onClose, open } = props;
  const router = useRouter();
  const { t } = useTranslation();
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up('lg'), {
    noSsr: true
  });
  const sections = useMemo(() => getSections(t), [t]);
  const organizationsRef = useRef(null);
  const [openOrganizationsPopover, setOpenOrganizationsPopover] = useState(false);

  const handlePathChange = () => {
    if (!router.isReady) {
      return;
    }

    if (open) {
      onClose?.();
    }
  };

  useEffect(handlePathChange,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [router.isReady, router.asPath]);

  const handleOpenOrganizationsPopover = () => {
    setOpenOrganizationsPopover(true);
  };

  const handleCloseOrganizationsPopover = () => {
    setOpenOrganizationsPopover(false);
  };

  const content = (
    <>
      <Scrollbar
        sx={{
          height: '100%',
          '& .simplebar-content': {
            height: '100%'
          }
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            height: '100%'
          }}
        >
          <div>
            <Box sx={{ p: 3 }}>
              <NextLink
                href="/"
                passHref
              >
                <a>
                  <Logo
                    sx={{
                      height: 42,
                      width: 42
                    }}
                  />
                </a>
              </NextLink>
            </Box>
            <Box sx={{ px: 2 }}>
              <Box
                onClick={handleOpenOrganizationsPopover}
                ref={organizationsRef}
                sx={{
                  alignItems: 'center',
                  backgroundColor: 'rgba(255, 255, 255, 0.04)',
                  cursor: 'pointer',
                  display: 'flex',
                  justifyContent: 'space-between',
                  px: 3,
                  py: '11px',
                  borderRadius: 1
                }}
              >
                <div>
                  <Typography
                    color="inherit"
                    variant="subtitle1"
                  >
                    Qombo
                  </Typography>
                  <Typography
                    color="neutral.400"
                    variant="body2"
                  >
                    {t('Bienvenido Administrador!')}
                  </Typography>
                </div>
                <SelectorIcon
                  sx={{
                    color: 'neutral.500',
                    width: 14,
                    height: 14
                  }}
                />
              </Box>
            </Box>
          </div>
          <Divider
            sx={{
              borderColor: '#2D3748',
              my: 3
            }}
          />
          <Box sx={{ flexGrow: 1 }}>
            {sections.map((section) => (
              <DashboardSidebarSection
                key={section.title}
                path={router.asPath}
                sx={{
                  mt: 2,
                  '& + &': {
                    mt: 2
                  }
                }}
                {...section} />
            ))}
          </Box>
          <Divider
            sx={{
              borderColor: '#2D3748'  // dark divider
            }}
          />
          <Box sx={{ p: 2 }}>
            <Typography
              color="neutral.100"
              variant="subtitle2"
            >
              {t('Need Help?')}
            </Typography>
            <Typography
              color="neutral.500"
              variant="body2"
            >
              {t('Check our docs')}
            </Typography>
            <NextLink
              href="/docs/welcome"
              passHref
            >
              <Button
                color="secondary"
                component="a"
                fullWidth
                sx={{ mt: 2 }}
                variant="contained"
              >
                {t('Documentation')}
              </Button>
            </NextLink>
          </Box>
        </Box>
      </Scrollbar>
      <OrganizationPopover
        anchorEl={organizationsRef.current}
        onClose={handleCloseOrganizationsPopover}
        open={openOrganizationsPopover}
      />
    </>
  );

  if (lgUp) {
    return (
      <Drawer
        anchor="left"
        open
        PaperProps={{
          sx: {
            backgroundColor: 'neutral.900',
            borderRightColor: 'divider',
            borderRightStyle: 'solid',
            borderRightWidth: (theme) => theme.palette.mode === 'dark' ? 1 : 0,
            color: '#FFFFFF',
            width: 280
          }
        }}
        variant="permanent"
      >
        {content}
      </Drawer>
    );
  }

  return (
    <Drawer
      anchor="left"
      onClose={onClose}
      open={open}
      PaperProps={{
        sx: {
          backgroundColor: 'neutral.900',
          color: '#FFFFFF',
          width: 280
        }
      }}
      sx={{ zIndex: (theme) => theme.zIndex.appBar + 100 }}
      variant="temporary"
    >
      {content}
    </Drawer>
  );
};

DashboardSidebar.propTypes = {
  onClose: PropTypes.func,
  open: PropTypes.bool
};
