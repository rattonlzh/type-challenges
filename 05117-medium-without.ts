// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type cases = [
  Expect<Equal<Without<[1, 2], 1>, [2]>>,
  Expect<Equal<Without<[1, 2, 4, 1, 5], [1, 2]>, [4, 5]>>,
  Expect<Equal<Without<[2, 3, 2, 3, 2, 3, 2, 3], [2, 3]>, []>>,
]


// ============= Your Code Here =============
type toUnion<T> = T extends readonly any[] ? T[number] : T
type Without<T extends readonly any[], U> = T extends [infer F, ...infer R] ?
  F extends toUnion<U> ?
  Without<R, U>
  : [F, ...Without<R, U>]
  : []
