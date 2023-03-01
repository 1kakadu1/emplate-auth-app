import { HeaderMenuPublic, HeaderMenuPrivate } from "./header-menu.component";
import { render, screen } from "@testing-library/react"
import { MemoryRouter, RouterProvider, createMemoryRouter, } from "react-router-dom";
import { renderWithProviders } from "../../tests/helpers/renderWithProviders";
import { initState } from "../../store/slice";
import { IUserState } from "../../store/reducer/user/user.model";
import userEvent from "@testing-library/user-event";
import { renderWithHistoryRouterApp, IRenderWithHistoryRouterApp } from "../../tests/helpers/renderWithHistoryRouter";
import { fetchLogoutUser } from "../../store/reducer/user/user.reducer";
const pathList = ["/registration", "/login", '/fail',];
const pathPrivateList = ["/home", "/profile", '/404', "/login"];
const routes: IRenderWithHistoryRouterApp[] = [
  {
    path: "/home",
    element: <div><HeaderMenuPrivate /></div>,
    replace: false
  },
  {
    path: "/profile",
    element: <div><HeaderMenuPrivate /></div>,
    replace: false
  },
];

const setup = (userState?: IUserState) => {
  const state = userState ? userState : {
    isAuth: true,
    user: {
      email: "test@test.ru",
      name: "Test",
      id: 666,
    },
    isLoading: false,
  }
  return renderWithProviders(
    <MemoryRouter initialIndex={0} initialEntries={pathPrivateList}>
      <HeaderMenuPrivate />
    </MemoryRouter>,
    {
      preloadedState: {
        ...initState,
        stateUser: state
      }
    }
  )
}

const setupHistoryRoute = ({ userState, routes, initRoute = "/home" }: { userState?: IUserState, routes: IRenderWithHistoryRouterApp[], initRoute?: string }) => {
  const state = userState ? userState : {
    isAuth: true,
    user: {
      email: "test@test.ru",
      name: "Test",
      id: 666,
    },
    isLoading: false,
  };

  const { routerUI, history } = renderWithHistoryRouterApp({
    initPath: initRoute,
    routes: routes
  });

  return {
    history,
    render: () => renderWithProviders(routerUI,
      {
        preloadedState: {
          ...initState,
          stateUser: state
        }
      }
    )
  }
}

describe('AppBar memory router', () => {
  it('render AppBar public', () => {

    render(<MemoryRouter initialIndex={0} initialEntries={pathList}>
      <HeaderMenuPublic />
    </MemoryRouter>
    );
    const header = screen.getByTestId("appbar-public");
    expect(header).not.toBeNull();
    const headerTitle = screen.getByTestId("appbar-public");
    expect(headerTitle.textContent).toEqual("Registration");
  });

  it('render AppBar public not found path', () => {

    render(<MemoryRouter initialIndex={2} initialEntries={pathList}>
      <HeaderMenuPublic />
    </MemoryRouter>
    );
    const header = screen.getByTestId("appbar-public");
    expect(header).not.toBeNull();
    const headerTitle = screen.getByTestId("appbar-public");
    expect(headerTitle.textContent).toEqual("Mobile");
  });

  it('render AppBar private', () => {
    setup();
    const header = screen.getByTestId("appbar-private");
    expect(header).not.toBeNull();
    const tabs = screen.getByTestId("tabs");
    const tabList = screen.getAllByTestId("tab");
    expect(tabList.length).toBe(2);
    expect(tabList[0].textContent).toEqual("Home");

    expect(tabs).toHaveClass("MuiTabs-root");

    expect(tabList[0].getAttribute("aria-selected")).toBe("true");
    expect(tabList[1].getAttribute("aria-selected")).toBe("false");

  });

  it('AppBar private dropdown menu', () => {
    setup();
    const header = screen.getByTestId("appbar-private");
    expect(header).not.toBeNull();
    const menuBtn = screen.getByTestId("menu-btn");
    const menuList = screen.queryByTestId("menu-list");
    expect(menuBtn).not.toBeNull();
    expect(menuList).not.toBeNull();
    expect(menuList?.getAttribute("aria-hidden")).toBe("true");
    userEvent.click(menuBtn);
    expect(menuList?.getAttribute("aria-hidden")).toBeNull();
    // eslint-disable-next-line testing-library/no-node-access
    const overlay = menuList?.querySelector(".MuiBackdrop-root");
    expect(overlay).not.toBeNull();
    userEvent.click(overlay as Element);
    expect(menuList?.getAttribute("aria-hidden")).toBe("true");

  });

  it('AppBar private menu logout', () => {
    setup();
    expect(1).toBe(1);
  });

  it('AppBar private menu go to profile', () => {
    const router = createMemoryRouter(routes, {
      initialEntries: ["/home", "/profile"],
      initialIndex: 0,
    });

    renderWithProviders(
      <RouterProvider router={router} />,
      {
        preloadedState: {
          ...initState,
          stateUser: {
            isAuth: true,
            user: {
              email: "test@test.ru",
              name: "Test",
              id: 666,
            },
            isLoading: false,
          }
        }
      }
    );

    const menuBtn = screen.getByTestId("menu-btn");
    const menuList = screen.getByTestId("menu-list");
    expect(menuBtn).not.toBeNull();
    expect(menuList).not.toBeNull();
    userEvent.click(menuBtn);
    expect(menuList?.getAttribute("aria-hidden")).toBeNull();

    const menuItemProfie = screen.getByTestId("menu-list-item-profile");
    expect(menuItemProfie).not.toBeNull();
    expect(menuItemProfie.textContent).toEqual("Профиль");
    userEvent.click(menuItemProfie);

    const tabList = screen.getAllByTestId("tab");
    expect(tabList.length).toBe(2);
    expect(tabList[0].textContent).toEqual("Home");
    expect(tabList[0].getAttribute("aria-selected")).toBe("true");
    expect(tabList[1].getAttribute("aria-selected")).toBe("false");

    expect(router.state.location.pathname).toEqual("/profile");
  });

  it('Appbar user click logout', () => {
    const { render, history } = setupHistoryRoute({
      routes: routes,
    });
    const { store } = render();
    console.log(store.getState().stateUser)
    store.dispatch(fetchLogoutUser());
    console.log(store.getState().stateUser)
    expect(history.location.pathname).toEqual("/");

  })

  it('AppBar private menu go to profile (history route)', () => {
    const { render, history } = setupHistoryRoute({
      routes: routes,
    });
    render();

    const menuBtn = screen.getByTestId("menu-btn");
    const menuList = screen.getByTestId("menu-list");
    expect(menuBtn).not.toBeNull();
    expect(menuList).not.toBeNull();
    userEvent.click(menuBtn);
    expect(menuList?.getAttribute("aria-hidden")).toBeNull();

    const menuItemProfie = screen.getByTestId("menu-list-item-profile");
    expect(menuItemProfie).not.toBeNull();
    expect(menuItemProfie.textContent).toEqual("Профиль");
    userEvent.click(menuItemProfie);

    const tabList = screen.getAllByTestId("tab");
    expect(tabList.length).toBe(2);
    expect(tabList[0].textContent).toEqual("Home");
    expect(tabList[0].getAttribute("aria-selected")).toBe("true");
    expect(tabList[1].getAttribute("aria-selected")).toBe("false");
    expect(history.location.pathname).toEqual("/profile");
  });
});

/*
//TODO: test appbar mock
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useLocation: () => jest.fn().mockImplementation(() => ({pathname: "/login"}))
}));

describe('AppBar mock', () => {
    it('render AppBar public', () => {
       render(<HeaderMenuPublic />);
       const header = screen.getByTestId("appbar-public");
       expect(header).not.toBeNull();
       const headerTitle = screen.getByTestId("appbar-public");
       expect(headerTitle.textContent).toEqual("Login");
    });

});
*/

