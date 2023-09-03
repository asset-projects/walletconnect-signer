import {COLORS} from '../commons';

export type valueOf<T> = T[keyof T];

export type Color = valueOf<typeof COLORS>;
