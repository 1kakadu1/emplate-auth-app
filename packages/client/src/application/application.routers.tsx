import { HomePage } from "../pages/home/home.page";
import { LoginPage } from "../pages/login/login.page";
import { ProfilePage } from "../pages/profile/profile.page";
import { RegistrationPage } from "../pages/registration/registration.page";
import { IRouteItem, RoutsPath } from "./application.model";

export const BASE_ROUTE = RoutsPath.login;
export const BASE_ROUTE_PRIVATE = RoutsPath.home;

export const routersPrivate: IRouteItem[] = [
  {
    name: "Home",
    private: true,
    element: <HomePage />,
    location: RoutsPath.home,
    path: RoutsPath.home,
    isMenu: true,
  },
  {
    name: "Profile",
    private: true,
    element: <ProfilePage />,
    location: RoutsPath.profile,
    path: RoutsPath.profile,
    isMenu: true,
  },
];

export const routersPublic: IRouteItem[] = [
  {
    name: "Login",
    private: false,
    element: <LoginPage />,
    location: RoutsPath.login,
    path: RoutsPath.login,
  },
  {
    name: "Registration",
    private: false,
    element: <RegistrationPage />,
    location: RoutsPath.registration,
    path: RoutsPath.registration,
  },
  {
    name: "404",
    private: false,
    element: <div> 404 </div>,
    location: RoutsPath.not_found,
    path: "*",
  },
];
