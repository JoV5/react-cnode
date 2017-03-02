import React, {Component, PropTypes} from "react";
import {is} from 'immutable';

export default (Card) => {
  class CardList extends Component {

    shouldComponentUpdate(nextProps) {
      return !is(nextProps.data, this.props.data);
    }

    render() {
      const {data} = this.props;

      return (
        <div>
          {data.map((topic, i) => <Card data={topic} key={i}/>)}
        </div>
      );
    }
  }

  CardList.propTypes = {
    data: PropTypes.object.isRequired
  };

  return CardList;
}
