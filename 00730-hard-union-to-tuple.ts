// ============= Test Cases =============
import type { Equal, Expect, UnionToIntersection } from './test-utils'

type ExtractValuesOfTuple<T extends any[]> = T[keyof T & number]

type cases = [
  Expect<Equal<UnionToTuple<'a' | 'b'>['length'], 2>>,
  Expect<Equal<ExtractValuesOfTuple<UnionToTuple<'a' | 'b'>>, 'a' | 'b'>>,
  Expect<Equal<ExtractValuesOfTuple<UnionToTuple<'a'>>, 'a'>>,
  Expect<Equal<ExtractValuesOfTuple<UnionToTuple<any>>, any>>,
  Expect<Equal<ExtractValuesOfTuple<UnionToTuple<undefined | void | 1>>, void | 1>>,
  Expect<Equal<ExtractValuesOfTuple<UnionToTuple<any | 1>>, any | 1>>,
  Expect<Equal<ExtractValuesOfTuple<UnionToTuple<any | 1>>, any>>,
  Expect<Equal<ExtractValuesOfTuple<UnionToTuple<'d' | 'f' | 1 | never>>, 'f' | 'd' | 1>>,
  Expect<Equal<ExtractValuesOfTuple<UnionToTuple<[{ a: 1 }] | 1>>, [{ a: 1 }] | 1>>,
  Expect<Equal<ExtractValuesOfTuple<UnionToTuple<never>>, never>>,
  Expect<Equal<ExtractValuesOfTuple<UnionToTuple<'a' | 'b' | 'c' | 1 | 2 | 'd' | 'e' | 'f' | 'g'>>, 'f' | 'e' | 1 | 2 | 'g' | 'c' | 'd' | 'a' | 'b'>>,
]


// ============= Your Code Here =============
type GetLastFromUnion<T> = UnionToIntersection<(T extends any ? ((a: T) => void) : never)> extends ((a: infer I) => void) ? I : never
type UnionToTuple<T> = [T] extends [never] ? [] : [...UnionToTuple<Exclude<T, GetLastFromUnion<T>>>, GetLastFromUnion<T>]
let a: ((a: string) => string) & ((a: number) => boolean) extends (a: infer I) => infer R ? [I, R] : never
//  ^?
// 函数的相交类型相当于函数重载，最后起作用的是最后一个类型 fn1 & fn2 & fn3 = fn3

let b: never extends any ? 1 : 2
//  ^?

let c: never extends any ? ((a: never) => void) : never;
//  ^?
type Test<T> = T extends any ? ((a: T) => void) : never;
type Test3<T> = T extends any ? 1 : 2;
let e: Test<never>
//  ^?
let f: Test3<never>
//  ^?
let d: Equal<(a: never) => void, never>
//  ^?