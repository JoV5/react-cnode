import React, {PureComponent, PropTypes} from 'react';

const defaultStyle = {
  position: 'absolute',
  top: 0,
  bottom: 0,
  left: 0,
  right: 0,
  overflowY: 'scroll',
  paddingTop: 'inherit'
};

export default class PullView extends PureComponent {

  static propTypes = {
    onPulling: PropTypes.func,
    onPullEnd: PropTypes.func,
    onPullingPause: PropTypes.func,
    onScrollToBottom: PropTypes.func,
    componentWillUnmount: PropTypes.func,
    mountScrollTop: PropTypes.number,
    toBottom: PropTypes.number,
    pulledPauseY: PropTypes.number,
    needStopPause: PropTypes.bool,
    scaleY: PropTypes.number
  };

  static defaultProps = {
    scaleY: 0.2,
    toBottom: 0,
    pulledPauseY: 0,
    mountScrollTop: 0
  };

  state = {
    pulledY: 0
  };

  touching = false;
  startY = undefined;
  endY = undefined;
  pulling = false;
  ifPause = false;
  lastScrollTop = undefined;

  constructor() {
    super(...arguments);
    this.onTouchStart = this.onTouchStart.bind(this);
    this.onTouchMove = this.onTouchMove.bind(this);
    this.onTouchEnd = this.onTouchEnd.bind(this);
    this.onScroll = this.onScroll.bind(this);
  }

  componentDidMount() {
    const {props: {mountScrollTop}, container} = this;
    container.scrollTop = mountScrollTop;
    this.lastScrollTop = mountScrollTop;
    this.container.addEventListener('touchmove', this.onTouchMove);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.needStopPause) {
      this.pulling = false;
      this.ifPause = false;
      this.setState({
        pulledY: 0
      })
    }
  }

  componentWillUnmount() {
    const {props: {componentWillUnmount}, container} = this;
    componentWillUnmount && componentWillUnmount(container.scrollTop);
  }

  onTouchStart() {
    this.touching = true;
  }

  onTouchMove(e) {
    const {
      container,
      props: {onPulling, onPullingPause, scaleY},
      touching, startY, pulling, ifPause
    } = this;
    const eTouchScreenY = e.touches ? e.touches[0].screenY : e.screenY;

    if (!touching) return;

    if (pulling) {
      const pulledY = (eTouchScreenY - startY) * scaleY;

      if (pulledY >= 0) {
        this.endY = eTouchScreenY;
        this.setState({
          pulledY: pulledY
        });

        if (ifPause) {
          onPullingPause && onPullingPause(pulledY);
        } else {
          onPulling && onPulling(pulledY);
        }

        e.preventDefault();
      } else {
        if (ifPause) {
          this.ifPause = false;
          this.setState({
            pulledY: 0
          });
        } else {
          this.setState({
            pulledY: 0
          });
        }
      }
    } else {
      if (container.scrollTop === 0) {
        this.startY = eTouchScreenY;
        this.pulling = true;
      }
    }
  }

  onScroll() {
    const {container, props: {toBottom, onScrollToBottom, onScrollUp, onScrollDown}} = this;

    if (container.scrollTop + container.clientHeight + toBottom >= container.scrollHeight) {
      onScrollToBottom && onScrollToBottom();
    }

    if (container.scrollTop > this.lastScrollTop) {
      onScrollUp && onScrollUp();
    } else {
      onScrollDown && onScrollDown();
    }

    this.lastScrollTop = container.scrollTop;
  }

  onTouchEnd() {
    const {props: {onPullEnd, pulledPauseY}, state: {pulledY}, pulling} = this;

    if (pulling) {
      const ifPause = onPullEnd ? onPullEnd(pulledY) : false;

      this.setState({
        pulledY: ifPause ? pulledPauseY : 0
      });
      this.ifPause = ifPause;
      this.pulling = ifPause;
    }

    this.touching = false;
  }

  render() {
    const {props: {style, children}, state: {pulledY}, onTouchStart, onTouchMove, onTouchEnd, onScroll} = this;

    return (
      <div
        style={{
          ...defaultStyle,
          ...style,
          transform: `translate3d(0px, ${pulledY}px, 0px)`
        }}
        ref={(container) => this.container = container}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
        onMouseDown={onTouchStart}
        onMouseMove={onTouchMove}
        onMouseUp={onTouchEnd}
        onScroll={onScroll}
      >
        {children}
      </div>
    )
  }
}
