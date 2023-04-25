// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type cases = [
  // Raw string -> encoded string
  Expect<Equal<RLE.Encode<'AAABCCXXXXXXY'>, '3AB2C6XY'>>,

  // Encoded string -> decoded string
  Expect<Equal<RLE.Decode<'3AB2C6XY'>, 'AAABCCXXXXXXY'>>,
]


// ============= Your Code Here =============
type Minified<T extends string, Count extends any[]> = `${Count['length'] extends 1 ? '' : Count['length']}${T}`
type Repeat<T extends string, C, Count extends any[] = [1]> = Count['length'] extends C ? T : `${T}${Repeat<T, C, [...Count, 1]>}`
namespace RLE {
  export type Encode<S extends string, Prefix extends string = '', Last extends string = '', Count extends any[] = [1]> =
    S extends `${infer F}${infer R}` ?
    F extends Last ?
    Encode<R, Prefix, F, [...Count, 1]>
    : '' extends Last ?
    Encode<R, Prefix, F, [1]>
    : Encode<R, `${Prefix}${Minified<Last, Count>}`, F, [1]>
    : `${Prefix}${Minified<Last, Count>}`
  export type Decode<S extends string> = S extends `${infer Count extends number}${infer Letter}${infer R}` ? `${Repeat<Letter, Count>}${Decode<R>}` : S extends `${infer F extends string}${infer R2}` ? `${F}${Decode<R2>}` : '';

}

let a: RLE.Encode<'AB'>
//  ^?
