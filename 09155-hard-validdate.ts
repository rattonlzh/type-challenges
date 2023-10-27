// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type cases = [
  Expect<Equal<ValidDate<'0102'>, true>>,
  Expect<Equal<ValidDate<'0131'>, true>>,
  Expect<Equal<ValidDate<'1231'>, true>>,
  Expect<Equal<ValidDate<'0229'>, false>>,
  Expect<Equal<ValidDate<'0100'>, false>>,
  Expect<Equal<ValidDate<'0132'>, false>>,
  Expect<Equal<ValidDate<'1301'>, false>>,
  Expect<Equal<ValidDate<'0123'>, true>>,
  Expect<Equal<ValidDate<'01234'>, false>>,
  Expect<Equal<ValidDate<''>, false>>,
]


// ============= Your Code Here =============
type Seq<T, Index extends any[] = [], Res extends any[] = []> = Index['length'] extends T ? Res[number] : Seq<T, [...Index, 1], [...Res, [...Index, 1]['length']]>
type TwoBitStr<T extends number> = T extends any ? `${T}` extends `${infer F}${infer M}${infer R}` ? R extends '' ? `${T}` : never : `0${T}` : never
let c: TwoBitStr<Seq<29>>
//  ^?
type Months = TwoBitStr<Seq<12>>
type LeapMonth = '02'
type LongMonths = TwoBitStr<1 | 3 | 5 | 7 | 8 | 10 | 12>
type ShortMonths = TwoBitStr<4 | 6 | 9 | 11>;

type DayStrMap = {
  [P in Months]: P extends ShortMonths ? TwoBitStr<Seq<30>> : P extends LeapMonth ? TwoBitStr<Seq<28>> : P extends LongMonths ? TwoBitStr<Seq<31>> : never
}

type AllValid<T = {
  [P in Months]: {
    [Q in DayStrMap[P]]: true
  }
}, Prefix extends string = '', K extends string = keyof T & string> = T extends object ? K extends keyof T ? AllValid<T[K], `${Prefix}${K}`> : never : Prefix
type ValidDate<T extends string> = T extends AllValid ? true : false

let d: AllValid
//  ^?