// ============= Test Cases =============
import type { Equal, Expect, UnionToIntersection } from './test-utils'

type Obj = {
  a: number
  b: string
  c: boolean
  obj: {
    d: number
    e: string
    f: boolean
    obj2: {
      g: number
      h: string
      i: boolean
    }
  }
  obj3: {
    j: number
    k: string
    l: boolean
  }
}

type cases = [
  Expect<Equal<DeepPick<Obj, ''>, unknown>>,
  Expect<Equal<DeepPick<Obj, 'a'>, { a: number }>>,
  Expect<Equal<DeepPick<Obj, 'a' | ''>, { a: number } & unknown>>,
  Expect<Equal<DeepPick<Obj, 'a' | 'obj.e'>, { a: number } & { obj: { e: string } }>>,
  Expect<Equal<DeepPick<Obj, 'a' | 'obj.e' | 'obj.obj2.i'>, { a: number } & { obj: { e: string } } & { obj: { obj2: { i: boolean } } }>>,
]


// ============= Your Code Here =============

type DeepPick<Obj extends object, Path> = UnionToIntersection<Path extends `${infer F extends (keyof Obj) & string}.${infer R}` ? {
  [P in F]: Obj[P] extends object ? DeepPick<Obj[P], R> : Obj[P]
} : Path extends keyof Obj ? { [P in Path]: Obj[P] } : never>

let a: Equal<UnionToIntersection<never>, never>
//  ^?

type Test<T> = T extends any ? ((a: T) => any) : never
type Test2<T> = (T extends any ? ((a: T) => any) : never) extends ((a: infer I) => any) ? I : never
type Test3 = never extends any ? ((a: never) => any) : never
type Test4 = (never extends any ? ((a: never) => any) : never) extends ((a: infer I) => any) ? I : never
type Test5 = never extends ((a: infer I) => any) ? I : never
let test: Test<never>
//  ^?
let test2: Test2<never>
//  ^?
let test3: Test3
//  ^?
let test4: Test4
//  ^?
let test5: Test5
//  ^?