import { createFeatureSelector } from "../../../utils/store.utils";
import { initState } from "../../slice";
import { initialStateUser } from "../user/user.const";
import { IUserState } from "../user/user.model";
import { USERS_KEY } from "./users.const";
//https://rangle.io/blog/unit-testing-react-redux-selectors-and-epics
describe('User selector', () => {
        it('create feature selector', () => {
                const selector = createFeatureSelector<IUserState>(USERS_KEY)(initState);
				console.log("aaaaa",selector);
                expect(selector).not.toBeNull();
        });

        // it('create base selector', () => {
        //         const selector = createFeatureSelector<{ counter: {count: number} }>("base")("count");
        //         expect(selector).not.toBeNull();
        // });
});
