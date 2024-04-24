class Store {
  private states = new WeakMap<Atom, any>();
  private listeners = new WeakMap<Atom, Set<() => void>>();

  public read<T>(atom: Atom<T>): T {
    if (!this.states.has(atom)) {
      const value = atom.read(this.read.bind(this));
      this.states.set(atom, value);
    }

    return this.states.get(atom);
  }

  public write<T>(atom: Atom<T>, update: SetStateAction<T>): void {
    if (!atom.write) {
      throw new Error('This atom is read-only');
    }
    const newValue = atom.write(
      this.read.bind(this),
      this.write.bind(this),
      update
    );

    this.states.set(atom, newValue);
    this.listeners.get(atom)?.forEach((listener) => listener());
  }

  public subscribe(atom: Atom, listener: () => void): () => void {
    const currentListeners = this.listeners.get(atom) || new Set();
    currentListeners.add(listener);
    this.listeners.set(atom, currentListeners);

    return () => {
      currentListeners.delete(listener);

      if (currentListeners.size === 0) this.listeners.delete(atom);
    };
  }
}
