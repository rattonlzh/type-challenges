// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type cases = [
  Expect<Equal<FirstUniqueCharIndex<'leetcode'>, 0>>,
  Expect<Equal<FirstUniqueCharIndex<'loveleetcode'>, 2>>,
  Expect<Equal<FirstUniqueCharIndex<'aabb'>, -1>>,
  Expect<Equal<FirstUniqueCharIndex<''>, -1>>,
]


// ============= Your Code Here =============
type FirstUniqueCharIndex<T extends string, Prefix extends string[] = []> = T extends `${infer F}${infer R}` ?
  R extends `${string}${F}${string}` ?
  FirstUniqueCharIndex<R, [...Prefix, F]>
  : F extends Prefix[number] ?
  FirstUniqueCharIndex<R, [...Prefix, F]>
  : Prefix['length']
  : -1
