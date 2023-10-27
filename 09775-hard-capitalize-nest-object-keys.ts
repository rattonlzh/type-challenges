// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'
import { ExpectFalse, NotEqual } from './test-utils'

type foo = {
  foo: string
  bars: [{ foo: string }]
}

type Foo = {
  Foo: string
  Bars: [{
    Foo: string
  }]
}

type cases = [
  Expect<Equal<Foo, CapitalizeNestObjectKeys<foo>>>,
]


// ============= Your Code Here =============
type CapitalizeNestObjectKeys<T> = T extends [] ? [] : T extends [infer F, ...infer R] ? [CapitalizeNestObjectKeys<F>, ...(CapitalizeNestObjectKeys<R> extends any[] ? CapitalizeNestObjectKeys<R> : [CapitalizeNestObjectKeys<R>])] : T extends object ? {
  [P in keyof T as (P extends string ? Capitalize<P> : P)]: CapitalizeNestObjectKeys<T[P]>
} : T

let a: CapitalizeNestObjectKeys<foo>
//  ^?