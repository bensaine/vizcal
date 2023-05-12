# vizcal

## What is it?

Visualizing concepts is a great way to learn them. It is also a great way to teach them. Vizcal is a tool to help you visualize Calculus concepts. Find visualization tools for Limits, Derivatives, Riemman Sums, and Arc Length. Made using Electron, Vite, and React - see [evite](https://evite.netlify.app/).

## Math Concepts

### Limit

A limit is a fundamental concept in calculus and mathematical analysis that
describes the behavior of a function as its input approaches a particular value.
In other words, it is the value that a function approaches as the input gets
arbitrarily close to a specific point. Limits are used to define the concepts of
continuity, derivatives, and integrals in calculus.

### Derivative

The derivative of a function at a given point is the instaneous slope of said
function at said point. The values for the run and rise dictate the range of
points at which the derivative is calculated and then yields the average slope
of the function between these points.
![derivative explanation image](https://cdn.discordapp.com/attachments/1069616366476349482/1106680696195530813/IMG_0556.webp)<figcaption align = "center"><b>Derivative explanation. Reference:https://machinelearningmastery.com/a-gentle-introduction-to-function-derivatives/</b></figcaption>
### Riemann Sums

In mathematics, a Riemann sum is a certain kind of approximation of an integral
by a finite sum. Riemann sums help us approximate definite integrals, but they
also help us formally define definite integrals.

### Arc Length

The arc length is an application of integration that lets us find the length of
a function within a certain range. The method by which this is achieved it very
similar to the approximation of the area under a curve where Riemann sums where
exhaustively used. In short, subdivisions in x of a function are joined by
straight lines and they are all joined to approximate the curve of the function.
The approximation is simply given by the sum of the length of each small line
section.

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

### Run Unit Tests

```bash
$ npm run test
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

## Notable Libraries Used

-   [Electron](https://www.electronjs.org/)
-   [Vite](https://vitejs.dev/)
-   [React](https://reactjs.org/)
-   [Desmos](https://www.desmos.com/)
-   [MathQuill](http://mathquill.com/)
-   [JQuery](https://jquery.com/)
