// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type cases = [
  Expect<Equal<BEM<'btn', ['price'], []>, 'btn__price'>>,
  Expect<Equal<BEM<'btn', ['price'], ['warning', 'success']>, 'btn__price--warning' | 'btn__price--success'>>,
  Expect<Equal<BEM<'btn', [], ['small', 'medium', 'large']>, 'btn--small' | 'btn--medium' | 'btn--large'>>,
]


// ============= Your Code Here =============
type Helper<T extends any[], U extends string> = T extends [] ? '' : `${U}${T[number]}`
type BEM<B extends string, E extends string[], M extends string[]> = `${B}${Helper<E, '__'>}${Helper<M, '--'>}`