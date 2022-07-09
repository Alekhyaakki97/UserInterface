import {api_delete} from '../main';
const ArticleComponent = ({ article, onDelete }) => {
  const deleteHandler = (id) => {
      api_delete(`/articles/${id}`)
        .then(() => {
            onDelete(id);
        })
        .catch((error) => {
          alert('Failed to delete artilce');
          console.error(error);
        });
    
  };
  return (
    <div className="article">
      <h6>{article.heading}</h6>
      <p>{article.content}</p>
      <button
        className="btn btn-danger"
        role="button"
        onClick={() => deleteHandler(article._id)}
      >
        Delete
      </button>
    </div>
  );
};

export default ArticleComponent;
