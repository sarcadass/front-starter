# Front-Starter #

Configure [Grunt](http://gruntjs.com/) tasks like a breeze !

***

### What is this repository for? ###

This repo provides an easy way to configure Grunt tasks  with a config.json file to use SASS, uglify, concat, watch... without editing the Gruntfile.js

***

### How do I get set up? ###

* Install [Node.js](https://nodejs.org/)
+  ** If you're using SASS: **
    * Install [Ruby](https://www.ruby-lang.org/fr/) (Ruby is natively installed on OS X machines)
    * Install [SASS Gem](http://sass-lang.com/install)

***

### How do I configure the tasks? ###

Tasks and folders locations are set in the config.json file.
In this file you can activate the different tasks and set the different paths of your project.

***

### How can I use this plugin ? ###

When you have cloned this repo, run a ` npm install `, this will download all the project dependencies

__ You can use different functions to build manually your project: __

* ` grunt build ` : will execute every task set in the config.json
* ` grunt buildCss ` : will execute every SASS/CSS task set in the config.json
* ` grunt buildJs ` : will execute every JS task set in the config.json


__ Or you can watch for file modification to build your project: __

* ` grunt watchCss ` : will execute every SASS/CSS task set in the config.json, when original files are modified
* ` grunt watchJs ` : will execute every JS task set in the config.json, when original files are modified