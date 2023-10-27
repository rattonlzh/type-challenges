// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type cases = [
  Expect<Equal<IsPalindrome<'abc'>, false>>,
  Expect<Equal<IsPalindrome<'b'>, true>>,
  Expect<Equal<IsPalindrome<'abca'>, false>>,
  Expect<Equal<IsPalindrome<'abcba'>, true>>,
  Expect<Equal<IsPalindrome<121>, true>>,
  Expect<Equal<IsPalindrome<19260817>, false>>,
]


// ============= Your Code Here =============
type IsPalindrome<T extends string | number, S = `${T}`> = S extends `${infer F}${infer R}` ? R extends '' ? true :
  R extends `${infer O}${F}` ? IsPalindrome<O> : false : true
let a: IsPalindrome<121>
//  ^?