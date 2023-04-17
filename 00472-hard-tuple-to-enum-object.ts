// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

const OperatingSystem = ['macOS', 'Windows', 'Linux'] as const
const Command = ['echo', 'grep', 'sed', 'awk', 'cut', 'uniq', 'head', 'tail', 'xargs', 'shift'] as const

type cases = [
  Expect<Equal<Enum<[]>, {}>>,
  Expect<Equal<
    Enum<typeof OperatingSystem>,
    {
      readonly MacOS: 'macOS'
      readonly Windows: 'Windows'
      readonly Linux: 'Linux'
    }
  >>,
  Expect<Equal<
    Enum<typeof OperatingSystem, true>,
    {
      readonly MacOS: 0
      readonly Windows: 1
      readonly Linux: 2
    }
  >>,
  Expect<Equal<
    Enum<typeof Command>,
    {
      readonly Echo: 'echo'
      readonly Grep: 'grep'
      readonly Sed: 'sed'
      readonly Awk: 'awk'
      readonly Cut: 'cut'
      readonly Uniq: 'uniq'
      readonly Head: 'head'
      readonly Tail: 'tail'
      readonly Xargs: 'xargs'
      readonly Shift: 'shift'
    }
  >>,
  Expect<Equal<
    Enum<typeof Command, true>,
    {
      readonly Echo: 0
      readonly Grep: 1
      readonly Sed: 2
      readonly Awk: 3
      readonly Cut: 4
      readonly Uniq: 5
      readonly Head: 6
      readonly Tail: 7
      readonly Xargs: 8
      readonly Shift: 9
    }
  >>,
]

type Helper<T extends readonly string[], Index extends readonly 1[] = []> = [...T] extends [infer F extends string, ...infer R extends readonly string[]] ? {
  readonly [P in F as Capitalize<P>]: Index['length']
} & Helper<R, [...Index, 1]> : unknown

type Merge<T> = T extends infer R ? {
  readonly [P in keyof R]: R[P]
} : never
// ============= Your Code Here =============
type Enum<T extends readonly string[], N extends boolean = false> = N extends true ? Merge<Helper<T>> : {
  readonly [P in T[number]as Capitalize<P>]: P
}

let a: Enum<typeof Command, true>
//  ^?
let b: Helper<readonly ["echo", "grep", "sed", "awk", "cut", "uniq", "head", "tail", "xargs", "shift"]>
//  ^?