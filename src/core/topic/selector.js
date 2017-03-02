export const getTopicsNavIsShow = (state) => state.topic.get('topicsNavIsShow');
export const getSelectedTab = (state) => state.topic.get('selectedTab');
export const getTopicsHeaderIsShow = (state) => state.topic.get('topicsHeaderIsShow');


export const getTabTopicCreator = (tab) => (state) => state.topic.get(tab);

export const getMatchedTopicId = (state, props) => props.match.params.topicid;