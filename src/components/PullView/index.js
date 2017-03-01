import React, {PureComponent, PropTypes} from 'react';

export default class PullView extends PureComponent {

  static propTypes = {
    onPulling: PropTypes.func,
    onPullEnd: PropTypes.func,
    onPullingPause: PropTypes.func,
    onScrollToBottom: PropTypes.func,
    onScrollUp: PropTypes.func,
    onScrollDown: PropTypes.func,
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
  container = document.body;

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

    this.container.addEventListener('touchstart', this.onTouchStart);
    this.container.addEventListener('touchmove', this.onTouchMove, {passive: false});
    this.container.addEventListener('touchend', this.onTouchEnd);
    this.container.addEventListener('mousedown', this.onTouchStart);
    this.container.addEventListener('mousemove', this.onTouchMove, {passive: false});
    this.container.addEventListener('mouseup', this.onTouchEnd);
    window.addEventListener('scroll', this.onScroll);
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

    this.container.removeEventListener('touchstart', this.onTouchStart);
    this.container.removeEventListener('touchmove', this.onTouchMove);
    this.container.removeEventListener('touchend', this.onTouchEnd);
    this.container.removeEventListener('mousedown', this.onTouchStart);
    this.container.removeEventListener('mousemove', this.onTouchMove);
    this.container.removeEventListener('mouseup', this.onTouchEnd);
    window.removeEventListener('scroll', this.onScroll);
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
    const scrollTop = container.scrollTop;
    const clientHeight = container.clientHeight;
    const scrollHeight = container.scrollHeight;

    if (scrollTop + clientHeight + toBottom >= scrollHeight) {
      onScrollToBottom && onScrollToBottom();
    }

    if (scrollTop > this.lastScrollTop) {
      onScrollUp && onScrollUp();
    } else {
      onScrollDown && onScrollDown();
    }

    this.lastScrollTop = scrollTop;
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
    const {props: {children}, state: {pulledY}} = this;

    return (
      <div
        style={{
          transform: `translate3d(0px, ${pulledY}px, 0px)`
        }}
      >
        {children}
      </div>
    )
  }
}
