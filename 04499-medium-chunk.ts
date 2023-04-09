// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type cases = [
  Expect<Equal<Chunk<[], 1>, []>>,
  Expect<Equal<Chunk<[1, 2, 3], 1>, [[1], [2], [3]]>>,
  Expect<Equal<Chunk<[1, 2, 3], 2>, [[1, 2], [3]]>>,
  Expect<Equal<Chunk<[1, 2, 3, 4], 2>, [[1, 2], [3, 4]]>>,
  Expect<Equal<Chunk<[1, 2, 3, 4], 5>, [[1, 2, 3, 4]]>>,
  Expect<Equal<Chunk<[1, true, 2, false], 2>, [[1, true], [2, false]]>>,
]


// ============= Your Code Here =============
type Chunk<T extends readonly any[], A extends number, C extends readonly any[] = [], Res extends readonly any[] = []> =
  C['length'] extends A ?
  Chunk<T, A, [], [...Res, C]>
  : T extends [infer F, ...infer R] ?
  Chunk<R, A, [...C, F], Res>
  : C extends [] ? Res : [...Res, C]

let a: Chunk<[1, 2, 3], 2>