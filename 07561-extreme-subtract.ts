// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type cases = [
  Expect<Equal<Subtract<1, 1>, 0>>,
  Expect<Equal<Subtract<2, 1>, 1>>,
  Expect<Equal<Subtract<1, 2>, never>>,
  // @ts-expect-error
  Expect<Equal<Subtract<1000, 999>, 1>>,
]


// ============= Your Code Here =============
// M => minuend, S => subtrahend
type Repeat<T extends number, Res extends any[] = []> = Res['length'] extends T ? Res : Repeat<T, [...Res, 1]>
type Subtract<M extends number, S extends number> = Repeat<S> extends [...Repeat<M>, any, ...infer Unused] ? never : Repeat<M> extends [...Repeat<S>, ...infer R] ? R['length'] : never 
