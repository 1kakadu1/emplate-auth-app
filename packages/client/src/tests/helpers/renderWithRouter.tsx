import { render } from "@testing-library/react";
import {MemoryRouter} from "react-router-dom";
import { RouterWrap } from "../../application/application.router";
import { BASE_ROUTE } from "../../application/application.routers";
import { IUserData } from "../../store/reducer/user/user.model";
import { IUser } from "../../types";


export const renderWithRouterApp = (component: JSX.Element | JSX.Element[], initialRoute = BASE_ROUTE, options:{isAuth: boolean, userStore: IUserData | undefined, token: string | null, user: IUser | null}) => {
    return render (
        <MemoryRouter initialEntries={[initialRoute]}>
            <RouterWrap {...options} />
            {component}
        </MemoryRouter>
    )
}

export * from "@testing-library/react";
export {renderWithRouterApp as render}