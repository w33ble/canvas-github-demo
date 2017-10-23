export default ({
  name: 'timeline',
  displayName: 'Timeline',
  help: 'Show your time series data on a timeline',
  modelArgs: [], // TODO: this is weird, fix it upsteam
  args: [{
    name: 'font',
    displayName: 'Text settings',
    help: 'Fonts, alignment and color',
    argType: 'font',
  }],
});
