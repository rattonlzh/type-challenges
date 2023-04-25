// ============= Test Cases =============
import type { Equal, Expect, ExpectExtends } from './test-utils'

const ref = {
  count: 1,
  person: {
    name: 'cattchen',
    age: 22,
    books: ['book1', 'book2'],
    pets: [
      {
        type: 'cat',
      },
    ],
  },
}

type cases = [
  Expect<Equal<ObjectKeyPaths<{ name: string; age: number }>, 'name' | 'age'>>,
  Expect<
    Equal<
      ObjectKeyPaths<{
        refCount: number
        person: { name: string; age: number }
      }>,
      'refCount' | 'person' | 'person.name' | 'person.age'
    >
  >,
  Expect<ExpectExtends<ObjectKeyPaths<typeof ref>, 'count'>>,
  Expect<ExpectExtends<ObjectKeyPaths<typeof ref>, 'person'>>,
  Expect<ExpectExtends<ObjectKeyPaths<typeof ref>, 'person.name'>>,
  Expect<ExpectExtends<ObjectKeyPaths<typeof ref>, 'person.age'>>,
  Expect<ExpectExtends<ObjectKeyPaths<typeof ref>, 'person.books'>>,
  Expect<ExpectExtends<ObjectKeyPaths<typeof ref>, 'person.pets'>>,
  Expect<ExpectExtends<ObjectKeyPaths<typeof ref>, 'person.books.0'>>,
  Expect<ExpectExtends<ObjectKeyPaths<typeof ref>, 'person.books.1'>>,
  Expect<ExpectExtends<ObjectKeyPaths<typeof ref>, 'person.books[0]'>>,
  Expect<ExpectExtends<ObjectKeyPaths<typeof ref>, 'person.books.[0]'>>,
  Expect<ExpectExtends<ObjectKeyPaths<typeof ref>, 'person.pets.0.type'>>,
  Expect<Equal<ExpectExtends<ObjectKeyPaths<typeof ref>, 'notExist'>, false>>,
  Expect<Equal<ExpectExtends<ObjectKeyPaths<typeof ref>, 'person.notExist'>, false>>,
  Expect<Equal<ExpectExtends<ObjectKeyPaths<typeof ref>, 'person.name.'>, false>>,
  Expect<Equal<ExpectExtends<ObjectKeyPaths<typeof ref>, '.person.name'>, false>>,
  Expect<Equal<ExpectExtends<ObjectKeyPaths<typeof ref>, 'person.pets.[0]type'>, false>>,
]


// ============= Your Code Here =============
type Append<Prefix extends string, K extends string | number> = [Prefix] extends [never] ? `${K}` : K extends string ? `${Prefix}.${K}` : K extends number ? `${Prefix}.${K}` | `${Prefix}[${K}]` | `${Prefix}.[${K}]` : never;
type ObjectKeyPaths<T extends object, Prefix extends string = never, K = keyof T> = Prefix | (K extends (string | number) & keyof T
  ? T[K] extends object
  ? ObjectKeyPaths<T[K], Append<Prefix, K>>
  : Append<Prefix, K>
  : never)

// type ObjectKeyPaths<T extends object, Prefix extends string = never, K extends keyof T = keyof T> = T[K] extends 
let a: ObjectKeyPaths<typeof ref>
//  ^?

let b: ObjectKeyPaths<{
  //^?
  refCount: number
  person: { name: string; age: number }
}>