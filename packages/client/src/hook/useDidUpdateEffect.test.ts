import { act, renderHook } from "@testing-library/react"
import { useDidUpdateEffect } from "./useDidUpdateEffect"

const mockCallback = jest.fn(() => { });

describe("hooks/useDidUpdateEffect", () => {

	it("reads initial innerWidth and innerHeight values from window", () => {
		let props = "one";
		const { rerender, result } = renderHook(() => useDidUpdateEffect(mockCallback, [props]));
		expect(mockCallback).toHaveBeenCalledTimes(0);
		expect(result.current).toBeUndefined();
		act(() => {
			props = "two";
		});
		rerender();

		expect(mockCallback).toHaveBeenCalledTimes(1);
	})

})