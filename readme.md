# Jigsaw

A component library by @rickary

## Setup

`npm install`

`gulp`

This will do two things. 

1. Watch the *_dev/scss* folder for changes to the sass
2. Start fractal

### Dependencies

* [Fractal](https://fractal.build/)
* [Gulp](https://gulpjs.com/)
  * [gulp-sass](https://www.npmjs.com/package/gulp-sass)
  * [gulp-autoprefixer](https://www.npmjs.com/package/gulp-autoprefixer)

### How to use

Global Sass is in the **_dev/scss** folder. 

*utils* contains:
* restart (reset/set)
* mixins
* utility classes

*layout* contains basic layouts only, no complicated grid systems—save those for individual projects.

*tokens* contains global settings as custom variables.

In each of the folders, index.scss imports everything else.

**component-helper** grabs the tokens, utils & layout files for easy importing into individual projects.

The **components** folder is organised into *bits* (e.g. buttons, text input etc.) and *pieces* (e.g. cards, forms etc.).

### Using in individual projects

In the project directory:

- In terminal, run `npm link @rickary/jigsaw` - note that you need to complete this step each time you make a change to package.json
- In `node_modules` of the project, add `"@rickary/jigsaw": "github:rickary/jigsaw"` as a dependency
- Run `npm install`.

In the master.scss file for the project
- Import component-helper
- Import required components
- Import project global tokens
- Import project component override tokens
- Import project specific styles


## Versions

0.1 - current
