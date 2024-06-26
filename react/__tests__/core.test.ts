// const a = {
//   A_TYPE: false,
//   B_TYPE: false,
// };
// const [tableValue, setTableValue] = useStrictState(a);

// setTableValue(a); // OK
// setTableValue((prev) => prev); // OK
// setTableValue((prev) => {
//   const res = { ...prev, A_TYPE: true };

//   return res;
// });

// setTableValue((prev) => {
//   const res = { ...prev, A_TYPE: 'true' };

//   return res;
// });
// setTableValue((prev) => ({ ...prev, shouldBeError: false })); // Error
// setTableValue((prev) => ({ ...prev, A_TYPE: true })); // Error(Partial을 사용하면 허용이 가능해보이나, strict의 의미가 깨지는 tradeOff 존재)
