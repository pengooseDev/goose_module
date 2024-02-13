# @pengoose/jotai

<div align="center">

<h3>A simple and powerful state manager for React using Jotai.</h2>

  <picture width="250">
    <source media="(prefers-color-scheme: dark)" srcset="https://github.com/pengooseDev/goose_module/assets/73521518/b6e173a5-14fe-46fa-b5b8-9cdae09f3958" width="250">
    <source media="(prefers-color-scheme: light)" srcset="https://github.com/pengooseDev/goose_module/assets/73521518/78f1f5f5-dee5-4e8b-b066-3986534818fa" width="250">
    <img alt="IMAGE" src="http://LIGHT_IMAGE_URL.png">
  </picture>
  <h6> * by coalowl </h6>
</div>

## Installation

Install the package using npm:

```sh
npm install @pengoose/jotai
```

Or using yarn:

```sh
yarn add @pengoose/jotai
```

## Usage

To manage your state with @pengoose/jotai, define your state interfaces and extend the `AtomManager` class to create a custom state manager.

### Example Data

```ts
// example/types.ts
export interface Music {
  id: string;
  title: string;
  thumbnail: string;
  url: string;
}

export interface PlaylistStatus {
  playlist: Music[];
  index: number;
}
```

## Example of a `Playlist` state manager:

### AtomManager

```ts
import { atom } from 'jotai';
import { AtomManager } from '@pengoose/jotai';
import { PlaylistStatus, Music } from '@/types';

// Extend AtomManager to create your state manager
export class Playlist extends AtomManager<PlaylistStatus> {
  // Implement selectors and actions
  public selectors = {
    playlist: atom((get) => {
      const { playlist } = get(this.atom);

      return playlist;
    }),

    index: atom((get) => {
      const { index } = get(this.atom);

      return index;
    }),

    currentMusic: atom((get) => {
      const { playlist, index } = get(this.atom);

      return playlist[index];
    }),
  };

  public actions = {
    add: atom(null, (get, set, music: Music) => {
      const { playlist } = get(this.atom);

      if (playlist.some(({ id }) => id === music.id)) return;

      set(this.atom, (prev: PlaylistStatus) => ({
        ...prev,
        playlist: [...prev.playlist, music],
      }));
    }),

    next: atom(null, (get, set) => {
      const { playlist, index } = get(this.atom);

      const isEmpty = this.isEmpty(playlist);

      if (isEmpty) return;

      const isLastMusic = index === playlist.length - 1;

      set(this.atom, (prev: PlaylistStatus) => ({
        ...prev,
        index: isLastMusic ? 0 : prev.index + 1,
      }));
    }),
  };

  // Implement encapsulated helper methods :)
  private isEmpty(playlist: Music[]) {
    return playlist.length === 0;
  }

  private isFirstMusic(index: number) {
    return index === 0;
  }
}

// Create an instance of the state manager
const initialState: PlaylistStatus = {
  playlist: [],
  index: 0,
};

export const playlistManager = new Playlist(initialState);
```

### AtomManager with AtomManagerStatic

```ts
import { atom } from 'jotai';
import { AtomManager, AtomManagerStatic } from '@pengoose/jotai';
import { Music } from '@/types';

// When using AtomManagerStatic you should sync the selectors with the Generic type
export interface PlaylistStatus {
  playlist: Music[];
  index: number;
  currentMusic: Music;
}

// When using AtomManagerStatic, you must define the initial state as a static property
export const Playlist: AtomManagerStatic<PlaylistStatus> = class Playlist extends AtomManager<PlaylistStatus> {
  static INITIAL_STATE: PlaylistStatus = {
    playlist: [],
    index: 0,
  };

  // Implement selectors and actions
  public selectors = {
    // ...
  };

  public actions = {
    // ...
  };
};

// Create an instance of the state manager
export const playlistManager = new Playlist(Playlist.INITIAL_STATE);
```

---

## Best Practices

The `AtomManager` class is designed to be used with custom hooks to encapsulate the state management logic and make it easier to use in your components.

> Flow: Class(AtomManager) --> custom hook --> Component(View)

### Custom Hook

```tsx
// usePlaylist.ts
import { useAtomValue, useSetAtom } from 'jotai';
import { playlistManager } from '@/viewModel';

export const usePlaylist = () => {
  const {
    selectors: { playlist, currentMusic },
    actions: { play, next, prev, add, remove },
  } = playlistManager;

  return {
    // Getters(Selectors)
    playlist: useAtomValue(playlist),
    currentMusic: useAtomValue(currentMusic),

    // Setters(Actions)
    play: useSetAtom(play),
    next: useSetAtom(next),
    prev: useSetAtom(prev),
    add: useSetAtom(add),
    remove: useSetAtom(remove),
  };
};
```

```tsx
// Playlist.tsx
import { usePlaylist } from '@/hooks';
import { Music } from '@/types';

export const Playlist = () => {
  const { playlist, currentMusic, play, next, prev, add, remove } =
    usePlaylist();

  return (
    <div>
      <h1>Playlist</h1>
      <ul>
        {playlist?.map((music) => {
          const { id, title, thumbnail } = music;

          return (
            <li key={id}>
              <img src={thumbnail} alt={title} />
              <p>{title}</p>
              <button onClick={() => remove(music)}>Remove</button>
            </li>
          );
        })}
      </ul>
      <button onClick={() => add(currentMusic)}>Add to Playlist</button>
      <button onClick={() => play(currentMusic)}>Play</button>
      <button onClick={prev}>Prev</button>
      <button onClick={next}>Next</button>
    </div>
  );
};
```

<div align="center">
  😗👍
</div>

---

## Introducing StrictAtomManager for Enhanced State Management

For projects requiring a more disciplined approach to state management, `StrictAtomManager` offers a stricter and more structured way to manage your application's state using Jotai. Unlike `AtomManager`, which provides flexibility in defining selectors and actions, `StrictAtomManager` enforces the implementation of selectors for every property and actions for every possible mutation of the state type `T`. This ensures comprehensive coverage and encourages a meticulous management strategy that aligns well with object-oriented programming principles.

### Why Use StrictAtomManager?

- **Full Coverage**: Ensures that every aspect of your state is intentionally managed and accessed through defined selectors and actions.
- **Disciplined State Management**: Encourages a more structured approach to defining and mutating state, making your codebase cleaner and more maintainable.
- **Consistency**: By enforcing a strict pattern, it helps maintain consistency across your project's state management practices.

Incorporating `StrictAtomManager` into your project promotes a rigorous state management framework, perfect for complex applications where state integrity is paramount. To adopt a stricter discipline in your state management, consider using `StrictAtomManager` for a robust and structured approach.

## Contributing

Contributions are welcome! For major changes, please open an issue first to discuss what you would like to change. ;)
