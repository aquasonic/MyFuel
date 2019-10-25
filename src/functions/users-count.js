import faunadb from 'faunadb';

const q = faunadb.query;
const client = new faunadb.Client({
  secret: process.env.FAUNADB_SECRET
});

exports.handler = (event, context, callback) => {
  return client
    .query(q.Paginate(q.Match(q.Ref(`indexes/all_users`))))
    .then(response => {
      return callback(null, {
        statusCode: 200,
        body: JSON.stringify(response.data.length)
      });
    })
    .catch(error => {
      return callback(null, {
        statusCode: 400,
        body: JSON.stringify(error)
      });
    });
};
