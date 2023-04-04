import { USER_MOCK } from "../../../tests/mocks/user.mock";
import { initState } from "../../slice";
import { USER_KEY } from "./user.const";
import { userSelector, toUserSelector } from "./user.selector";

describe('user selector', () => {
	it('user selecor get all', () => {
		const selector = userSelector(initState);
		expect(selector.isAuth).toEqual(false);
	});

	it('user selecor toUserSelector init', () => {
		const selector = userSelector(initState);
		const isAuth = toUserSelector.isAuth.resultFunc(selector);
		const error = toUserSelector.error.resultFunc(selector);
		const isLoading = toUserSelector.isLoading.resultFunc(selector);
		const user = toUserSelector.user.resultFunc(selector);

		expect(isAuth).toEqual(false);
		expect(error).toEqual(undefined);
		expect(isLoading).toEqual(false);
		expect(user).toBeUndefined();
	});

	it('user selecor toUserSelector error', () => {
		const selector = userSelector({ ...initState, [USER_KEY]: { ...initState.stateUser, error: "not found 404" } });
		const error = toUserSelector.error.resultFunc(selector);
		expect(error).toBe("not found 404");
	});

	it('user selecor toUserSelector user', () => {
		const selector = userSelector({ ...initState, [USER_KEY]: { ...initState.stateUser, user: USER_MOCK } });
		const user = toUserSelector.user.resultFunc(selector);
		expect(user).toEqual(USER_MOCK);
	});
});
