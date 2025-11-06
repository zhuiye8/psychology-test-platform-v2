import { useEffect, useState } from 'react';

/**
 * useDebouncedValue - 防抖Hook
 *
 * 延迟更新值，减少频繁的状态更新和API调用
 *
 * @param value - 要防抖的值
 * @param delay - 延迟时间（毫秒），默认300ms
 * @returns 防抖后的值
 */
export function useDebouncedValue<T>(value: T, delay: number = 300): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    // 设置定时器，延迟更新值
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // 清理函数：如果值在delay时间内再次变化，清除之前的定时器
    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
}

export default useDebouncedValue;
