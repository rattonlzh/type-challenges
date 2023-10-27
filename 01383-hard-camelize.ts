// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type cases = [
  Expect<Equal<
    Camelize<{
      some_prop: string
      prop: { another_prop: string }
      array: [
        { snake_case: string },
        { another_element: { yet_another_prop: string } },
        { yet_another_element: string },
      ]
    }>,
    {
      someProp: string
      prop: { anotherProp: string }
      array: [
        { snakeCase: string },
        { anotherElement: { yetAnotherProp: string } },
        { yetAnotherElement: string },
      ]
    }
  >>,
]


// ============= Your Code Here =============
type Convert<T> = T extends `${infer L}_${infer M}${infer R}` ? `${L}${Uppercase<M>}${Convert<R>}` : T
type Camelize<T> = T extends any[] ? {
  [P in keyof T]: Camelize<T[P]>
} : keyof T extends never ? T : {
  [P in keyof T as Convert<P>]: Camelize<T[P]>
}
