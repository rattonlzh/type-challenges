// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type cases = [
  Expect<Equal<Maximum<[]>, never>>,
  Expect<Equal<Maximum<[0, 2, 1]>, 2>>,
  Expect<Equal<Maximum<[1, 20, 200, 150]>, 200>>,
]


// ============= Your Code Here =============
type Maximum<T extends any[], Index extends 1[] = [], Value = T[number]> =
  [Value] extends [Index['length']] ? Value : Maximum<T, [...Index, 1], Value extends Index['length'] ? never : Value>  
