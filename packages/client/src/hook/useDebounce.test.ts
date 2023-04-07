import { renderHook } from '@testing-library/react';
import { useDebounce } from './useDebounce';

jest.useFakeTimers();

describe('useDebounce', () => {
    it('should debounce the function', async () => {
        const fn = jest.fn();
        const ms = 1000;
        const { result } = renderHook(() => useDebounce(fn, ms));
        result.current('test');
        expect(fn).not.toBeCalled();
        jest.advanceTimersByTime(ms);
        expect(fn).toBeCalledWith('test');
    });
});