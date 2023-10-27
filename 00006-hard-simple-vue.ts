// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

let a = SimpleVue({
  data() {
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
      alert(this.amount)
      alert(this.fullname.toLowerCase())
      alert(this.getRandom())
    },
    test() {
      const fullname = this.fullname
      const cases: [Expect<Equal<typeof fullname, string>>] = [] as any
    },
  },
})




// ============= Your Code Here =============
declare function SimpleVue<T, C, M>(options: VueOption<T, C, M>): any

type Computed<T> = T extends Record<string, (...args: any[]) => any> ? {
  [P in keyof T]: ReturnType<T[P]>
} : never

type VueOption<D, C, M> = {
  data(this: never): D
  methods: M
  computed: C
} & ThisType<D & M & Computed<C>>