# ClickUSA - A clickable US Map
A clickable United States map built with ReactJS and jQuery. Check out the demo: http://mariakelly.github.io/clickusa/examples

## Usage

### HTML Markup
Add the following HTML code to your page to use this project in your site:
``` html
<div id="map-wrapper" class="container">
    <div id="clickusa-map"></div>
</div>
```

### CSS Includes
``` html
<link rel="stylesheet" type="text/css" href="<installation_path>/css/gse_clickusa.css">
```
### Javascript Includes
- Requires jQuery
``` html
<script src="https://ajax.googleapis.com/ajax/libs/jquery/2.2.0/jquery.min.js"></script>
<script src="<installation_path>/js/dist/bundle.min.js"></script>
```
### Legend and State Data
#### JSON - Legend Definition
Define a JSON array, ```legends``` to store the key and legend values you'd like to use on your map.
``` javascript
var legends = {
  'clickusa-display': {
    'a': {
      label: 'Exhibit A',
      color: 'red'
    },
    'b': {
      label: 'Exhibit B',
      color: 'blue'
    }
  }
};
```
#### State-by-State Data: Default: HTML Markup
This repository contains a file `js/data.js`, which will allow you to use HTML markup to add data for each state to your site, using the format displayed below, including the class names, ids, and the ```data-``` attributes. You can also edit the code to use your own JSON file outlining the legend keys and content to use for each state, but you will need to edit the code accordingly.
``` html
<div class="map-data" id="clickusa-display-data" data-title="First Year Standards were Expected to be Fully Implemented Across the State">
    <div class="state-data" data-state="AL" data-legendkey='b'>
      <p>This is the data that will show for the state of Alabama (abbreviation AL).
    </div>
    <div class="state-data" data-state="NJ" data-legendkey='["a","b"]'>
      <p>This is the data that will show for the state of New Jersey (abbreviation NJ).
    </div>
</div>
```
