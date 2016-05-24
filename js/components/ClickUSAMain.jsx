/**
 * Click USA Main App Component
 */
var React = require('react');
var RaphaelMap = require('./RaphaelMap.jsx');
var MapInfoPanel = require('./MapInfoPanel.jsx');

var ClickUSAMain = React.createClass({
    getInitialState: function() {
      var mapData = parseMapData(this.props.id);
      return {
          mapData: mapData,
          mapLegend: legends[this.props.id],
          comparisonMode: false,
          currentStates: []
      };
    },
    toggleComparisonMode: function() {
      this.setState({
        comparisonMode: !this.state.comparisonMode
      });
    },
    addState: function(st) {
      console.log('adding state: ',st);
      var newCurrentStates = this.state.currentStates;
      newCurrentStates.push(st);

      // Update State
      this.setState({
        currentStates: newCurrentStates
      }, function() {
        this.props.onStateAdded(st);
      });
    },
    removeState: function(st) {
      console.log('removing state: ',st);
      var newCurrentStates = this.state.currentStates;
      var idx = newCurrentStates.indexOf(st);
      if (idx > -1) {
        newCurrentStates.splice(idx, 1);
      }

      // Update State
      this.setState({
        currentStates: newCurrentStates
      }, function() {
        this.props.onStateRemoved(st);
      });
    },
    onStateClicked: function(){
      var target = $('#'+this.props.id).parent().parent().find('.info-panel');
      $('html,body').animate({
        scrollTop: target.offset().top
      }, 1000);
    },
    onStateCanceled: function(st) {
      console.log('state ', st, ' canceled');
      this.refs.map.map.clickMap('removeState', st)
    },
    render: function() {
      var comparisonState = (this.state.comparisonMode) ? 'active' : 'inactive';
      var title = (typeof this.state.mapData.title != "undefined") ? <h3 className="title">{this.state.mapData.title}</h3> : '';
      var compareDisplay = [];
      if (this.props.compareEnabled) {
        compareDisplay = (
            <div className="compare-btn-wrap">
              <a className={'btn btn-primary btn-xs btn-block '+comparisonState} onClick={this.toggleComparisonMode} role="button" aria-pressed={comparisonState == 'active' ? 'true' : 'false'}>Compare States: {comparisonState == 'active' ? 'ON' : 'OFF'}</a>
              <small>Compare up to 3 states</small>
            </div>
        );
      }
      return (
          <div id="wrap">
            {title}
            {compareDisplay}
            <RaphaelMap
              id={this.props.id}
              ref='map'
              data={this.state.mapData}
              comparisonMode={this.state.comparisonMode}
              onStateAdded={this.addState}
              onStateRemoved={this.removeState}
              onStateClicked={this.onStateClicked}
              legend={this.state.mapLegend}
              hoverEnabled={this.props.hoverEnabled}>
            </RaphaelMap>
            <MapInfoPanel
              ref='info'
              data={this.state.mapData}
              comparisonMode={this.state.comparisonMode}
              currentStates={this.state.currentStates}
              onStateCanceled={this.onStateCanceled}>
            </MapInfoPanel>
          </div>
      );
    }
});

module.exports = ClickUSAMain;