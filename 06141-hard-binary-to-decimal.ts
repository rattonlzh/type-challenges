// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type cases = [
  Expect<Equal<BinaryToDecimal<'10'>, 2>>,
  Expect<Equal<BinaryToDecimal<'0011'>, 3>>,
  Expect<Equal<BinaryToDecimal<'00000000'>, 0>>,
  Expect<Equal<BinaryToDecimal<'11111111'>, 255>>,
  Expect<Equal<BinaryToDecimal<'10101010'>, 170>>,
]


// ============= Your Code Here =============
type BinaryToArr<S extends string, Res extends 1[] = []> = S extends `${infer L}${infer R}` ? L extends '0' ? BinaryToArr<R, [...Res, ...Res]> : L extends '1' ? BinaryToArr<R, [...Res, ...Res, 1]> : never : Res
type BinaryToDecimal<S extends string> = BinaryToArr<S>['length']
let a: BinaryToDecimal<'1011'>
//  ^?