# mlbz-nudge
> Simple dependency free ES6 library to produce small on-screen nudges

**This is the successor of https://github.com/OwenMelbz/jquery-nudge**

This is a simple ES6 no strings attached, self contained, you get what you pay for micro library.

It simply allows you to display a small unobtrusive on screen prompt for a few moments.

![Demo](https://github.com/owenmelbz/mlbz-nudge/raw/master/demo.gif)

Super helpful for things like

- Back up saved
- New friend request
- Gentle reminders

## Installation

You can install via npm or yarn

via npm using `npm install mlbz-nudge`

or via yarn using `yarn add mlbz-nudge`

# Usage

You will need to transpile this down for older browsers most likely, but once you've got that flow working simply use however you like e.g

```js
window.nudge = require('mlbz-nudge');

new nudge('this is globally accessible');
```

or even

```js
import nudge from 'mlbz-nudge'

new nudge('this is local to the file');
```

# Configuring

You can pass in either a single string param for a simple message, or you can pass in a configuration object, the default looks like

```js
{
    message: 'This is a nudge', // the default message
    wait: 3000, // how long to sit on the screen idle
    delay: 100, // how long to wait before starting the incoming animation
    kill: 4500, // how long before removing the element after its been hidden off screen
}
```

# Customising

The CSS for the component is scoped within the element itself, however you should be able to overwite using

```
.mlbz-nudge
.mlbz-nudge span
.mlbz-nudge.start
.mlbz-nudge.show
.mlbz-nudge.finish
```

Or you can pass in

```js
{
    noCss: true
}
```

To disable the css completely.

> Enjoy
