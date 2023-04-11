// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type cases = [
  Expect<Equal<MinusOne<1>, 0>>,
  Expect<Equal<MinusOne<55>, 54>>,
  Expect<Equal<MinusOne<3>, 2>>,
  Expect<Equal<MinusOne<100>, 99>>,
  Expect<Equal<MinusOne<1101>, 1100>>,
  Expect<Equal<MinusOne<0>, -1>>,
  Expect<Equal<MinusOne<9_007_199_254_740_992>, 9_007_199_254_740_991>>,
]

type Reverse<S> = S extends `${infer F}${infer R}` ? `${Reverse<R>}${F}` : ''
type MinusOp = {
  0: [9, 1],
  9: [8, 0],
  8: [7, 0],
  7: [6, 0],
  6: [5, 0],
  5: [4, 0],
  4: [3, 0],
  3: [2, 0],
  2: [1, 0],
  1: [0, 0],
}

type MinusHelper<S> = S extends `${infer F extends keyof MinusOp}${infer R}` ?
  MinusOp[F] extends [infer Res extends number, 0] ?
  `${Res}${R}`
  : MinusOp[F] extends [infer Res extends number, 1] ?
  `${Res}${MinusHelper<R>}`
  : ''
  : ''

type TrimLeadingZero<S> = S extends `0${infer R}` ? TrimLeadingZero<R> : S extends '' ? '0' : S;
// ============= Your Code Here =============
type MinusOne<T extends number> = T extends 0 ? -1 :
  TrimLeadingZero<Reverse<MinusHelper<Reverse<`${T}`>>>> extends `${infer R extends number}` ? R : never

let a: Reverse<MinusHelper<Reverse<`100`>>>
