import { useEffect, useRef } from "react";

export function useDidUpdateEffect(fn: () => void, inputs: any[]) {
  const didMountRef = useRef(false);

  useEffect(() => {
    if (didMountRef.current) return fn();
    else didMountRef.current = true;
  }, inputs);
}
