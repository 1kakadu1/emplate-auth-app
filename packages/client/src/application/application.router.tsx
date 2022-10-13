import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter as Router, Navigate, Outlet, Route, Routes } from 'react-router-dom';
import { HeaderMenuPrivate, HeaderMenuPublic } from '../components/header-menu/header-menu.component';
import { fetchVerifyUser } from '../store/reducer/user/user.reducer';
import { toUserSelector } from '../store/reducer/user/user.selector';
import { useAppDispatch } from '../store/state';
import { IUser } from '../types';
import { RoutsPath } from './application.model';
import { routersPublic, routersPrivate, BASE_ROUTE, BASE_ROUTE_PRIVATE } from './application.routers';

export function ApplicationRouter({ user, token }: { user: IUser | null; token: string | null }) {
	const dispatch = useAppDispatch();
	const isAuth = useSelector(toUserSelector.isAuth);
	const userStore = useSelector(toUserSelector.user);
	const isLoading = useSelector(toUserSelector.isLoading);
	const [load, setLoad] = useState(user === null && token === null ? false : true);

	useEffect(() => {
		if (token && user && !isAuth && !isLoading) {
			dispatch(fetchVerifyUser() as any);
			setLoad(true);
		}
	}, []);

	useEffect(() => {
		setLoad(isLoading);
	}, [isLoading]);

	const PrivateRoutes = () => {
		return isAuth && userStore ? <Outlet /> : <Navigate to={BASE_ROUTE} />;
	};

	return load ? (
		<div> Loading ....</div>
	) : (
		<Router>
			{isAuth && userStore ? <HeaderMenuPrivate /> : <HeaderMenuPublic />}
			<Routes>
				<Route
					path={RoutsPath.init}
					element={<Navigate to={token && user ? BASE_ROUTE_PRIVATE : BASE_ROUTE} replace />}
				/>
				<Route element={<PrivateRoutes />}>
					{routersPrivate.map((route) => (
						<Route path={route.path} element={route.element} key={route.path} />
					))}
				</Route>
				{routersPublic.map((route) => (
					<Route path={route.path} element={route.element} key={route.path} />
				))}
			</Routes>
		</Router>
	);
}
