# Misc Files
These files aren't necessarily important to understand, so a brief description of each is provided below.

## package.json
A file mainly for use by [npm](https://www.npmjs.com/). When `npm i` is run, the dependencies (required packages for a program to run) listed in this file are installed.

## package_lock.json
A larger file of `package.json`, containing every single dependency. Some dependencies contain their own dependencies, and this lists them all, with other information.

## node_modules
Contains every NPM package installed in the project. A large folder, which will be created upon installing a package. Please don't go digging through here...

## config.json
Configuration information for the bot. A list of all parameters are listed in the awesome bot homepage.