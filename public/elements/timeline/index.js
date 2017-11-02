import { header } from './header.png';

export default {
  name: 'timeline',
  displayName: 'Timeline',
  help: 'A timeline vis, for showing events over a period of time',
  image: header,
  expression: 'github-tags | timeline',
};
