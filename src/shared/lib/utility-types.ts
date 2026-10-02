export type NotNull<T> = {
  [K in keyof T]: NonNullable<T[K]>;
};
