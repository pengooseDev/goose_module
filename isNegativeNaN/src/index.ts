export function isNegativeNaN(val: number) {
  if (!Number.isNaN(val)) return false;
  const f64 = new Float64Array(1);
  f64[0] = val;
  const u32 = new Uint32Array(f64.buffer);
  const isNegative = u32[1] >>> 31 === 1;

  return isNegative;
}
