import vis from 'vis';
import 'vis/dist/vis.css';
import { header } from './header.png';

export default {
  name: 'timeline',
  displayName: 'Timeline',
  description: 'A timeline vis, for showing events over a period of time',
  image: header,
  expression: 'filters | demodata | pointseries x="project" y="state" size="median(price)" | grid | render',
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
