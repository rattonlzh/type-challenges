// ============= Test Cases =============
import type { Debug, Equal, Expect, IsAny } from './test-utils'

class ClassA { }

VueBasicProps({
  props: {
    propA: {},
    propB: { type: String },
    propC: { type: Boolean },
    propD: { type: ClassA },
    propE: { type: [String, Number] },
    propF: RegExp,
  },
  data(this) {
    type PropsType = Debug<typeof this>
    //    ^?
    type cases = [
      Expect<IsAny<PropsType['propA']>>,
      Expect<Equal<PropsType['propB'], string>>,
      Expect<Equal<PropsType['propC'], boolean>>,
      Expect<Equal<PropsType['propD'], ClassA>>,
      Expect<Equal<PropsType['propE'], string | number>>,
      Expect<Equal<PropsType['propF'], RegExp>>,
    ]

    // @ts-expect-error
    this.firstname
    // @ts-expect-error
    this.getRandom()
    // @ts-expect-error
    this.data()

    return {
      firstname: 'Type',
      lastname: 'Challenges',
      amount: 10,
    }
  },
  computed: {
    fullname() {
      return `${this.firstname} ${this.lastname}`
    },
  },
  methods: {
    getRandom() {
      return Math.random()
    },
    hi() {
      alert(this.fullname.toLowerCase())
      alert(this.getRandom())
    },
    test() {
      const fullname = this.fullname
      const propE = this.propE
      type cases = [
        Expect<Equal<typeof fullname, string>>,
        Expect<Equal<typeof propE, string | number>>,
      ]
    },
  },
})


// ============= Your Code Here =============
declare function VueBasicProps<D, C, M, P>(options: VueOption<D, C, M, P>): any
type Computed<T> = T extends Record<string, (...args: any[]) => any> ? {
  [P in keyof T]: ReturnType<T[P]>
} : never

type VueOption<D, C, M, P> = {
  data(this: PropsType<P>): D
  methods: M
  computed: C
  props: P
} & ThisType<D & M & Computed<C> & PropsType<P>>

type PropsType<T> = {
  [P in keyof T]: {} extends T[P] ? any : T[P] extends { type: infer Type } ? Actual<Type> : Actual<T[P]>
}

type Actual<T> = T extends BooleanConstructor | NumberConstructor | StringConstructor ? ReturnType<T> : T extends any[] ? Actual<T[number]> : T extends abstract new (...args: any[]) => infer R ? R : never


// test
let a: Actual<StringConstructor>
//  ^?
let b: StringConstructor extends String ? 1 : 2
//  ^?
let c: String extends StringConstructor ? 1 : 2
//  ^?
let d: typeof String extends infer R ? R : never
//  ^?