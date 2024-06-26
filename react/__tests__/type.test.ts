// const a = { a: 1, b: 2 };
// const b = { a: 1, b: 3 };
// const c = { a: 1, b: 2, c: 3 };
// const d = { a: 1 };
// const e = { a: '1', b: 2 };
// type test = Diff<typeof a, typeof b>;
// /**
//  * 올바르게 추론
//  * type test = {
//  *   a: number;
//  *   b: number;
//  * }
//  */
// type test2 = Diff<typeof a, typeof c>; // never
// type test3 = Diff<typeof a, typeof d>; // never
// type test4 = Diff<typeof a, typeof e>; // never
