import { describe, it, expect } from 'vitest';
import { lineLineIntersection } from './lineLineIntersection';
import { T_Line } from '../types';

describe('lineLineIntersection', () => {
  it('should return the correct intersection point and doesIntersect as true for intersecting lines', () => {
    const line1: T_Line = [
      [0, 0],
      [10, 10],
    ];
    const line2: T_Line = [
      [0, 10],
      [10, 0],
    ];
    const result = lineLineIntersection(line1, line2);
    expect(result).toEqual({ pt: [5, 5], doesIntersect: true });
  });

  it('should return the correct intersection point and doesIntersect as false for non-intersecting lines', () => {
    const line1: T_Line = [
      [0, 0],
      [5, 5],
    ];
    const line2: T_Line = [
      [6, 7],
      [6, 10],
    ];
    const result = lineLineIntersection(line1, line2);
    expect(result).toEqual({ pt: [6, 6], doesIntersect: false });
  });

  it.skip('should return the correct intersection point and doesIntersect as false for parallel lines', () => {
    const line1: T_Line = [
      [0, 0],
      [5, 5],
    ];
    const line2: T_Line = [
      [0, 1],
      [5, 6],
    ];
    const result = lineLineIntersection(line1, line2);
    expect(result.doesIntersect).toBe(false);
  });

  it.skip('should return the correct intersection point and doesIntersect as true for overlapping lines', () => {
    const line1: T_Line = [
      [0, 0],
      [10, 10],
    ];
    const line2: T_Line = [
      [5, 5],
      [15, 15],
    ];
    const result = lineLineIntersection(line1, line2);
    expect(result).toEqual({ pt: [5, 5], doesIntersect: true });
  });
});
