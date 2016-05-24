/**
 * Map Info Panel Component
 */
var React = require('react');

var StateInfo = React.createClass({
  removeState: function() {
    this.props.onStateCanceled(this.props.abbr);
  },
  render: function() {
    var data = this.props.data;
    var abbr = this.props.abbr;
    var title = stateList[abbr];
    var subtitle = null;
    var content = null;

    // Populate fields
    if (typeof data[abbr] !== "undefined") {
      var stateInfo = data[abbr];
      if (typeof stateInfo.subtitle !== "undefined") {
        subtitle = <h3>{stateInfo.subtitle}</h3>;
      }
      if (typeof stateInfo.content !== "undefined") {
        var content = stateInfo.content;
      }
    }

    var removeLink = this.props.comparisonMode ? (<span onClick={this.removeState} className="remove pull-right glyphicon glyphicon-remove"></span>) : null;

    return (
      <div className={"state-info-wrap "+this.props.columnClass}>
        <div className="state-info">
          {removeLink}
          <h2>{title}</h2>
          {subtitle}
          <div dangerouslySetInnerHTML={{__html: content}}></div>
        </div>
      </div>
    );
  }
});

var MapInfoPanel = React.createClass({
  render: function() {
    var columnClass = '';
    if (this.props.currentStates.length == 2) {
      columnClass = 'col-md-6';
    } else if (this.props.currentStates.length == 3) {
      columnClass = 'col-md-4';
    } else {
      columnClass = 'col-md-12';
    }

    var stateInfos = [];
    var self = this;
    if (this.props.currentStates.length) {
      this.props.currentStates.forEach(function(state){
        stateInfos.push(
          <StateInfo
            key = {'state-'+state}
            abbr = {state}
            comparisonMode={self.props.comparisonMode}
            columnClass={columnClass}
            onStateCanceled={(st) => {self.props.onStateCanceled(st)}}
            data={self.props.data}>
          </StateInfo>
        );
      });
    } else {
      stateInfos = (
        <div className="col-md-12">
          <h2>Click on a state to view details.</h2>
        </div>
      );
    }

    return (
      <div className="info-panel">
        {stateInfos}
      </div>
    );
  }
});

module.exports = MapInfoPanel;