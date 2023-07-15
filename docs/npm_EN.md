# 1. Package Creation

First, create a new package using the npm init command.

```shell
> npm init
```

You don't need to complete all the settings now. After creating the package, you can modify the package.json file to add the necessary settings! :)

### Using Typescript

To apply Typescript to the package, install Typescript and Node.js type definitions as development dependencies like below!

```
> npm install --save-dev typescript @types/node
```

# 2. Setting package.json

The package.json file defines the package's information and dependencies. Refer to the example below!

The option "build": "tsc" should be added to your package.json only if you're using TypeScript! :)

```json
{
  "name": "module-name",
  "version": "1.0.0",
  "description": "",
  "main": "libs/index.js",
  "files": ["lib"],
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "build": "tsc"
  },
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "@types/node": "^20.3.3",
    "typescript": "^5.1.6"
  }
}
```

## Adding @ to npm module names

When you try to publish a module with "@" in its name, npm considers it a scoped package and treats it as a private package, resulting in an error. To indicate that it's a public package, you can use the following command:

> npm publish --access=public

## Specifying TypeScript Modules

![Alt text](https://velog.velcdn.com/images/pengoose_dev/post/76a25c7d-a00e-4120-ba2f-8f1987897876/image.png)

If you've used TypeScript modules, you may have come across the TS badge shown above! If you want to add a similar badge, you can do so by adding the "types" field to your package.json file as follows:

```json
"types": "index.d.ts",
```

---

### tsconfig Setup (When Using Typescript)

In a Typescript project, you can set compiler options through the tsconfig.json file. :)

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

This is the phase of implementing your idea into code! :)
Don't be too scared to create a "library" or a "module"!

Creating a module means making frequently used code reusable, and deploying it so that anyone can easily use it in any project.

Custom hooks you often use, utility codes, and various examples like below can all become wonderful modules!

Data validation library: A collection of functions that verify whether input meets specific conditions
Frequently used algorithms: A module containing algorithms like sorting, searching, etc.
API request wrapper: A function that wraps certain API requests for easy sending
UI components: Reusable UI components like buttons, forms, dialogs, etc.
It's simpler and cooler than you thought, isn't it? 🥳

# 4. Add readme

Now it's time to document how to use your module! It's important to write clearly and kindly so others can easily understand and use your awesome code.

The readme file should include the following:

Module description: Briefly explain what problem this module solves or what functionality it provides. This allows users to easily understand the module's role!
Installation and usage: Detailed explanation on how to install and use this module!
Example code: Showing example code on how to actually use this module can be a huge help for users to understand. :)
API documentation: Document the functions or methods provided by the module, as well as their arguments and return values in detail!
Practicing good documentation helps decide how user-friendly your code is, and also greatly helps to improve your "collaboration skills" as a developer. Don't be too scared and give it a try! :)

# 5. Build

If you're using Typescript or Babel, you need to go through the compilation process (build) and build your source code!

```shell
> npm run build
```

This command will create the built files in the lib folder in your project root, according to the tsconfig.json you wrote above.

# 6. Deployment 🚀

To distribute npm modules, you need to create an account at [npm](https://www.npmjs.com/)!

Once you've created your account, log in by typing the npm login command in the terminal :)

### npm login

```shell
> npm login
```

![npm login image](https://i.imgur.com/YiTdDAc.png)

### npm package distribution

Once you're logged in, you can distribute the package using the npm publish command.

```shell
> npm publish
```

---

🎉 Congratulations! Your awesome package has been published on npm! 🥳
Now other developers can install and use your package.

Now you'll start receiving feedback about your amazing package and start improving it based on that feedback. :) (Isn't it exciting?)

For example, you can listen to users' problems and receive feature requests in the issue tab on GitHub!
Also, you can grow your code into something more awesome with the help of other developers through Pull Requests (PRs).

Congratulations on your first package deployment, and always rooting for you on your path to becoming a constantly learning and growing developer! :)

It was an honor to be part of your first deployment process! 🥰
