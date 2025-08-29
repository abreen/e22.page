## Setup

You need Node and NPM. See the `package.json` file's `engines` property for the required versions.

```
npm install
npm run dev     # start local web server for development
npm run build   # build the whole site into dist/
```

## Vim users

Add `set exrc` in your `~/.vimrc` to allow the `.vimrc` file in this directory to be used. It applies this project's
code style and also defines a shortcut `gp` which runs Prettier.
