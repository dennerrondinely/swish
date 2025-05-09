declare function swish<T, R>(
  value: T,
  cases: {
    [K in string]: R;
    _: R;
  }
): R;

export default swish; 