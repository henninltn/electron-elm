Electron Elm
============

The boilerplate for cross-platform desktop applications built with elm.


## Requirement
- [Yarn](https://yarnpkg.com/lang/en/)
- [elm](http://elm-lang.org/)


## Usage

### Setup
```
$ npm run setup
```

### Build and start
```
$ npm run build

$ npm run start
```

### Develop
```
$ npm run dev
```


## Install
```
$ git clone https://github.com/henninltn/electron-elm.git /path/to/your/project
```

### Rename
recommend to use grep command in Linux

- package.json
  - line 2: "electron-elm" -> "your project name"
  - line 3: "Electron Elm" -> "your product name"
  - line 5: "The boilerplate ~" -> "your project's description"
  - line 24: "git+https://github.com/henninltn/penna.git" -> "your git repository"
  - line 33: "https://github.com/henninltn/penna/issues" -> "your issue"
  - line 35: "https://github.com/henninltn/penna#readme" -> "your home page"

- elm-package.json
  - line: 3: "The boilerplate ~" -> "your project's summary"
  - line: 4: "https://gibhub.com/henninltn/electron-elm.git" -> "your git repository"

- src/app.html
  - line: 5: Electron Elm -> your product name

- src/main/menu.js
  - line: 47: 'About Electron Elm' -> 'About your product'
  - line: 51: 'Hide Electron Elm' -> 'Hide your product'


## Licence

MIT


## Author

[hennin](https://github.com/hennin)

