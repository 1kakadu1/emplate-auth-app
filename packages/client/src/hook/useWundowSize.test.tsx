import { act, renderHook, fireEvent } from "@testing-library/react"

import { useWindowSize } from "./useWindowSize"

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
})