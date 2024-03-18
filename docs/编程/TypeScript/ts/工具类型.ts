//类型转换
/**字符串转元组 */
type StringToTuple<S extends string, T extends string[] = []> = S extends `${infer L}${infer R}`
    ? StringToTuple<R, [...T, L]>
    : T;
/**元组转字符串 */
type TupleToString<T extends any[], S extends string = ''> = T extends [infer L, ...infer R]
    ? TupleToString<R, `${S}${L & string}`>
    : S;

//字符串
/**获取最后一个字符 */
type Last<S extends string> = S extends `${infer _}${infer R}` ? (R extends '' ? S : Last<R>) : S;
/**翻转字符串 */
type Reverse<S extends string, T extends string = ''> = S extends `${infer L}${infer R}`
    ? Reverse<R, `${L}${T}`>
    : T;
/**判断开头是否为某个字符串 */
type StartsWith<S extends string, T extends string> = S extends `${T}${infer _}` ? true : false;
/**判断末尾是否为某个字符串 */
type EndsWith<S extends string, T extends string> = StartsWith<Reverse<S>, Reverse<T>>;
/**字符串分割 */
type Split<
    S extends string,
    D extends string,
    T extends string[] = [],
> = S extends `${infer L}${D}${infer R}` ? Split<R, D, [...T, L]> : [...T, S];
