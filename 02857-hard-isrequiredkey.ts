// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type cases = [
  Expect<Equal<IsRequiredKey<{ a: number; b?: string }, 'a'>, true>>,
  Expect<Equal<IsRequiredKey<{ a: number; b?: string }, 'b'>, false>>,
  Expect<Equal<IsRequiredKey<{ a: number; b?: string }, 'b' | 'a'>, false>>,
]


// ============= Your Code Here =============
type IsRequiredKey<T, K extends keyof T> = ({
  [P in K]-?: (arg: [T[P]] extends [Required<T>[P]] ? true : false) => any
}[K]) extends (args: infer R) => any ? [R] extends [never] ? false : R : never

let a: IsRequiredKey<{ a: number; b?: string }, 'a' | 'b'>
//  ^?
let b: true & false extends true ? true : false
let c: true | false extends never ? 1 : 2
//  ^?