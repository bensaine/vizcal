# vizcal

## What is it?

Visualizing concepts is a great way to learn them. It is also a great way to teach them. Vizcal is a tool to help you visualize Calculus concepts. Find visualization tools for Limits, Derivatives, Riemman Sums, and Arc Length. Made using Electron, Vite, and React - see [evite](https://evite.netlify.app/).

## Demo

### Loading a file from an existing file in home menu

This functionality is useful when the user wants to open a file that they have previously saved on their device. By clicking on the "load an existing experiment from a file" text, the user can navigate through their device and select the file they want to open.

![Loading from existing file gif](https://i.gyazo.com/4782ef7bebbd3828de44d409a92bc067.gif)

### Customizable parameters

This functionality allows the user to adjust various parameters in each experiment.Each parameter is specific to its experiment.

![Customizable parameters gif](https://i.gyazo.com/407c0b1e968b8f459035f458fb979448.gif)

### Two different themes

This functionality allows the user to switch between two different visual themes in the application. This includes light and dark modes.

![Different themes gif](https://i.gyazo.com/cb705a5b92eedca1ba086975e67e32a6.gif)

### Customizable colors

This functionality allows the user to customize the colors used in the application. For example, they are able to change the color of the graph's function.

![Customizable colors gif](https://i.gyazo.com/407c0b1e968b8f459035f458fb979448.gif)

### Customizable font

This functionality allows the user to adjust the font used throughout the application.

![Customizable font gif](https://i.gyazo.com/d3fe3b3920b080a558f89ac74dde6c1d.gif)

## Math Concepts

### Limit

A limit is a fundamental concept in calculus and mathematical analysis that
describes the behavior of a function as its input approaches a particular value.
In other words, it is the value that a function approaches as the input gets
arbitrarily close to a specific point. Limits are used to define the concepts of
continuity, derivatives, and integrals in calculus.

![limit explanation image](https://tutorial.math.lamar.edu/classes/calcI/DefnOfLimit_Files/image001.png)<figcaption align = "center"><b>Limit explanation. Reference: https://tutorial.math.lamar.edu/classes/calcI/defnoflimit.aspx.</b></figcaption>

### Derivative

The derivative of a function at a given point is the instaneous slope of said
function at said point. The values for the run and rise dictate the range of
points at which the derivative is calculated and then yields the average slope
of the function between these points.

![derivative explanation image](https://cdn.discordapp.com/attachments/1069616366476349482/1106680696195530813/IMG_0556.webp)<figcaption align = "center"><b>Derivative explanation. Reference: https://machinelearningmastery.com/a-gentle-introduction-to-function-derivatives/.</b></figcaption>

### Riemann Sums

In mathematics, a Riemann sum is a certain kind of approximation of an integral
by a finite sum. Riemann sums help us approximate definite integrals, but they
also help us formally define definite integrals. Through Rieman sums, we give the answer to a problem with an approximation, refine it to make it more precice, and use limits to obtain an exact answer. This application focuses on the two first parts of the process.

![riemann sums explanation image](https://i.stack.imgur.com/9hTsL.gif)<figcaption align = "center"><b>Riemann sums explanation. Reference: https://math.libretexts.org/Bookshelves/Calculus/Calculus_3e_(Apex)/05%3A_Integration/5.03%3A_Riemann_Sums.</b></figcaption>

### Arc Length

The arc length is an application of integration that lets us find the length of
a function within a certain range. The method by which this is achieved is very
similar to the approximation of the area under a curve where Riemann sums where
exhaustively used. In short, subdivisions in x of a function are joined by
straight lines and they are all joined to approximate the curve of the function.
The approximation is simply given by the sum of the length of each small line
section.

![arc length explanation image](https://s3-us-west-2.amazonaws.com/courses-images/wp-content/uploads/sites/2332/2018/01/11213108/CNX_Calc_Figure_06_04_001.jpg)<figcaption align = "center"><b>Arc Length explanation. Reference: https://www.mathsisfun.com/calculus/arc-length.html</b></figcaption>

## Recommended IDE Setup

-   [VSCode](https://code.visualstudio.com/) + [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) + [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)

## Project Structure

```bash
.
├──src # Electron
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
-   [electron-vite](https://evite.netlify.app/)
-   [React](https://reactjs.org/)
-   [Desmos](https://www.desmos.com/)
-   [MathQuill](http://mathquill.com/)
-   [JQuery](https://jquery.com/)
-   [Vitest](https://vitest.dev/)
