import { describe, it, expect, beforeEach, vi } from 'vitest';
import { useState, useEffect, useMemo } from './hooks'; // 请替换为实际模块路径

describe('响应式库测试', () => {
  beforeEach(() => {
    // 重置所有间谍和模拟函数
    vi.restoreAllMocks();
  });

  describe('useState', () => {
    it('初始化值正确', () => {
      const [getValue] = useState(42);
      expect(getValue()).toBe(42);
    });

    it('可以更新值', () => {
      const [getValue, setValue] = useState(42);
      setValue(100);
      expect(getValue()).toBe(100);
    });

    // it('值更新触发依赖更新', () => {
    //   const callback = vi.fn();
    //   const [getValue, setValue] = useState(42);

    //   useEffect(callback);
    //   setValue(100);

    //   expect(callback).toHaveBeenCalledTimes(2); // 初始调用 + 更新调用
    // });

    it('多个状态互不干扰', () => {
      const [getValue1, setValue1] = useState(1);
      const [getValue2, setValue2] = useState(2);

      setValue1(10);
      setValue2(20);

      expect(getValue1()).toBe(10);
      expect(getValue2()).toBe(20);
    });
  });

  describe('useEffect', () => {
    it('初始执行', () => {
      const callback = vi.fn();
      useEffect(callback);
      expect(callback).toHaveBeenCalledTimes(1);
    });

    it('依赖更新时执行', () => {
      const callback = vi.fn();
      const [getValue, setValue] = useState(1);

      useEffect(() => {
        callback(getValue());
      });
      setValue(2);

      expect(callback).toHaveBeenCalledTimes(2);
    });

    it('嵌套的 effect 正确执行', () => {
      const callback1 = vi.fn();
      const callback2 = vi.fn();

      useEffect(() => {
        callback1();
        useEffect(callback2);
      });

      expect(callback1).toHaveBeenCalledTimes(1);
      expect(callback2).toHaveBeenCalledTimes(1);
    });
  });

  describe('useMemo', () => {
    it('初始计算正确', () => {
      const callback = vi.fn(() => 42);
      const value = useMemo(callback);

      expect(callback).toHaveBeenCalledTimes(1);
      expect(value()).toBe(42);
    });

    it('依赖更新时重新计算', () => {
      const callback = vi.fn(() => 42);
      const [getValue, setValue] = useState(1);

      useMemo(() => {
        callback(getValue());
      });
      setValue(2);

      expect(callback).toHaveBeenCalledTimes(2);
    });

    it('缓存值在依赖未更新时不变', () => {
      let count = 0;
      const callback = vi.fn(() => count++);
      const value = useMemo(callback);

      expect(value()).toBe(0);
      expect(value()).toBe(0); // 没有依赖更新，应该使用缓存值
    });
  });
});
