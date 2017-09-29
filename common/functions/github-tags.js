import axios from 'axios';
import mem from 'mem';
import Fn from '../../../kibana-canvas/common/functions/fn.js'; // TODO: internalize this wrapper

const getTagSha = (tag, headers) => {
  return axios.get(tag.commit.url, { headers })
  .then(res => res.data)
  .then(commit => ({
    name: tag.name,
    sha: commit.sha,
    committer: commit.commit.committer.name,
    date: commit.commit.committer.date,
  }));
};

const getTagShaMemoized = mem(getTagSha, {
  cacheKey: tag => tag.commit.sha,
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
    },
    token: {
      types: ['string', null],
    },
  },
  fn(context, { repo, token, limit: tagLimit }) {
    const tagsUrl = `https://api.github.com/repos/${repo}/tags`;
    const headers = token ? { Authorization: `token ${token}` } : {};

    return axios.get(tagsUrl, { headers })
    .then(res => res.data)
    .then(tags => Promise.all(tags.slice(0, tagLimit).map(tag => getTagShaMemoized(tag, headers))))
    .then((rows) => ({
      type: 'datatable',
      columns: Object.keys(rows[0]).map(col => ({ name: col, type: 'unknown' })),
      rows,
    }))
    .catch(err => ({
      type: 'datatable',
      columns: ['error'],
      rows: [{ error: err.message }],
    }));
  }
});
