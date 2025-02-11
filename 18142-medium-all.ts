// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type cases = [
  Expect<Equal<All<[1, 1, 1], 1>, true>>,
  Expect<Equal<All<[1, 1, 2], 1>, false>>,
  Expect<Equal<All<['1', '1', '1'], '1'>, true>>,
  Expect<Equal<All<['1', '1', '1'], 1>, false>>,
  Expect<Equal<All<[number, number, number], number>, true>>,
  Expect<Equal<All<[number, number, string], number>, false>>,
  Expect<Equal<All<[null, null, null], null>, true>>,
  Expect<Equal<All<[[1], [1], [1]], [1]>, true>>,
  Expect<Equal<All<[{}, {}, {}], {}>, true>>,
]


// ============= Your Code Here =============
type All<T extends readonly any[], S> = T extends [infer F, ...infer R] ?
  Equal<F, S> extends true ?
  All<R, S> extends true ?
  true
  : false
  : false
  : true
