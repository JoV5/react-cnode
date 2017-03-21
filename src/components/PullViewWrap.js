import React, {PureComponent, PropTypes} from 'react';

import PullView from './PullView';

export default class PullViewWrap extends PureComponent {

  static defaultProps = {
    statusText: ['↓ 下拉刷新', '↓ 下拉刷新', '↑ 释放更新', '加载中...'], // 文字对应状态
    unit: 'px'
  };

  // 大部分同PullView的props
  static propTypes = {
    onScrollToBottom: PropTypes.func,
    onScrollUp: PropTypes.func,
    onScrollDown: PropTypes.func,
    onPullViewUnmount: PropTypes.func,
    mountScrollTop: PropTypes.number,
    toBottom: PropTypes.number,
    toStopPause: PropTypes.bool,
    pulledPauseY: PropTypes.number,
    scaleY: PropTypes.number,
    statusDivStyleClass: PropTypes.string, // 状态变更div的className
    LoadingComponent: PropTypes.func, // 加载中显示的组件
    unit: PropTypes.string,
    styleClass: PropTypes.string // wrap的className
  };

  constructor() {
    super(...arguments);
    this.onPulling = this.onPulling.bind(this);
    this.onStatusChange = this.onStatusChange.bind(this);
  }

  state = {
    pulledY: 0, // 下拉的距离
    status: 0 // 当前状态
  };

  // PullView状态变更逻辑
  onStatusChange(status) {
    const {pulledPauseY} = this.props;
    
    switch (status) {
      case 0:
        this.setState({
          status,
          pulledY: 0
        });
        break;
      case 3:
        this.setState({
          status,
          pulledY: pulledPauseY
        });
        break;
      default:
        this.setState({
          status
        });
        break;
    }
  }

  // PullView触发onPulling逻辑
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