import React, { Component } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import classNames from 'classnames';

import { connect } from 'react-redux';

import uiConfig from '../constants/uiConfig';

import './streamsContainer.scss';

class StreamsContainer extends Component {

  constructor(props) {
    super(props);
    this.renderUserStreamBox = this.renderUserStreamBox.bind(this);
  }

  renderUserStreamBox(connectedUser) {
    const avatarStyle = {
      backgroundImage: `url(${connectedUser.picture})`,
      backgroundColor: connectedUser.textAvatarColor,
    };
    return (
      <div className="streamBox" key={connectedUser.userId}>
        <div className="avatar" style={avatarStyle}>
          {connectedUser.picture ? '' : connectedUser.initials}
        </div>
      </div>
    );
  }

  render() {
    const { streamContainerSize } = this.props;
    const streamContainerClassNames = {
      streamContainer: true,
      // compact: uiSize === uiConfig.COMPACT,
      // default: uiSize !== uiConfig.COMPACT,
    };

    return (
      <div
        className={classNames(streamContainerClassNames)}
        style={{ height: streamContainerSize === uiConfig.LARGE ? '18%' : '60px' }}>
        <ReactCSSTransitionGroup
            transitionName="streamBox"
            transitionAppear={true}
            transitionAppearTimeout={200}
            transitionEnterTimeout={1000}
            transitionLeaveTimeout={400}>
            {this.props.connectedUsers.map(this.renderUserStreamBox)}
        </ReactCSSTransitionGroup>
      </div>
    );
  }
 }

StreamsContainer.propTypes = {
  roomAPI: React.PropTypes.object,
  roomInfo: React.PropTypes.object,
  connectedUsers: React.PropTypes.array,
  uiSize: React.PropTypes.string.isRequired,
  streamContainerSize: React.PropTypes.string.isRequired,
};

export default connect(null, {})(StreamsContainer);