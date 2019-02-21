function timestampToDate(timestamp) {
  return new Date(timestamp);
}

// Array of Objects
function formatArticles(articles) {
  return articles.map(({ created_at, ...remainingArticle }) => (
    { created_at: timestampToDate(created_at), ...remainingArticle }
  ));
}

function getArticleIDforComment(comment, returnedArticles) {
  const foundArticle = returnedArticles.find(article => comment.belongs_to === article.title);
  return foundArticle.article_id;
}

// articleRows from returning('*')
function formatComments(comments, articleRows) {
  return comments.map(comment => ({ // make new object
    author: comment.created_by, // renamed
    article_id: getArticleIDforComment(comment, articleRows), // lookup
    votes: comment.votes, // same
    created_at: timestampToDate(comment.created_at), // convert date
    body: comment.body, // same
  }));
}

module.exports = { formatArticles, formatComments };
