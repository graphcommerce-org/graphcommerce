/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable max-classes-per-file */
// Based on apollo-link-defer, but upgraded for @apollo/client 3

import { ApolloLink, FetchResult, NextLink, Observable, Operation, toPromise } from '@apollo/client'

export type DeferredLinkFn = () => Promise<ApolloLink>
export type FutureLink = Promise<ApolloLink> | Observable<ApolloLink> | DeferredLinkFn
export type LinkResolver = (resolveLink: FutureLink) => ApolloLink

/**
 * Waits for the link resolver to complete before it starts passing requests to the underlying link
 */
export const deferLink: LinkResolver = (resolveLink: FutureLink) => {
  let linkFn: DeferredLinkFn
  let lazy = false
  if (isObservable(resolveLink)) {
    linkFn = () => toPromise(resolveLink)
  } else if (isNullaryFunction(resolveLink)) {
    linkFn = resolveLink
    lazy = true
  } else {
    linkFn = () => resolveLink
  }

  return new DeferLink(linkFn, lazy)
}

class DeferLink extends ApolloLink {
  private resolvedLink?: ApolloLink

  private promise?: Promise<ApolloLink>

  constructor(private deferredLink: DeferredLinkFn, private lazy: boolean) {
    super()

    // Allow this to resolve at some point in the future.
    if (!this.lazy) {
      this.promise = this.executeDeferredLink()
    }
  }

  public request(operation: Operation, forward: NextLink): Observable<FetchResult> | null {
    const { resolvedLink, promise } = this
    // If the real link exists then transparently forward the request to it.
    if (resolvedLink) return resolvedLink.request(operation, forward)
    // Handle if the link was lazily executed
    if (!promise) this.promise = this.executeDeferredLink()

    return new Observable((observer) => {
      const handle: SingleUseSubscription = new SingleUseSubscription()
      if (this.promise)
        this.promise
          .then((fulfilled) => {
            const subscription = fulfilled.request(operation, forward)?.subscribe(observer)
            if (subscription) handle.set(subscription)
          })
          .catch((error) => observer.error(error))

      // Allows the subscription to be cancelled appropriately
      return () => handle && handle.unsubscribe()
    })
  }

  private async executeDeferredLink(): Promise<ApolloLink> {
    const link = await this.deferredLink()
    this.resolvedLink = link
    return link
  }
}

/**
 * Simple helper method for determining if the input is a Observable
 * @param {any | Observable<T>} value
 */
export function isObservable<T>(value: any | Observable<T>): value is Observable<T> {
  return value && typeof value.subscribe === 'function' && typeof value.then !== 'function'
}

export function isSubscription(
  value: ZenObservable.Subscription | any,
): value is ZenObservable.Subscription {
  return value && typeof value.unsubscribe === 'function'
}

// eslint-disable-next-line @typescript-eslint/ban-types
function isNullaryFunction(value: any): value is Function {
  return value && typeof value === 'function'
}

export class SingleUseSubscription implements ZenObservable.Subscription {
  public closed = false

  private underlying?: ZenObservable.Subscription

  public unsubscribe(): void {
    const { closed, underlying } = this
    if (!closed) {
      if (underlying) underlying.unsubscribe()
      this.closed = true
    }
  }

  public set(subscription: ZenObservable.Subscription | (() => void)): void {
    const { underlying, closed } = this

    let newSubscription: ZenObservable.Subscription | undefined
    if (isSubscription(subscription)) {
      newSubscription = subscription
    } else {
      newSubscription = { unsubscribe: subscription } as ZenObservable.Subscription
    }

    if (underlying) underlying.unsubscribe()

    if (closed) {
      newSubscription.unsubscribe()
      newSubscription = undefined
    }

    this.underlying = newSubscription
  }
}
