import { Arg } from 'plugins/canvas/expression_types/arg';
import { View } from 'plugins/canvas/expression_types/view';

export default new View('timeline', {
  displayName: 'Timeline',
  description: 'Show your time series data on a timeline',
  modelArgs: [], // TODO: this is weird, fix it upsteam
  args: [
    new Arg('font', {
      displayName: 'Text settings',
      description: 'Fonts, alignment and color',
      argType: 'font',
    }),
  ],
});
