# My webpack config

## About

This is webpack configuration I use to develop and deploy my projects.

Capability:
- compressing images
- normalize styles
- sass & css loaders
- babel 

## Getting Started

Install all packages:
```
npm i
```

In project catalog create missing directories from the folowing file structure:

```
|-- dist
|-- src
    |-- fonts
    |-- img
    |-- js
        |-- index.js
    |-- pages //optional
    |-- sass
        |-- main.sass
    |-- index.html
```

## Usage:

Use following command to deploy your project: 
``` 
npm run build
```
Fast build in developmen mode:
```
npm run dev
```
Develop an applicaton using webpack dev server:
```
npm start
```

## Options

### Multi page application

In case you are developing a multi page applicaton, uncomment next lines in webpack.config.js:
- 37:

``` JavaScript
const pages = fs.readdirSync(path.resolve(__dirname, 'src', 'pages'))
```
- 74-79:
``` JavaScript
...pages.map( page => {
      return new HTMLWebpackPlugin({
        filename: page,
        template: "./src/pages/" + page
      })
    } ),
```

Then create 'pages' folder in 'src' catalog. Use this folder to store your non-index pages.

### Dev vs Build

Development mode faster than build mode. It does not compress your images, but creates source maps to simple project editing.

Build mode is used for deploy your project. It compress your images and minimize all of html/css/js files providing faser documen loading.