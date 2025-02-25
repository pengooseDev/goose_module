<div align="center">

# 📚 Docs
| npm : | [KO](./npm_KO.md) \| [EN](./npm_EN.md) \| [JA](./npm_JA.md)|
|:--:|:--:|
| Creation guide: | [KO](./guide_KO.md) \| **EN** \| [JA](./guide_JA.md) |

</div>

# Module Development Guide

Does the thought of starting module development feel overwhelming? 😨  
Or do you want to grow by exploring new perspectives?  
If so, check out the following documents during your development process! 🥳

# 1. Adopting an Idea

When you hear "module development," do you suddenly feel you must create something extraordinary or experience some kind of apprehension?

In fact, we have already developed countless modules!  
By using exports to make components, constants, types, interfaces, functions, and objects reusable, we've essentially been creating modules all along :)

We simply add a "deployment" step to make them easily usable in any project—so don’t be intimidated!

`Below are some tips for generating ideas and examples of modules!`

## Tip
### **[@toss/utils](https://slash.page/ko/libraries/common/utils/src/Numbers_floorAndFormatNumber.i18n)**
A variety of convenience libraries provided by Toss!
### [@pengoose/pinterest](https://www.npmjs.com/package/@pengoose/pinterest)
An image search module that utilizes the Pinterest API!

- Custom hooks, utility code, and the various examples described below can all become excellent modules.
- Look at the technologies or APIs you already use, and think about how you can further enhance them and solve problems.
- Consider the recurring issues you encounter during development! For instance, the redux-thunk module maintains 4 to 5 million downloads each week.

<br/>
<br/>

# 2. Writing the Specification

Once your idea is finalized, it's time to concretize it. Writing a specification that clearly defines your project's goals and the features to be implemented will help you develop efficiently and effectively. :)

<br/>
<br/>
``` 
- [ ] The Pinterest object should have `id` and `boardIds`.
- [ ] `getBoards()` should return all boards.
- [ ] `getAllPins()` should return an array containing the pin data from all boards.
  - [ ] It should accept a `shuffle` option to randomize the order of images.
```
<br/>

> The above is an example specification for the `@pengoose/pinterest` module! If you're writing a specification for the first time, it’s recommended to start simply and refine it as you implement features! :)

<br/>
<br/>

# 3. Implementation
```ts
import { Pin, Boards } from './pinterest.type';
import { shuffle as shufflePins } from './utils';

interface PinterestProps {
  id: string;
  boardIds: string[];
}

export class Pinterest {
  private id: string;
  private boardIds: string[];

  constructor({ id, boardIds }: PinterestProps) {
    this.id = id;
    this.boardIds = boardIds;
  }

  public async getBoards(): Promise<Boards> {
    const requests = this.boardIds.map((boardId) => this.getBoard({ id: this.id, boardId }));
    const result = await Promise.allSettled(requests);

    return this.boardIds.reduce((acc, boardId, index) => {
      const res = result[index];
      if (res.status === 'fulfilled') {
        acc[boardId] = res.value.pins;
      }
      return acc;
    }, {} as Boards);
  }

  public async getAllPins({ shuffle }: { shuffle?: boolean } = {}): Promise<Pin[]> {
    const boards = await this.getBoards();
    const pins = Object.values(boards).flat();

    if (shuffle) {
      return shufflePins(pins);
    }

    return pins;
  }
  // ...codes
```
<br/>
<br/>

# 4. Minimizing Dependencies

Minimizing dependency modules during module development is one of the important factors! The reasons are as follows:

1. **Increased Maintenance Difficulty**  
   As the number of dependencies increases, it becomes harder to keep up with updates and manage versions of those libraries or packages. If version issues arise in sub-packages during updates, additional refactoring may be required!

2. **Increased Potential for Security Issues**  
   You may have experienced receiving warning emails from GitHub when a particular library encounters a security vulnerability. 😨 Since each dependency carries potential security risks, the more dependencies you have, the higher the likelihood of security issues!

3. **Increased Bundle Size**  
   More dependencies lead to a larger bundle size, which can slow down the initial loading of web applications or hinder build speeds!

4. **Inefficient Tree Shaking**  
   Modern build tools remove unused code from dependency modules. However, if a dependency isn’t optimized for tree shaking, unnecessary code may be included in the bundle, adversely affecting its size!

5. **Compatibility**  
   Modules with minimal dependencies can be easily applied across various development environments and projects.
