import React, {PureComponent, PropTypes} from 'react';

import PullView from '../PullView';

import './index.css';

const StatusText = ['↓ 下拉刷新', '↑ 释放更新', '加载中...'];

export default class PullViewWrap extends PureComponent {

  static defaultProps = {
    pulledPauseY: 40
  };

  static propTypes = {
    onScrollToBottom: PropTypes.func,
    onScrollUp: PropTypes.func,
    onScrollDown: PropTypes.func,
    onPullViewUnmount: PropTypes.func,
    mountScrollTop: PropTypes.number,
    toBottom: PropTypes.number,
    pulledPauseY: PropTypes.number,
    scaleY: PropTypes.number
  };

  constructor() {
    super(...arguments);
    this.onPulling = this.onPulling.bind(this);
    this.onPullingPause = this.onPullingPause.bind(this);
    this.onPullEnd = this.onPullEnd.bind(this);
  }

  state = {
    pulledY: 0,
    status: 0, // 0：下拉刷新，1：释放刷新，2：加载中
    needStopPause: false,
    toStopPause: false
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.toStopPause && this.state.status === 2) {
      this.setState({
        status: 0,
        needStopPause: true,
        pulledY: 0,
        toStopPause: false
      });
    } else {
      this.setState({
        needStopPause: false
      });
    }
  }

  onPulling(pulledY) {
    if (pulledY > 40) {
      this.setState({
        pulledY,
        status: 1,
        needStopPause: false
      });
    } else {
      this.setState({
        pulledY,
        status: 0,
        needStopPause: false
      });
    }
  }

  onPullingPause(pulledY) {
    this.setState({
      pulledY: pulledY,
      status: 2,
      needStopPause: false
    });
  }

  onPullEnd(pulledY) {
    const {onPullEnd} = this.props;

    if (pulledY > 40) {
      this.setState({
        pulledY: 40,
        status: 2,
        needStopPause: false
      });

      onPullEnd && onPullEnd();
      return true;
    } else {
      this.setState({
        pulledY: 0,
        status: 0,
        needStopPause: false
      });
      return false;
    }
  }

  render() {
    const {
      props: {children, mountScrollTop, onScrollUp, onScrollDown, onScrollToBottom, onPullViewUnmount, pulledPauseY, toBottom, scaleY},
      state: {pulledY, needStopPause, status},
      onPulling,
      onPullEnd,
      onPullingPause
    } = this;

    return (
      <div>
        <div
          className="pull_status_div"
          style={{
            transform: `translate3d(0px, ${pulledY}px, 0px)`
          }}
        >
          {StatusText[status]}
        </div>
        <PullView
          onPulling={onPulling}
          onPullEnd={onPullEnd}
          onPullingPause={onPullingPause}
          onScrollToBottom={onScrollToBottom}
          onScrollUp={onScrollUp}
          onScrollDown={onScrollDown}
          componentWillUnmount={onPullViewUnmount}
          mountScrollTop={mountScrollTop}
          pulledPauseY={pulledPauseY}
          needStopPause={needStopPause}
          toBottom={toBottom}
          scaleY={scaleY}
        >
          {children}
        </PullView>
      </div>
    )
  }
}
