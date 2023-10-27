// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type cases = [
  Expect<Equal<FlattenDepth<[]>, []>>,
  Expect<Equal<FlattenDepth<[1, 2, 3, 4]>, [1, 2, 3, 4]>>,
  Expect<Equal<FlattenDepth<[1, [2]]>, [1, 2]>>,
  Expect<Equal<FlattenDepth<[1, 2, [3, 4], [[[5]]]], 2>, [1, 2, 3, 4, [5]]>>,
  Expect<Equal<FlattenDepth<[1, 2, [3, 4], [[[5]]]]>, [1, 2, 3, 4, [[5]]]>>,
  Expect<Equal<FlattenDepth<[1, [2, [3, [4, [5]]]]], 3>, [1, 2, 3, 4, [5]]>>,
  Expect<Equal<FlattenDepth<[1, [2, [3, [4, [5]]]]], 19260817>, [1, 2, 3, 4, 5]>>,
]


// ============= Your Code Here =============
// type FlattenDepth<T extends readonly any[], Count extends number = 1, Times extends 1[] = []> = Count extends Times['length'] ?
//   T : FlattenDepth<FlattenOnce<T>, Count, [...Times, 1]>

type FlattenOnce<T> = T extends [infer F, ...infer R] ? [...F extends any[] ? F : [F], ...FlattenOnce<R>] : T
type FlattenDepth<T, Times extends number = 1, Index extends any[] = []> = Index['length'] extends Times ? T : T extends FlattenOnce<T> ? T : FlattenDepth<FlattenOnce<T>, Times, [...Index, any]> 