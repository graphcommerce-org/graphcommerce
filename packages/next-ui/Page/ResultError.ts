import { GetStaticPropsResult } from 'next'

export default class ResultError<P = never> extends Error {
  public result: GetStaticPropsResult<P>

  constructor(result: GetStaticPropsResult<P>) {
    super()
    this.result = result
  }
}
