// main.js
var React = require('react');
var ReactDOM = require('react-dom');
var ClickUSAMain = require('./components/ClickUSAMain.jsx');
var $ = require('jquery');

var adjustInfoTableHeights = function() {
  // Get number of table rows. For each row idx,
  // check all tables for the height of that row to find max
  // set all rows at that idx to that height
  var infoPanel = $('#'+this.id).parent().next('.info-panel');
  var trCount = infoPanel.find('table').eq(0).find('tr').length;
  infoPanel.find('table tr').height('auto');

  console.log('trCount is:', trCount);
  for (var i = 0; i < trCount; i++) {
    var maxHeight = -1;
    // Find Max Height
    $('.info-panel table tr:nth-child('+(i+1)+')').each(function(){
        maxHeight = maxHeight > $(this).height() ? maxHeight : $(this).height();
    });
    console.log('maxHeight for row ',(i+1),' is: ', maxHeight);
    // Set all to maxHeight
    infoPanel.find('table tr:nth-child('+(i+1)+')').height(maxHeight);
  }
}

if (document.getElementById('clickusa_container_implemented') !== null) {
    ReactDOM.render(
      <ClickUSAMain
        id='map1'
        onStateAdded={adjustInfoTableHeights}
        onStateRemoved={adjustInfoTableHeights}
        hoverEnabled={true}
        compareEnabled={true}>
      </ClickUSAMain>,
      document.getElementById('clickusa_container_implemented')
    );
}

if (document.getElementById('clickusa_container_aligned') !== null) {
    ReactDOM.render(
      <ClickUSAMain
        id='map2'
        onStateAdded={adjustInfoTableHeights}
        onStateRemoved={adjustInfoTableHeights}
        hoverEnabled={true}
        compareEnabled={true}>
      </ClickUSAMain>,
      document.getElementById('clickusa_container_aligned')
    );
}

if (document.getElementById('clickusa_container_exams') !== null) {
    ReactDOM.render(
      <ClickUSAMain
        id='map3'
        onStateAdded={adjustInfoTableHeights}
        onStateRemoved={adjustInfoTableHeights}
        hoverEnabled={true}
        compareEnabled={true}>
      </ClickUSAMain>,
      document.getElementById('clickusa_container_exams')
    );
}