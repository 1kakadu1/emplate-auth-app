import styled from '@emotion/styled';
import { Toolbar } from '@mui/material';

export const StyledToolbar = styled(Toolbar)(({ theme }) => ({
	justifyContent: 'space-between',
}));

export const sxStylesHeaderMenu = {
	tab: {
		'&': {
			color: '#fff',
			fontWeight: 'bold',
		},
		'&.Mui-selected': {
			color: '#fff',
		},
	},
	tabs: {
		'.MuiTabs-indicator': {
			backgroundColor: '#fff',
		},
	},
};
