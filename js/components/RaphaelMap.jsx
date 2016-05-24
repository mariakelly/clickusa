/**
* Raphael Map Component
*/
var React = require('react');

var LegendItem = React.createClass({
    getInitialState: function() {
        return {
            active: false
        }
    },
    toggleState: function() {
        if (this.state.active) {
            // console.log('got here??? UNLIGHT '+this.props.legendKey);
            this.props.map.clickMap('clearStateHover');
        } else {
            // console.log('got here??? HIGHLIGHT '+this.props.legendKey);
            this.props.map.clickMap('highlightStatesWithKey', this.props.legendKey);
        }
        this.setState({
            active: !this.state.active
        });
    },
    render: function() {
        return (
            <div className={'legend-item '+(this.state.active ? 'active' : '')} onMouseOver={() => { this.toggleState(); }} onMouseOut={() => { this.toggleState(); }}>
                <div className='color-box' style={{'backgroundColor': this.props.item.color}}></div>
                <label>{this.props.item.label}</label>
            </div>
        );
    }
});

var Legend = React.createClass({
    render: function() {
        var legendItems = [];
        for (var key in this.props.legend) {
            legendItems.push(
                <LegendItem
                  key={key}
                  legendKey={key}
                  item={this.props.legend[key]}
                  map={this.props.map}>
                </LegendItem>
            );
        }

        return (
            <div id='legend' className={this.props.hoverEnabled ? 'hover-enabled' : ''}>
                <h3>Legend</h3>
                {legendItems}
            </div>
        );
    }
});

var RaphaelMap = React.createClass({
  getInitialState: function() {
    return ({
        map: null
    });
  },
  componentDidMount: function() {
      this._construct();
  },
  componentDidUpdate: function(prevProps, prevState) {
      if (prevProps.comparisonMode != this.props.comparisonMode) {
          this.map.clickMap('setComparisonMode', this.props.comparisonMode);
      }
  },
  _construct: function() {
    var self = this;
    this.map = $('#'+this.id).clickMap({
      legend: this.props.legend,
      data: this.props.data,
      onStateClicked: function(st) {
        // console.log('in RaphaelMap. State clicked: ', st);
        self.props.onStateClicked(st);
      },
      addCurrentState: function(st) {
        // console.log('in RaphaelMap. Add state: ', st);
        self.props.onStateAdded(st);
      },
      removeCurrentState: function(st) {
        // console.log('in RaphaelMap. Remove state: ', st);
        self.props.onStateRemoved(st);
      }
    });

    this.setState({
        map: this.map
    });
  },
  render: function() {
      this.id = this.props.id;

      return (
          <div className="map-wrapper">
              <div id={this.id} className="map-container"></div>
              <Legend
                legend={this.props.legend}
                hoverEnabled={this.props.hoverEnabled}
                map={this.map}>
              </Legend>
          </div>
      );
  }
});

module.exports = RaphaelMap;