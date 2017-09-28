import axios from 'axios';
import mem from 'mem';
import Fn from '../../../kibana-canvas/common/functions/fn.js'; // TODO: internalize this wrapper

const getTagSha = (tag) => {
  return axios.get(tag.commit.url)
  .then(res => res.data)
  .then(commit => ({
    name: tag.name,
    sha: commit.sha,
    date: commit.commit.committer.date,
  }));
};

const getTagShaMemoized = mem(getTagSha, {
  cacheKey: tag => tag.commit.sha
});

export default new Fn({
  name: 'github-tags',
  type: 'datatable',
  help: 'Talk directly to the Github API and get back tabular data.',
  args: {
    repo: {
      types: ['string'],
      default: 'w33ble/joefleming-net',
    },
    limit: {
      types: ['number', null],
      default: 10,
    }
  },
  fn(context, args) {
    const tagsUrl = `https://api.github.com/repos/${args.repo}/tags`;
    const tagLimit = args.limit;

    return axios.get(tagsUrl)
    .then(res => res.data)
    .then(tags => Promise.all(tags.slice(0, tagLimit).map(getTagShaMemoized)))
    .then((rows) => ({
      type: 'datatable',
      columns: Object.keys(rows[0]),
      rows,
    }))
    .catch(err => ({
      type: 'datatable',
      columns: ['error'],
      rows: [{ error: err.message }],
    }));
  }
});
