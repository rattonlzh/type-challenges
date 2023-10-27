// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type Arr = [1, 2, 3, 4, 5]

type cases = [
  // basic
  Expect<Equal<Slice<Arr, 0, 1>, [1]>>,
  Expect<Equal<Slice<Arr, 0, 0>, []>>,
  Expect<Equal<Slice<Arr, 2, 4>, [3, 4]>>,

  // optional args
  Expect<Equal<Slice<[]>, []>>,
  Expect<Equal<Slice<Arr>, Arr>>,
  Expect<Equal<Slice<Arr, 0>, Arr>>,
  Expect<Equal<Slice<Arr, 2>, [3, 4, 5]>>,

  // negative index
  Expect<Equal<Slice<Arr, 0, -1>, [1, 2, 3, 4]>>,
  Expect<Equal<Slice<Arr, -3, -1>, [3, 4]>>,

  // invalid
  Expect<Equal<Slice<Arr, 10>, []>>,
  Expect<Equal<Slice<Arr, 1, 0>, []>>,
  Expect<Equal<Slice<Arr, 10, 20>, []>>,
]



// ============= Your Code Here =============
type Slice<Arr extends any[], Start = 0, End = Arr['length'], HasStarted = false,
  Index extends any[] = [], Res extends any[] = [],
  FormatStart = Format<Arr['length'], Start>, FormatEnd = Format<Arr['length'], End>> =
  IsValid<Arr['length'], FormatStart, FormatEnd> extends false ? [] :
  FormatEnd extends Index['length'] ? Res
  : HasStarted extends true ? Slice<Arr, Start, End, HasStarted, [...Index, 1], [...Res, Arr[Index['length']]]>
  : Slice<Arr, Start, End, FormatStart extends Index['length'] ? true : false, [...Index, 1], FormatStart extends Index['length'] ? [...Res, Arr[Index['length']]] : Res>
type Format<Total, T> = T extends number ? `${T}` extends `-${infer N extends number}` ? Substract<Total, N> : T : never
type Seq<N, Res extends any[] = []> = Res['length'] extends N ? Res : Seq<N, [...Res, 1]>;
type Substract<Total, N> = Seq<Total> extends [...Seq<N>, ...infer R] ? R['length'] : never
type IsValid<Total, Start, End> = GreaterThan<End, Total> extends true ? false : GreaterThan<End, Start>
type GreaterThan<A, B> = Seq<A> extends [...Seq<B>, any, ...infer Rest] ? true : false;