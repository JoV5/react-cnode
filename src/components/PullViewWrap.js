import React, {PureComponent, PropTypes} from 'react';

import PullView from './PullView';

export default class PullViewWrap extends PureComponent {

  static defaultProps = {
    statusText: ['↓ 下拉刷新', '↓ 下拉刷新', '↑ 释放更新', '加载中...'],
    unit: 'px'
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
    LoadingComponent: PropTypes.func,
    unit: PropTypes.string,
    styleClass: PropTypes.string
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
    const {props, state: {pulledY, status}, onPulling, onStatusChange} = this;
    const {statusDivStyleClass, LoadingComponent, statusText, unit, styleClass} = props;

    return (
      <div className={styleClass}>
        <div
          className={statusDivStyleClass}
          style={{
            transform: `translateY(${pulledY}${unit})`
          }}
        >
          {status === 3 && LoadingComponent ? <LoadingComponent/> : statusText[status]}
        </div>
        <PullView 
          {...props}
          onStatusChange={onStatusChange}
          onPulling={onPulling}
        />
      </div>
    )
  }
}