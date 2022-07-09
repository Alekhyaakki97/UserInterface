import { useState } from 'react';

const CreateArticle = ({ onCreate }) => {
  const [article, updateArticle] = useState({
    heading: '',
    content: '',
  });
  const { heading, content } = article;
  const onChange = (e) =>
    updateArticle({ ...article, [e.target.name]: e.target.value });

  return (
    <>
      <div className="add-article">
      <h5>Add Article</h5>
        <form>
          <div className="form-outline mb-4">
          <label className="form-label" htmlFor="heading">
              Heading
            </label>
            <input
              type="text"
              id="heading"
              name="heading"
              value={heading}
              className="form-control"
              onChange={onChange}
            />
           
          </div>

          <div className="form-outline mb-4">
          <label className="form-label" htmlFor="content">
              Body
            </label>
            <input
              id="content"
              name="content"
              value={content}
              className="form-control"
              onChange={onChange}
            />
           
          </div>

          <button
            type="button"
            onClick={() => onCreate(article)}
            className="btn btn-primary btn-block mb-4"
          >
            Add Article
          </button>
        </form>
      </div>
    </>
  );
};

export default CreateArticle;
