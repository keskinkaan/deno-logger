/**
 * Utility type to extract values from a const object type
 * @template T - The const object type to extract values from
 * @description Gets union type of all possible values in a const object
 * @example
 * ```ts
 * const Colors = { RED: 'red', BLUE: 'blue' } as const;
 * type ColorValues = TOV<typeof Colors>; // 'red' | 'blue'
 * ```
 */
export type TOV<T> = T[keyof T];
