// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type cases = [
  Expect<Equal<TwoSum<[3, 3], 6>, true>>,
  Expect<Equal<TwoSum<[3, 2, 4], 6>, true>>,
  Expect<Equal<TwoSum<[2, 7, 11, 15], 15>, false>>,
  Expect<Equal<TwoSum<[2, 7, 11, 15], 9>, true>>,
  Expect<Equal<TwoSum<[1, 2, 3], 0>, false>>,
  Expect<Equal<TwoSum<[1, 2, 3], 1>, false>>,
  Expect<Equal<TwoSum<[1, 2, 3], 2>, false>>,
  Expect<Equal<TwoSum<[1, 2, 3], 3>, true>>,
  Expect<Equal<TwoSum<[1, 2, 3], 4>, true>>,
  Expect<Equal<TwoSum<[1, 2, 3], 5>, true>>,
  Expect<Equal<TwoSum<[1, 2, 3], 6>, false>>,
  Expect<Equal<TwoSum<[3, 2, 0], 2>, true>>,
]


// ============= Your Code Here =============
type GenTuple<T, Count extends any[] = []> = Count['length'] extends T ? Count : GenTuple<T, [...Count, 1]>
type AddUpTo<T, Union, Total> = Union extends any ? [...GenTuple<T>, ...GenTuple<Union>]['length'] extends Total ? true : false : never

type TwoSum<T extends number[], U extends number> = T extends [infer F, ...infer R extends number[]] ? true extends AddUpTo<F, R[number], U> ? true : TwoSum<R, U> : false

let a: AddUpTo<1, 2 | 3, 4> //[1, 2, 3], 4>
//  ^?