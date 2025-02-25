<div align="center">

# 📚 Docs
| npm : | [KO](./npm_KO.md) \| **EN** \| [JA](./npm_JA.md)|
|:--:|:--:|
| Creation guide: | [KO](./guide_KO.md) \| [EN](./guide_EN.md) \| [JA](./guide_JA.md) |

</div>

# 1. Create a Package

First, create a new package using the `npm init` command.

```shell
> npm init
```

You don't have to complete every setting right away. After the package is created, you can edit the package.json file directly to add any necessary settings! :)

## Using TypeScript

To incorporate TypeScript into your package, install TypeScript and the Node.js type definitions as development dependencies like so:

```shell
> npm install --save-dev typescript @types/node
```

# 2. Configuring package.json

The package.json file defines your package’s metadata and dependencies. Refer to the example below!

The `"build": "tsc"` script is added only when you are using TypeScript! :)

```json
{
  "name": "module-name",
  "version": "1.0.0",
  "description": "",
  "main": "lib/index.js",
  "files": ["lib"],
  "types": "lib/index.d.ts",
  "private": false,
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "build": "tsc"
  },
  "author": "pengoose",
  "license": "MIT",
  "devDependencies": {
    "@types/node": "^20.3.3",
    "typescript": "^5.1.6"
  }
}
```

---

## [tsconfig](https://yamoo9.gitbook.io/typescript/cli-env/tsconfig) Configuration (When Using TypeScript)

In a TypeScript project, you can set the compiler options via the tsconfig.json file! :)

```json
{
  "compilerOptions": {
    "target": "es5",
    "module": "commonjs",
    "outDir": "./lib",
    "rootDir": "./src",
    "strict": true,
    "esModuleInterop": true,
    "forceConsistentCasingInFileNames": true
  },
  "include": ["src/**/*"]
}
```

# 3. Writing Code

This is the stage to bring your ideas to life in code! :)
Don't be intimidated by the idea of creating a "library" or "module"!

Creating a module means making frequently used code reusable and publishing it so that it can be easily used in any project.

Examples of modules include:

- **Data Validation Library:** A collection of functions to validate that inputs meet specific criteria.
- **Common Algorithms:** Modules that include sorting, searching, or other algorithms.
- **API Request Wrapper:** Functions that simplify sending requests to a specific API.
- **UI Components:** Reusable UI components such as buttons, forms, and dialogs.

It's simpler and cooler than you might think! 🥳

# 4. Writing the README

Now it's time to document how to use your module! Writing a clear and friendly README helps others easily understand and use your amazing code.

A good README should include:

- **Module Description:** A brief explanation of what problem the module solves or what features it provides.
- **Installation and Usage:** Detailed instructions on how to install and use the module.
- **Example Code:** Sample code demonstrating how to use the module.
- **API Documentation:** Detailed documentation of the module's functions or methods, including their parameters and return values.

Good documentation not only makes your code user-friendly but also enhances your collaboration skills as a developer.

# 5. Build

If you are using TypeScript or Babel, you need to build your source code!

```shell
> npm run build
```

This command builds your project according to the tsconfig.json file and generates the built files in the lib folder at the project root.

# 6. Deployment 🚀

To deploy your npm module, you need to create an account on [npm](https://www.npmjs.com/)!

Once you've created an account, log in via the terminal with:

## npm Login

```shell
> npm login
```

![npm login image](https://i.imgur.com/YiTdDAc.png)

## Deploying the npm Package

After logging in, deploy your package using the npm publish command.

```shell
> npm publish
```

*Note:* The version field in package.json must be higher than the previously published version for deployment to succeed!
 
```json
{
  "version": "1.0.0" // Previously published version
}
```
 
```json
{
  "version": "1.0.1" // New version (even for documentation updates)
}
```

---

🎉 Congratulations! Your amazing package is now published on npm! 🥳  
Other developers can now install and use your package.

In the future, you'll receive feedback on your package and have opportunities to improve it further. :) (Exciting, isn’t it?)

For example, you might get user issues or feature requests via GitHub Issues, and even improve your code through Pull Requests (PRs) with the help of other developers.

Congratulations on your first package deployment, and best of luck on your continuous journey of learning and growth as a developer!

---

# Additional Tips

# Deploying with Yarn

Setting the `"private"` field in package.json to `false` allows the module to be installed via yarn!

```json
{
  "private": false
}
```

# Handling "@" in Module Names

If your module name includes an "@", running `npm publish` may cause npm to treat it as a private package, resulting in a payment error.  
To indicate that your repository is public, deploy it with the following command:

```shell
> npm publish --access=public
```

---

# Specifying TS Module

![](https://velog.velcdn.com/images/pengoose_dev/post/76a25c7d-a00e-4120-ba2f-8f1987897876/image.png)

Setting the `"types"` field in package.json to `"index.d.ts"` signals that your module supports TypeScript! :)

```json
{
  "types": "index.d.ts"
}
```

---

# Linking Your npm Repository

![](https://i.imgur.com/UlhhJWQ.png)

By configuring the `"repository"` field in package.json as shown below, you can link your repository.

```json
"repository": {
  "type": "git",
  "url": "repositoryURL"
}
```