// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'
import { ExpectFalse, NotEqual } from './test-utils'

type cases = [
  // string -> null
  Expect<Equal<UnionReplace<number | string, [[string, null]]>, number | null>>,

  // Date -> string; Function -> undefined
  Expect<Equal<UnionReplace<Function | Date | object, [[Date, string], [Function, undefined]]>, undefined | string | object>>,
]


// ============= Your Code Here =============
// type UnionReplace<T, U extends [any, any][]> = T extends any ?
//   U[number] extends [T, infer R] ? R : T : never
type UnionReplace<T, U extends [any, any][]> = U extends [infer F, ...infer R extends [any, any][]] ? F extends [T, infer Infer] ? Infer | UnionReplace<Exclude<T, F[0]>, R> : never : T

let a: UnionReplace<Function | Date | object, [[Date, string], [Function, undefined]]>
//  ^?

//  反客为主