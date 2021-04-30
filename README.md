# lazyts

TS project initialization for lazy people.

**This package is still in developement. Usage beyond testing is not advised.**

## Usage

```
npx lazyts <subcommand> [args] [options]
```

### Subcommands

| name | arguments                | description                                               |
| ---- | ------------------------ | --------------------------------------------------------- |
| init | &lt;name&gt; [framework] | Creates a project in the given framework. Default: 'node' |

_Note:_ arguments in &lt;carets&gt; are required and ones in [brackets] are optional.

More commands will come soon!

### Options

| short | long      | description                                             |
| ----- | --------- | ------------------------------------------------------- |
| -V    | --version | Prints the program version and exits                    |
| -h    | --help    | Prints help text (less stylized version of this README) |
| -l    | --list    | Lists all the [supported frameworks](#Frameworks)       |

## Frameworks

Each supported framework has its own directory in [frameworks](https://github.com/dheerajpv/lazyts/blob/main/frameworks).

Currently the supported frameworks are:

-   node (default)

### Adding Frameworks

Anyone looking to add a framework to this utility should submit a PR against `main` Adding the following:

-   directory with name for framework
-   basic skeleton files to begin development on a project
    -   DO NOT include `package.json`.
        -   If needed, add a section in `README.md` to tell the user what modifications must be made for proper usage.
        -   The default `package.json` will be whatever the user has configured for `npm init -y`.
    -   DO include a `README.md` to tell the user how to quickly get started on their project.
        -   For reference, look at the `node` framework's README.
    -   DO include a `tsconfig.json`.
        -   Make sure to keep it appropriate for the framework at hand.
