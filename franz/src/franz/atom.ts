interface Atom<T = any> {
  key: Symbol;
  read: (get: Getter) => T;
  write?: (get: Getter, set: Setter, update: SetStateAction<T>) => void;
}

type Getter = <T>(atom: Atom<T>) => T;
type Setter = <T>(atom: Atom<T>, update: SetStateAction<T>) => void;
type SetStateAction<T> = T | ((prev: T) => T);

let keyCount = 0;

function atom<T>(read: (get: Getter) => T): Atom<T>;
function atom<T>(
  read: (get: Getter) => T,
  write: (get: Getter, set: Setter, update: SetStateAction<T>) => void
): Atom<T>;
function atom<T>(
  read: (get: Getter) => T,
  write?: (get: Getter, set: Setter, update: SetStateAction<T>) => void
): Atom<T> {
  return {
    key: Symbol(keyCount), // FIXME: 메모리 관점에서 안좋아보이는데 일단 심볼로 하고 추후에 수정
    read,
    write,
  };
}
