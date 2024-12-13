export type T_Point = [number, number];
export type T_Line = [T_Point, T_Point];
export type T_Rectangle = [T_Point, T_Point];
export type T_Path = T_Point[];

export interface I_Circle {
  x: number;
  y: number;
  r: number;
}

export type T_UNITS = 'mm' | 'cm' | 'm' | 'pc' | 'pt' | 'in' | 'ft' | 'px';

export interface I_SketchProps {
  context: CanvasRenderingContext2D | null;
  glContext: WebGLRenderingContext | null;
  canvas: HTMLCanvasElement;
}

export interface I_Sketch {
  (props: I_SketchProps): I_SketchRender;
}

export interface I_SketchRender {
  (props: { frame: number; time: number }): unknown;
}

interface I_BaseSettings {
  dimensions: [number, number];
  context: string;
  animation?: boolean;
}

interface I_AnimationSettings extends I_BaseSettings {
  animation: true;
  frames?: number;
  time?: number;
}

interface I_NonAnimationSettings extends I_BaseSettings {
  animation?: false; // Default is false, making it optional
  frames?: never;
  time?: never;
}

export type T_Settings = I_AnimationSettings | I_NonAnimationSettings;
