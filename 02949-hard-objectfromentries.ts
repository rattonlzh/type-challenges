// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

interface Model {
  name: string
  age: number
  locations: string[] | null
}

type ModelEntries = ['name', string] | ['age', number] | ['locations', string[] | null]

type cases = [
  Expect<Equal<ObjectFromEntries<ModelEntries>, Model>>,
]


// ============= Your Code Here =============
type Merge<T> = {
  [P in keyof T]: T[P]
}
type ObjectFromEntries<T> = Merge<(T extends [string, any] ? (x: { [P in T[0]]: T[1] }) => any : never) extends (x: infer R) => any ? R : never>

let a: ObjectFromEntries<ModelEntries>
//  ^?