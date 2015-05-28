# Front-Starter #
[![Built with Grunt](https://cdn.gruntjs.com/builtwith.png)](http://gruntjs.com/)

Configure [Grunt](http://gruntjs.com/) tasks like a breeze!
This repo provides an easy way to configure Grunt tasks  with a config.json file to use Sass, Less, Uglify, Concat, Watch... without editing the Gruntfile.js

`npm install front-starter` 

### How do I get set up? ###

* Install [Node.js](https://nodejs.org/)
* If you're using SASS:
    1. Install [Ruby](https://www.ruby-lang.org/fr/) (Ruby is natively installed on OS X machines)
    2. Install [SASS Gem](http://sass-lang.com/install)
* Target your working folder then run `npm install front-starter`    



### How do I configure the tasks? ###

Tasks and folders locations are set in the config.json file.
In this file you can activate the different tasks and set the different paths of your project.



### How can I use this plugin? ###

You can use different functions to **build manually** your project:

* ` grunt build ` : will execute every task set in the config.json
* ` grunt buildCss ` : will execute every CSS related task (Sass/Less...) set in the config.json
* ` grunt buildJs ` : will execute every JS related task set in the config.json

Or you can **watch for file modification** to build your project:

* ` grunt watchCss ` : will execute every CSS related task (Sass/Less...) set in the config.json, when original files are modified
* ` grunt watchJs ` : will execute every JS related task set in the config.json, when original files are modified



### Extra info on config.json configuration: ###

* You can choose between 4 options for the **sass.compression**:
    * 'nested'
    * 'compact'
    * 'compressed'
    * 'expanded'

* **less.ieCompat**: Enforce the CSS output is compatible with Internet Explorer 8.

* **css.cleanConcatInput**: Remove the ConcatInput files after concatenation