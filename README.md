# jsCloud

JsCould is a fork of the [jQCloud](http://mistic100.github.io/jQCloud) library that removes the use of Jquery but instead use Typescript.

## Install

```bash
npm install js-word-cloud
```

## Usage

Include the css file in your html file:

```html
<link rel="stylesheet" type="text/css" href="node_modules/js-word-cloud/dist/jqcloud.css">
```

Import the library in your javascript file:

```javascript
import jscloud from 'js-word-cloud';

jscloud(document.getElementById('wc'), [
    { text: 'Lorem', weight: 13 },
    { text: 'Ipsum', weight: 10.5 },
    { text: 'Dolor', weight: 9.4 },
    { text: 'Sit', weight: 8 },
    { text: 'Amet', weight: 6.2 },
    { text: 'Consectetur', weight: 5 },
    { text: 'Adipiscing', weight: 5 },
], {
    width: 500,
    height: 350,
});
```

## Documentation

For proper documentation, please refer to the original [jQCloud](http://mistic100.github.io/jQCloud) documentation.
http://mistic100.github.io/jQCloud

## License
This library is available under the MIT license.
