// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

const curried1 = Currying((a: string, b: number, c: boolean) => true)
const curried2 = Currying((a: string, b: number, c: boolean, d: boolean, e: boolean, f: string, g: boolean) => true)
const curried3 = Currying(() => true)

type cases = [
  Expect<Equal<
    typeof curried1, (a: string) => (b: number) => (c: boolean) => true
  >>,
  Expect<Equal<
    typeof curried2, (a: string) => (b: number) => (c: boolean) => (d: boolean) => (e: boolean) => (f: string) => (g: boolean) => true
  >>,
  Expect<Equal<typeof curried3, () => true>>,
]
//     ^?



// ============= Your Code Here =============
declare function Currying<T>(fn: T): Curried<T>

type Curried<T> = T extends (...args: infer A) => infer R ? A extends [infer F, ...infer O] ? O extends [] ? (arg: F) => R : (arg: F) => Curried<(...args: O) => R> : T : T
//   ^?