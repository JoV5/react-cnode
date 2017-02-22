export const getTabTopicCreator = (tab) => (state) => state.topic.get(tab);

export const getMatchedTopicId = (state, props) => props.match.params.topicid;