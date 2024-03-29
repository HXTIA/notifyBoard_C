/**
 * 提取枚举或对象的key
 * ```
 *  使用：type keys = DefinedEnumKeys<typeof TTaro>
 * ```
 */
export type DefinedEnumKeys<T> = { [K in keyof T]: T[K] extends string ? K : never }[keyof T];
