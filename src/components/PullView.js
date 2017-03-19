import React, {PureComponent, PropTypes} from 'react';

export default class PullView extends PureComponent {

  static propTypes = {
    onPulling: PropTypes.func,
    onPullEnd: PropTypes.func,
    onScrollToBottom: PropTypes.func,
    onScrollUp: PropTypes.func,
    onScrollDown: PropTypes.func,
    onPullViewUnmount: PropTypes.func,
    onStatusChange: PropTypes.func,
    mountScrollTop: PropTypes.number,
    toBottom: PropTypes.number,
    pulledPauseY: PropTypes.number,
    toStopPause: PropTypes.bool,
    scaleY: PropTypes.number
  };

  static defaultProps = {
    scaleY: 0.2,
    toBottom: 0,
    pulledPauseY: 40,
    mountScrollTop: 0,
    toStopPause: false
  };

  state = {
    pulledY: 0
  };

  touching = false; // 是否处于touch状态
  startY = undefined;
  endY = undefined;
  status = 0;
  lastScrollTop = undefined; // 上次scrollTop的位置
  container = document.body;

  constructor() {
    super(...arguments);
    this._onTouchStart = this._onTouchStart.bind(this);
    this._onTouchMove = this._onTouchMove.bind(this);
    this._onTouchEnd = this._onTouchEnd.bind(this);
    this._onScroll = this._onScroll.bind(this);
    this._onPulling = this._onPulling.bind(this);
    this._onPullEnd = this._onPullEnd.bind(this);
    this._changeStatus = this._changeStatus.bind(this);
  }

  componentWillReceiveProps({toStopPause}) {
    if (toStopPause && this.status === 3) {
      this.setState({
        pulledY: 0
      });
      this._changeStatus(0);
    }
  }

  componentDidMount() {
    const {props: {mountScrollTop}, container} = this;
    container.scrollTop = mountScrollTop;
    this.lastScrollTop = mountScrollTop;

    container.addEventListener('touchstart', this._onTouchStart);
    container.addEventListener('touchmove', this._onTouchMove, {passive: false});
    container.addEventListener('touchend', this._onTouchEnd);
    container.addEventListener('mousedown', this._onTouchStart);
    container.addEventListener('mousemove', this._onTouchMove, {passive: false});
    container.addEventListener('mouseup', this._onTouchEnd);
    window.addEventListener('scroll', this._onScroll);
  }

  componentWillUnmount() {
    const {props: {onPullViewUnmount}, container} = this;
    onPullViewUnmount && onPullViewUnmount(container.scrollTop);

    container.removeEventListener('touchstart', this._onTouchStart);
    container.removeEventListener('touchmove', this._onTouchMove);
    container.removeEventListener('touchend', this._onTouchEnd);
    container.removeEventListener('mousedown', this._onTouchStart);
    container.removeEventListener('mousemove', this._onTouchMove);
    container.removeEventListener('mouseup', this._onTouchEnd);
    window.removeEventListener('scroll', this._onScroll);
  }

  _onTouchStart() {
    this.touching = true;
  }

  _onTouchMove(e) {
    const {
      container,
      props: {onPulling, scaleY},
      touching, startY, status, _onPulling
    } = this;
    const eTouchScreenY = e.touches ? e.touches[0].screenY : e.screenY;

    if (!touching) return;

    if (status) {
      const pulledY = (eTouchScreenY - startY) * scaleY;

      if (pulledY >= 0) {
        this.endY = eTouchScreenY;
        this.setState({
          pulledY: pulledY
        });

        if (status !== 3) {
          _onPulling && _onPulling(pulledY);
        }
        
        onPulling && onPulling(pulledY);

        e.preventDefault();
      } else {
        if (status === 3) {
          this.setState({
            pulledY: 0
          });
          this._changeStatus(0);
        } else {
          this.setState({
            pulledY: 0
          });
        }
      }
    } else {
      if (container.scrollTop === 0) {
        this.startY = eTouchScreenY;
        if (!this.status) {
          this._changeStatus(1);
        }
      }
    }
  }

  _onScroll() {
    const {container, props: {toBottom, onScrollToBottom, onScrollUp, onScrollDown}} = this;
    const scrollTop = Math.ceil(container.scrollTop);
    const clientHeight = window.innerHeight;
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

  _onTouchEnd() {
    const {props: {pulledPauseY}, state: {pulledY}, status, _onPullEnd} = this;

    if (status) {
      const isPause = _onPullEnd ? _onPullEnd(pulledY) : false;

      this.setState({
        pulledY: isPause ? pulledPauseY : 0
      });
      this._changeStatus(isPause ? 3 : 0);
    }

    this.touching = false;
  }

  _onPulling(pulledY) {
    const {props: {pulledPauseY}, status} = this;
    
    if (pulledY > pulledPauseY) {
      if (status !== 2) {
        this._changeStatus(2);
      }
    } else {
      if (status !== 1) {
        this._changeStatus(1);
      }
    }
  }
  
  _onPullEnd(pulledY) {
    const {pulledPauseY, onPullEnd} = this.props;

    if (pulledY > pulledPauseY) {
      this._changeStatus(3);
      onPullEnd && onPullEnd();
      return true;
    } else {
      this._changeStatus(0);
      return false;
    }
  }
  
  _changeStatus(status) {
    const {onStatusChange} = this.props;
    
    this.status = status;
    onStatusChange && onStatusChange(this.status);
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
