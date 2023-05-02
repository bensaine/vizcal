# vizcal

## What is it?

Visualizing concepts is a great way to learn them. It is also a great way to teach them. Vizcal is a tool to help you visualize Calculus concepts. Find visualization tools for Limits, Derivatives, Riemman Sums, and Arc Length. Made using Electron, Vite, and React - see [evite](https://evite.netlify.app/).

## Recommended IDE Setup

-   [VSCode](https://code.visualstudio.com/) + [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) + [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)

## Project Structure

```bash
.
├──src
│  ├──main
│  │  └──index.js
│  ├──preload
│  │  └──index.js
│  └──renderer # React
│     ├──src
│     │  ├──assets
│     │  ├──components
│     │  └──hooks
│     ├──index.html
│     └──...
├──electron.vite.config.js
├──package.json
└──...
```

## Project Setup (Node.js & NPM required)

### Install Dependencies

```bash
$ npm install
```

### Run for Development

```bash
$ npm run dev
```

### Build a Single-File Executable

```bash
# For windows
$ npm run build:win

# For macOS
$ npm run build:mac

# For Linux
$ npm run build:linux
```
