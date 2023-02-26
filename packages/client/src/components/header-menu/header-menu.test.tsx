import { HeaderMenuPublic, HeaderMenuPrivate } from "./header-menu.component";
import { render, screen} from "@testing-library/react"
import { MemoryRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { setupStore, store } from "../../store/state";
import { renderWithProviders } from "../../tests/helpers/renderWithProviders";
import { initState } from "../../store/slice";
const pathList = ["/registration", "/login", '/fail',];
const pathPrivateList = ["/home", "/profile", '/404',] 

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
      //const initStore = setupStore({});
      const {store}  = renderWithProviders(                
              <MemoryRouter initialIndex={0} initialEntries={pathPrivateList}>
                <HeaderMenuPrivate />
               </MemoryRouter>, 
               {preloadedState:{
                ...initState,
                stateUser:{
                  ...initState.stateUser,
                  isAuth: true,
                }
               }}
               );
              console.log("store", store.getState().stateUser);
        // render(
        //     <Provider store={store}>
        //         <MemoryRouter initialIndex={0} initialEntries={pathPrivateList}>
        //           <HeaderMenuPrivate />
        //         </MemoryRouter>
        //       </Provider>
        //     );
        const header = screen.getByTestId("appbar-private");
        expect(header).not.toBeNull();
        // const headerTitle = screen.getByTestId("appbar-public");
        // expect(headerTitle.textContent).toEqual("Mobile");
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

