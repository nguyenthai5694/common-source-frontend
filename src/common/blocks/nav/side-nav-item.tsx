import React, { useState } from 'react'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { Box, ButtonBase, Stack, SvgIcon } from '@mui/material';
import { useRouter } from 'app/modules/routes';

interface SideNavItemProps {
  active: boolean;
  disabled?: boolean;
  icon?: any;
  title: string;
  path: string;
  external?: boolean;
  children?: any[];
  classNames?: string;
}

export default function SideNavItem({
  active = false,
  disabled,
  icon,
  title,
  path,
  children,
  classNames,
}: SideNavItemProps) {
  const router = useRouter();
  const pathname = router.pathname;
  const [isSubNav, setSubNav] = useState(false)

  /**
   * Event click nav item
   */
  const handClick = () => {
    if (children) {
      setSubNav(!isSubNav)
    } else {
      router.push(path)
    }
  }

  return (
    <>
      <li className={classNames}>
        <div onClick={handClick}>
          <ButtonBase
            sx={{
              alignItems: 'center',
              borderRadius: 1,
              display: 'flex',
              justifyContent: 'flex-start',
              pl: '16px',
              pr: '16px',
              py: '6px',
              textAlign: 'left',
              width: '100%',
              ...(active && {
                backgroundColor: 'rgba(255, 255, 255, 0.04)',
              }),
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.04)',
              },

            }}
          // {...path}
          >

            {icon && (
              <Box
                component='span'
                sx={{
                  alignItems: 'center',
                  color: 'neutral.400',
                  display: 'inline-flex',
                  justifyContent: 'center',
                  mr: 2,
                  ...(active && {
                    color: 'primary.main',
                  }),
                }}
              >
                {icon}
              </Box>
            )}

            <Box
              component='span'
              sx={{
                color: 'neutral.400',
                flexGrow: 1,
                fontFamily: (theme) => theme.typography.fontFamily,
                fontSize: 14,
                fontWeight: 600,
                lineHeight: '24px',
                whiteSpace: 'nowrap',
                ...(active && {
                  color: 'common.white',
                }),
                ...(disabled && {
                  color: 'neutral.500',
                }),
              }}
            >
              {title}
            </Box>

            {children && <Box
              component='div'
              sx={{
                height: '100%',
                display: 'flex',
                alignItems: 'center',
              }}
              className={isSubNav ? 'nav-icon-up' : 'nav-icon-down'}
            >
              <SvgIcon
                fontSize='small'
                sx={{ color: 'neutral.500' }}
              >
                <KeyboardArrowDownIcon />
              </SvgIcon>
            </Box>}

          </ButtonBase>
        </div>
      </li>

      <li>
        <Stack
          component='ul'
          spacing={0.5}
          sx={{
            listStyle: 'none',
            p: 0,
            m: 0,
          }}
        >
          {isSubNav && children && children.map((item: any) => {
            const active = item.path ? (pathname === item.path) : false;

            return (
              <SideNavItem
                active={active}
                disabled={item?.disabled}
                external={item?.external}
                key={item.title}
                path={item.path}
                title={item.title}
                classNames='nav-sub-item'
              />
            );
          })}
        </Stack>
      </li>
    </>
  );
};

