import readline from 'readline';

interface Props {
  readLine: {
    query: string;
    callback: (answer: string) => void;
  };
}

export class Console {
  constructor() {}

  static readLine(
    query: Props['readLine']['query'],
    callback: Props['readLine']['callback']
  ) {
    if (arguments.length !== 2) {
      throw new Error('arguments must be 2.');
    }

    if (typeof query !== 'string') {
      throw new Error('query must be string');
    }

    if (typeof callback !== 'function') {
      throw new Error('callback must be function');
    }

    if (callback.length !== 1) {
      throw new Error('callback must have 1 argument');
    }

    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    rl.question(query, callback);
  }

  static readLineAsync(query: string) {
    return new Promise((resolve, reject) => {
      if (arguments.length !== 1) {
        reject(new Error('arguments must be 1'));
      }

      if (typeof query !== 'string') {
        reject(new Error('query must be string'));
      }

      const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
      });

      rl.question(query, (input) => {
        rl.close();
        resolve(input);
      });
    });
  }

  static print(message: string) {
    console.log(message);
  }
}
