import Fn from '../../../kibana-canvas/common/functions/fn.js'; // TODO: internalize this wrapper

export default new Fn({
  name: 'timeline',
  type: 'render',
  context: {
    types: [
      'datatable',
    ],
  },
  help: 'A simple timeline visualization.',
  args: {
    name: {
      types: ['string'],
      help: 'The field to map to the name',
    },
    start: {
      types: ['string', null],
      help: 'The field to use for the start time',
    },
    end: {
      types: ['string', null],
      help: 'The field to use for the end time',
    },
    font: {
      types: ['style'],
      help: 'Legend and tick mark fonts',
      default: '{font}',
    },
  },
  fn(context, args) {
    return {
      type: 'render',
      as: 'timeline',
      value: {
        options: {},
        data: context.rows.map((row, i) => ({
          id: i,
          content: row[args.name],
          start: row[args.start],
          end: row[args.end],
          style: args.font.css,
        })),
      },
    };
  },
});
