import { describe, it, expect } from 'vitest';
import { interpolateLine } from './interpolateLine';
import { T_Line, T_Point } from '../types';

describe('interpolateLine', () => {
  it('should return the midpoint of the line segment when t is 0.5 (default)', () => {
    const line: T_Line = [
      [0, 0],
      [10, 10],
    ];
    const result: T_Point = interpolateLine(line);
    expect(result).toEqual([5, 5]);
  });

  it('should return the starting point of the line segment when t is 0', () => {
    const line: T_Line = [
      [0, 0],
      [10, 10],
    ];
    const result: T_Point = interpolateLine(line, 0);
    expect(result).toEqual([0, 0]);
  });

  it('should return the ending point of the line segment when t is 1', () => {
    const line: T_Line = [
      [0, 0],
      [10, 10],
    ];
    const result: T_Point = interpolateLine(line, 1);
    expect(result).toEqual([10, 10]);
  });

  it('should return the correct point for an arbitrary t value (e.g., t = 0.25)', () => {
    const line: T_Line = [
      [0, 0],
      [10, 10],
    ];
    const result: T_Point = interpolateLine(line, 0.25);
    expect(result).toEqual([2.5, 2.5]);
  });

  it('should handle negative coordinates correctly', () => {
    const line: T_Line = [
      [-10, -10],
      [10, 10],
    ];
    const result: T_Point = interpolateLine(line, 0.5);
    expect(result).toEqual([0, 0]);
  });

  it('should handle horizontal lines correctly', () => {
    const line: T_Line = [
      [0, 5],
      [10, 5],
    ];
    const result: T_Point = interpolateLine(line, 0.5);
    expect(result).toEqual([5, 5]);
  });

  it('should handle vertical lines correctly', () => {
    const line: T_Line = [
      [5, 0],
      [5, 10],
    ];
    const result: T_Point = interpolateLine(line, 0.5);
    expect(result).toEqual([5, 5]);
  });

  it('should handle t values greater than 1 (extrapolation)', () => {
    const line: T_Line = [
      [0, 0],
      [10, 10],
    ];
    const result: T_Point = interpolateLine(line, 1.5);
    expect(result).toEqual([15, 15]);
  });

  it('should handle t values less than 0 (extrapolation)', () => {
    const line: T_Line = [
      [0, 0],
      [10, 10],
    ];
    const result: T_Point = interpolateLine(line, -0.5);
    expect(result).toEqual([-5, -5]);
  });
});
