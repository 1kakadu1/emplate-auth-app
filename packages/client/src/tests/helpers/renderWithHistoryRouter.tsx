import { createMemoryHistory } from "history";
import { Router, Routes, Route } from 'react-router-dom';

export interface IRenderWithHistoryRouterApp { element: JSX.Element, path: string, replace: boolean }

export const renderWithHistoryRouterApp = ({ component, routes, initPath = "/login", initIndex = 0 }: { initIndex?: number, initPath?: string | Location, component?: JSX.Element | JSX.Element[], routes: IRenderWithHistoryRouterApp[], }) => {
    const initialEntries = routes.map((item) => (item.path));
    const history = createMemoryHistory({ initialEntries, initialIndex: initIndex });
    const ui =
        <Router location={initPath} navigator={history}>
            <Routes>
                {/* <Route
                            key={index}
                            path={item.path}
                            element={item.element}
                        /> */}
                {
                    routes.map((item, index) => (
                        <Route
                            key={index}
                            path={item.path}
                            element={item.element}
                        />
                    ))
                }
            </Routes>
            {component}
        </Router>
        ;

    return {
        history,
        routerUI: ui
    }
}

