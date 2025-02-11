// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type cases = [
  Expect<Equal<GreaterThan<1, 0>, true>>,
  Expect<Equal<GreaterThan<5, 4>, true>>,
  Expect<Equal<GreaterThan<4, 5>, false>>,
  Expect<Equal<GreaterThan<0, 0>, false>>,
  Expect<Equal<GreaterThan<20, 20>, false>>,
  Expect<Equal<GreaterThan<10, 100>, false>>,
  Expect<Equal<GreaterThan<111, 11>, true>>,
]


// ============= Your Code Here =============
type newArr<T extends number, A extends any[] = []> =
  A['length'] extends T
  ? A
  : newArr<T, [...A, '']>
type GreaterArr<T extends any[], U extends any[]> = U extends [...T, ...any] ? false : true
type GreaterThan<T extends number, U extends number> = GreaterArr<newArr<T>, newArr<U>>