import React, {PureComponent, PropTypes} from 'react';

import PullView from './PullView';

export default class PullViewWrap extends PureComponent {

  static defaultProps = {
    statusText: ['↓ 下拉刷新', '↓ 下拉刷新', '↑ 释放更新', '加载中...']
  };

  static propTypes = {
    onScrollToBottom: PropTypes.func,
    onScrollUp: PropTypes.func,
    onScrollDown: PropTypes.func,
    onPullViewUnmount: PropTypes.func,
    mountScrollTop: PropTypes.number,
    toBottom: PropTypes.number,
    pulledPauseY: PropTypes.number,
    scaleY: PropTypes.number,
    statusDivStyleClass: PropTypes.string,
    LoadingComponent: PropTypes.func
  };

  constructor() {
    super(...arguments);
    this.onPulling = this.onPulling.bind(this);
    this.onStatusChange = this.onStatusChange.bind(this);
  }

  state = {
    pulledY: 0,
    status: 0
  };

  onStatusChange(status) {
    const {pulledPauseY} = this.props;
    if (status) {
      if (status === 3) {
        this.setState({
          status,
          pulledY: pulledPauseY
        })
      } else {
        this.setState({
          status
        })
      }
    } else {
      this.setState({
        status,
        pulledY: 0
      })
    }
  }

  onPulling(pulledY) {
    this.setState({
      pulledY
    });
  }

  render() {
    const {
      props: {children, mountScrollTop, onScrollUp, onScrollDown, onScrollToBottom, onPullViewUnmount, pulledPauseY,
        toBottom, scaleY, statusDivStyleClass, LoadingComponent, statusText, toStopPause, onPullEnd},
      state: {pulledY, status},
      onPulling,
      onStatusChange
    } = this;

    return (
      <div>
        <div
          className={statusDivStyleClass}
          style={{
            transform: `translate3d(0px, ${pulledY}px, 0px)`
          }}
        >
          {status === 3 && LoadingComponent ? <LoadingComponent/> : statusText[status]}
        </div>
        <PullView
          onPulling={onPulling}
          onPullEnd={onPullEnd}
          onScrollToBottom={onScrollToBottom}
          onScrollUp={onScrollUp}
          onScrollDown={onScrollDown}
          onPullViewUnmount={onPullViewUnmount}
          mountScrollTop={mountScrollTop}
          pulledPauseY={pulledPauseY}
          toStopPause={toStopPause}
          toBottom={toBottom}
          scaleY={scaleY}
          onStatusChange={onStatusChange}
        >
          {children}
        </PullView>
      </div>
    )
  }
}
