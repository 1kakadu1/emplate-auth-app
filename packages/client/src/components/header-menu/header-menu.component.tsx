import React from 'react';
import { AppBar, Tab, Tabs, Typography, Container, Toolbar, IconButton, MenuItem, Menu } from '@mui/material';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { routersPrivate, routersPublic } from '../../application/application.routers';
import { StyledToolbar, sxStylesHeaderMenu } from './header-menu.styles';
import { AccountCircle } from '@mui/icons-material';
import { useAppDispatch } from '../../store/state';
import { fetchLogoutUser } from '../../store/reducer/user/user.reducer';
import { RoutsPath } from '../../application/application.model';

export const HeaderMenuPrivate = () => {
	const location = useLocation();
	const navigate = useNavigate();
	const menuItems = routersPrivate.filter((item) => item.private === true && item.isMenu === true);
	const locationValue = menuItems.find((item) => location.pathname.includes(item.location))?.location || '/home';
	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
	const dispatch = useAppDispatch();

	const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	return (
		<AppBar position="static" data-testid="appbar-private">
			<Container maxWidth="xl">
				<StyledToolbar>
					<Tabs value={locationValue} aria-label="menu tabs" sx={sxStylesHeaderMenu.tabs} data-testid="tabs">
						{menuItems.map((item) => (
							<Tab
								data-testid={"tab"}
								sx={sxStylesHeaderMenu.tab}
								label={item.name}
								component={Link}
								to={item.location}
								key={item.location}
								value={item.location}
								id={'simple-tab-' + (item.location)}
							/>
						))}
					</Tabs>

					<div>
						<IconButton
							data-testid="menu-btn"
							size="large"
							aria-label="account of current user"
							aria-controls="menu-appbar"
							aria-haspopup="true"
							onClick={handleMenu}
							color="inherit"
						>
							<AccountCircle />
						</IconButton>
						<Menu
							data-testid="menu-list"
							id="menu-appbar"
							anchorEl={anchorEl}
							anchorOrigin={{
								vertical: 'top',
								horizontal: 'right',
							}}
							keepMounted
							transformOrigin={{
								vertical: 'top',
								horizontal: 'right',
							}}
							open={Boolean(anchorEl)}
							onClose={handleClose}
						>
							<MenuItem
								data-testid="menu-list-item-profile"
								onClick={() => {
									navigate(RoutsPath.profile);
									handleClose();
								}}
							>
								Профиль
							</MenuItem>
							<MenuItem
								data-testid="menu-list-item-logout"
								onClick={() => {
									dispatch(fetchLogoutUser());
									navigate(RoutsPath.login);
									handleClose();
								}}
							>
								Выход
							</MenuItem>
						</Menu>
					</div>
				</StyledToolbar>
			</Container>
		</AppBar>
	);
};

export const HeaderMenuPublic = () => {
	const location = useLocation();
	const title = routersPublic.find((route) => route.location === location.pathname)?.name || 'Mobile';

	return (
		<AppBar position="static" data-testid="appbar-public">
			<Container maxWidth="xl">
				<Toolbar disableGutters>
					<Typography
						variant="h6"
						noWrap
						component="div"
						sx={{
							mr: 2,
							display: { xs: 'none', md: 'flex' },
							fontFamily: 'monospace',
							fontWeight: 700,
							color: 'inherit',
							textDecoration: 'none',
						}}
						data-testid="appbar-public-title"
					>
						{title}
					</Typography>
				</Toolbar>
			</Container>
		</AppBar>
	);
};
