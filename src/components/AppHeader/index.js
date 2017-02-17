/**
 * Created by jiawei6 on 2016/11/22.
 */
import React, {PropTypes} from 'react';

import './index.css';

const AppHeader = ({onLeftBtnClick, onRightBtnClick}) => (
  <header className="app_header">
    <div className="app_header_left_btn" onClick={onLeftBtnClick}></div>
    <div className="app_header_right_btn" onClick={onRightBtnClick}>＋</div>
  </header>
);

AppHeader.propTypes = {
  onLeftBtnClick: PropTypes.func,
  onRightBtnClick: PropTypes.func
};


export default AppHeader;