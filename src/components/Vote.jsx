import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import classNames from 'classnames'
let voteArray = [];
let uniqVote = [];

export default React.createClass({
  mixins: [PureRenderMixin],
  getPair: function() {
    return this.props.pair || [];
  },
  isDisabled: function() {
    if(this.props.hasVoted !== undefined)
    {
      voteArray.push(this.props.hasVoted);
      uniqVote = [ ...new Set(voteArray) ]; 
    }
    if(uniqVote.length == 2) {
      return !!this.props.hasVoted;
    } else {
      return false;
    }
  },
  hasVotedFor: function(entry) {
    if(this.props.hasVoted !== undefined)
    {
      voteArray.push(this.props.hasVoted);
      uniqVote = [ ...new Set(voteArray) ]; 
    }
    return uniqVote.indexOf(entry) !== -1;
  },
  render: function() {
    return <div className="voting ui inverted segment">
      {this.getPair().map(entry =>
        <button key={entry}
                className={classNames({'ui disabled button': this.isDisabled()},
                  {voted: this.hasVotedFor(entry)},
                  {'ui green inverted button': this.hasVotedFor(entry)})}
                disabled={this.isDisabled()}
                onClick={() => this.props.vote(entry)}>
          <h1>{entry}</h1>
          {this.hasVotedFor(entry) ?
            <div className="label">Voted</div> :
            null}
        </button>
      )}
    </div>;
  }
});
