type PathImpl<T, Key extends keyof T> =
  Key extends string
  ? T[Key] extends (infer U)[]
    ? `${Key}[${0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10}]`
    : T[Key] extends Record<string, unknown>
      ? | `${Key}.${PathImpl<T[Key], Exclude<keyof T[Key], keyof unknown[]>> & string}`
        | `${Key}.${Exclude<keyof T[Key], keyof unknown[]> & string}`
      : never
  : never;

type PathImpl2<T> = PathImpl<T, keyof T> | keyof T;

type Path<T> = PathImpl2<T> extends string | keyof T ? PathImpl2<T> : keyof T;

type PathValue<T, P extends Path<T>> =
  P extends `${infer Key}.${infer Rest}`
  ? Key extends keyof T
    ? Rest extends Path<T[Key]>
      ? PathValue<T[Key], Rest>
      : never
    : never
  : P extends keyof T
    ? T[P]
    : never;


type PathValueMap<T, P extends Path<T>> =
  P extends `${infer Key}.${infer Rest}`
  ? Key extends keyof T
    ? Rest extends Path<T[Key]>
      ? PathValue<T[Key], Rest>
      : never
    : never
  : P extends keyof T
    ? { name: P, required: T[P] }
    : never;


export type {Path, PathValue, PathValueMap}

