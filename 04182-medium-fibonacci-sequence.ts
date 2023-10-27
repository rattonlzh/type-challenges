// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type cases = [
  Expect<Equal<Fibonacci<1>, 1>>,
  Expect<Equal<Fibonacci<2>, 1>>,
  Expect<Equal<Fibonacci<3>, 2>>,
  Expect<Equal<Fibonacci<8>, 21>>,
]


// ============= Your Code Here =============
type Fibonacci<T extends number, Index extends 1[] = [1], Prev extends 1[] = [], Cur extends 1[] = [1]> =
  Index['length'] extends T ? Cur['length'] : Fibonacci<T, [...Index, 1], Cur, [...Prev, ...Cur]>
