import React, {PureComponent, PropTypes} from 'react';

const StatusText = ['↓ 下拉刷新', '↑ 释放更新', '加载中...'];

export default class PullView extends PureComponent {

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
      })
    } else {
      this.setState({
        needStopPause: false
      })
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
      props: {data, mountScrollTop},
      state: {pulledY, needStopPause, status}
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
          onPulling={this.onPulling}
          onPullEnd={this.onPullEnd}
          onPullingPause={this.onPullingPause}
          mountScrollTop={mountScrollTop}
          pulledPauseY={40}
          needStopPause={needStopPause}
        >
          {data && <TopicList data={data}/>}
          <div className="load_more_info">加载中...</div>
        </PullView>
      </div>
    )
  }
}
