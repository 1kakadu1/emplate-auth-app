import { act, renderHook, fireEvent } from "@testing-library/react"

import { useWindowSize, WindowBreakpoints } from "./useWindowSize"

const customGlobal = global as any

describe("hooks/useWindowSize", () => {
  customGlobal.innerWidth = 500
  customGlobal.innerHeight = 800

  it("reads initial innerWidth and innerHeight values from window", () => {
    const { result } = renderHook(() => useWindowSize())

    expect(result.current.width).toBe(500)
    expect(result.current.height).toBe(800)
  })

  it("updates innerWidth and innerHeight values when window resizes", () => {
    const { result } = renderHook(() => useWindowSize())

    expect(result.current.width).toBe(500)
    expect(result.current.height).toBe(800)

    act(() => {
      customGlobal.innerWidth = 1000
      customGlobal.innerHeight = 1000
    })
    fireEvent(customGlobal, new Event("resize"));


    expect(result.current.width).toBe(1000)
    expect(result.current.height).toBe(1000)
  })

  it("updates innerWidth and innerHeight values when window resized and get breakpoints", () => {
    const { result } = renderHook(() => useWindowSize())

    act(() => {
      customGlobal.innerWidth = WindowBreakpoints.xs
    })
    fireEvent(customGlobal, new Event("resize"));
    expect(result.current.breakpoint).toBe(WindowBreakpoints.xs)

    act(() => {
      customGlobal.innerWidth = WindowBreakpoints.sm
    })
    fireEvent(customGlobal, new Event("resize"));
    expect(result.current.breakpoint).toBe(WindowBreakpoints.sm)

    act(() => {
      customGlobal.innerWidth = WindowBreakpoints.md
    })
    fireEvent(customGlobal, new Event("resize"));
    expect(result.current.breakpoint).toBe(WindowBreakpoints.md);

    act(() => {
      customGlobal.innerWidth = WindowBreakpoints.lg
    })
    fireEvent(customGlobal, new Event("resize"));
    expect(result.current.breakpoint).toBe(WindowBreakpoints.lg);

    act(() => {
      customGlobal.innerWidth = WindowBreakpoints.xl
    })
    fireEvent(customGlobal, new Event("resize"));
    expect(result.current.breakpoint).toBe(WindowBreakpoints.xl);

    act(() => {
      customGlobal.innerWidth = WindowBreakpoints.xxl
    })
    fireEvent(customGlobal, new Event("resize"));
    expect(result.current.breakpoint).toBe(WindowBreakpoints.xxl)

    act(() => {
      customGlobal.innerWidth = WindowBreakpoints.custom
    })
    fireEvent(customGlobal, new Event("resize"));
    expect(result.current.breakpoint).toBe(WindowBreakpoints.custom)

  })
})