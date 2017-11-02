import vis from 'vis';
import 'vis/dist/vis.css';

export default {
  name: 'timeline',
  displayName: 'Timeline',
  help: 'A timeline vis, for showing events over a period of time',
  render(domNode, config, handlers) {
    const { options, data } = config;
    const items = data
    .filter(row => Boolean(row.content) && Boolean(row.start))
    .map(row => ({
      ...row,
      start: row.start && new Date(row.start),
      end: row.end && new Date(row.end),
    }));

    // clean up any existing timeline in the node
    // THIS IS TERRIBLE, DO NOT DO THIS
    const oldVis = domNode.querySelector('.vis-timeline');
    if (oldVis) domNode.removeChild(oldVis);

    // create the vis timeline
    new vis.Timeline(domNode, items, options);

    handlers.done();
  },
};
