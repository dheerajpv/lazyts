# Get started with node

This skeleton includes a `src` directory and an `index.ts` file inside it.

## setup

If you haven't already, run `npx lazyts setup` to quickly get to a place where you can run TypeScript files.
Run `ts-node src/index.ts` to get started with development.

## package.json

No modifications to `package.json` are REQUIRED for node, but you can add some npm scripts like these

```json
{
    "scripts": {
        "build": "tsc",
        "start": "ts-node src/index.ts",
        "dev": "nodemon src/index.ts"
    }
}
```

to have a greater degree of convienience while developing your programs.

Good luck and have fun writing TypeScript.
