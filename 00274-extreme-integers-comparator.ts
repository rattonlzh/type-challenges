// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type cases = [
  Expect<Equal<Comparator<5, 5>, Comparison.Equal>>,
  Expect<Equal<Comparator<5, 6>, Comparison.Lower>>,
  Expect<Equal<Comparator<5, 8>, Comparison.Lower>>,
  Expect<Equal<Comparator<5, 0>, Comparison.Greater>>,
  Expect<Equal<Comparator<-5, 0>, Comparison.Lower>>,
  Expect<Equal<Comparator<0, 0>, Comparison.Equal>>,
  Expect<Equal<Comparator<0, -5>, Comparison.Greater>>,
  Expect<Equal<Comparator<5, -3>, Comparison.Greater>>,
  Expect<Equal<Comparator<5, -7>, Comparison.Greater>>,
  Expect<Equal<Comparator<-5, -7>, Comparison.Greater>>,
  Expect<Equal<Comparator<-5, -3>, Comparison.Lower>>,
  Expect<Equal<Comparator<-25, -30>, Comparison.Greater>>,
  Expect<Equal<Comparator<15, -23>, Comparison.Greater>>,
  Expect<Equal<Comparator<40, 37>, Comparison.Greater>>,
  Expect<Equal<Comparator<-36, 36>, Comparison.Lower>>,
  Expect<Equal<Comparator<27, 27>, Comparison.Equal>>,
  Expect<Equal<Comparator<-38, -38>, Comparison.Equal>>,

  Expect<Equal<Comparator<1, 100>, Comparison.Lower>>,
  Expect<Equal<Comparator<100, 1>, Comparison.Greater>>,
  Expect<Equal<Comparator<-100, 1>, Comparison.Lower>>,
  Expect<Equal<Comparator<1, -100>, Comparison.Greater>>,
  Expect<Equal<Comparator<-100, -1>, Comparison.Lower>>,
  Expect<Equal<Comparator<-1, -100>, Comparison.Greater>>,

  // Extra tests if you like to challenge yourself!
  Expect<Equal<Comparator<9007199254740992, 9007199254740992>, Comparison.Equal>>,
  Expect<Equal<Comparator<-9007199254740992, -9007199254740992>, Comparison.Equal>>,
  Expect<Equal<Comparator<9007199254740991, 9007199254740992>, Comparison.Lower>>,
  Expect<Equal<Comparator<9007199254740992, 9007199254740991>, Comparison.Greater>>,
  Expect<Equal<Comparator<-9007199254740992, -9007199254740991>, Comparison.Lower>>,
  Expect<Equal<Comparator<-9007199254740991, -9007199254740992>, Comparison.Greater>>,
]


// ============= Your Code Here =============
enum Comparison {
  Greater,
  Equal,
  Lower,
}

type Comparator<A extends number, B extends number> = Convert<A> extends [infer ArrA extends DigitArr, infer signA]
  ? Convert<B> extends [infer ArrB extends DigitArr, infer signB]
  ? signA extends signB ? signA extends 0 ? Compare<ArrA, ArrB>
  : Compare<ArrB, ArrA>
  : signA extends 1
  ? Comparison.Lower
  : Comparison.Greater
  : never
  : never

type Digit = ['0', "1", "2", "3", "4", "5", "6", "7", "8", "9"]
type DigitArr = Digit[number][];
type CompareOne<A extends Digit[number], B extends Digit[number]> =
  A extends Before<B> ? Comparison.Lower : A extends B ? Comparison.Equal : Comparison.Greater
// ? B extends Before[number]
// ? Comparison.Greater
// : A extends B ? Comparison.Equal
// : Comparison.Lower
// : never
type Convert<T extends number> = `${T}` extends `-${infer N}` ? [Split<N>, 1] : [Split<`${T}`>, 0]
type Split<T extends string, Res extends string[] = []> = T extends `${infer F}${infer R}` ?
  Split<R, [...Res, F]>
  : Res

type Inverse<T extends Comparison> = Comparison.Greater extends T ? Comparison.Lower : Comparison.Lower extends T ? Comparison.Greater : Comparison.Equal

type Compare<A extends DigitArr, B extends DigitArr, Res = Comparison.Equal> =
  A extends [...infer RA extends DigitArr, infer BitA extends Digit[number]]
  ? B extends [...infer RB extends DigitArr, infer BitB extends Digit[number]]
  ? Compare<RA, RB, CompareOne<BitA, BitB> extends Comparison.Equal ? Res : CompareOne<BitA, BitB>>
  : Comparison.Greater
  : B extends []
  ? Res
  : Comparison.Lower


let test: Inverse<2>
//  ^?
let test2: Convert<6>
//  ^?
type Before<T extends Digit[number], Res extends any[] = [], Index extends any[] = []> =
  T extends `${[...Index]['length'] & number}`
  ? `${Res[number]}`
  : Before<T, [...Res, Index['length']], [...Index, 1]>

let test3: Before<'1'>
//  ^?
let test4: CompareOne<'5', '6'>
//  ^?

let test6: Comparator<9007199254740991, 9007199254740992>
  //  ^?
