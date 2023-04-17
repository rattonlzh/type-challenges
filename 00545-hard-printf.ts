// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type cases = [
  Expect<Equal<Format<'abc'>, string>>,
  Expect<Equal<Format<'a%sbc'>, (s1: string) => string>>,
  Expect<Equal<Format<'a%dbc'>, (d1: number) => string>>,
  Expect<Equal<Format<'a%%dbc'>, string>>,
  Expect<Equal<Format<'a%%%dbc'>, (d1: number) => string>>,
  Expect<Equal<Format<'a%dbc%s'>, (d1: number) => (s1: string) => string>>,
]

type ControlsMap = {
  d: number
  '%': never
  s: string
}
// ============= Your Code Here =============
type Format<T extends string> = T extends `${string}%${infer K extends keyof ControlsMap}${infer R}` ?
  ControlsMap[K] extends never ? Format<R> : (arg: ControlsMap[K]) => Format<R>
  : string
