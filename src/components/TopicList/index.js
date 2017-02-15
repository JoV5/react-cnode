import React, {PropTypes} from "react";

import TopicCard from '../TopicCard';

const TopicList = ({data}) => (
  <div>
    {
      data.map((topic, i) => (
        <TopicCard data={topic} key={i}/>
      ))
    }
  </div>
);

TopicList.propTypes = {
  data: PropTypes.object.isRequired
};

export default TopicList;