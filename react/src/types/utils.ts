export type Diff<Expect, Sample> = Sample extends Expect
  ? Expect extends Sample
    ? Sample
    : never
  : never;
