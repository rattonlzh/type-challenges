// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type cases = [
  Expect<Equal<Sum<2, 3>, '5'>>,
  Expect<Equal<Sum<'13', '21'>, '34'>>,
  Expect<Equal<Sum<'328', 7>, '335'>>,
  Expect<Equal<Sum<1_000_000_000_000n, '123'>, '1000000000123'>>,
  Expect<Equal<Sum<9999, 1>, '10000'>>,
  Expect<Equal<Sum<4325234, '39532'>, '4364766'>>,
  Expect<Equal<Sum<728, 0>, '728'>>,
  Expect<Equal<Sum<'0', 213>, '213'>>,
  Expect<Equal<Sum<0, '0'>, '0'>>,
]


// ============= Your Code Here =============
type Sum<A extends string | number | bigint, B extends string | number | bigint> = Join<ArrSum<Convert<A>, Convert<B>>>

type Repeat<T extends string, Res extends any[] = []> = T extends `${Res['length']}` ? Res : Repeat<T, [...Res, 1]>
type Digit = "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9"
type SimpleSum<A extends Digit, B extends Digit, Carry extends Digit = '0', Tmp = [...Repeat<A>, ...Repeat<B>, ...Repeat<Carry>]['length']> = Tmp extends number ? `${Tmp}` extends `1${infer R}${infer _}` ? [R, '1'] : [`${Tmp}`, '0'] : never

type Convert<T extends string | number | bigint, Res extends Digit[] = []> = `${T}` extends `${infer F extends Digit}${infer R}` ? Convert<R, [...Res, F]> : Res
type Join<T extends any[]> = T extends [infer F extends string, ...infer R extends string[]] ? `${F}${Join<R>}` : ''
type ArrSum<A extends Digit[], B extends Digit[], Carry extends Digit = '0', Res extends any[] = []> =
  A extends [...infer FA extends Digit[], infer LA extends Digit]
  ? B extends [...infer FB extends Digit[], infer LB extends Digit]
  ? ArrSum<FA, FB, SimpleSum<LA, LB, Carry>[1], [SimpleSum<LA, LB, Carry>[0], ...Res]>
  : ArrSum<FA, B, SimpleSum<LA, '0', Carry>[1], [SimpleSum<LA, '0', Carry>[0], ...Res]>
  : Carry extends '1' ? ['1', ...B, ...Res] : [...B, ...Res]
let a: SimpleSum<'2', '3', '0'>
//  ^?
let b: Repeat<'10'>
//  ^?
let c: Convert<328>
//  ^?
let d: Join<['1', '2']>
//  ^?
let e: ArrSum<['3', '2'], ['3']>
//  ^?
let f: Sum<328, 7>
//  ^?