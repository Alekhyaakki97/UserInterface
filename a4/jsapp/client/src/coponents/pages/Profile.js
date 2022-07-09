import { fetchData } from '../../main';
import { useEffect, useState } from 'react';
import ArticleList from '../ArticleListComponent';
import CreateArticle from '../CreateArticleComponent';

function Profile() {
  const [articles, updateArticles] = useState([]);
  const currentuser = JSON.parse(sessionStorage.currentuser);
  const onDeleteArticle = (id) => {
    updateArticles((articlesList) => articlesList.filter((articleData) => articleData._id !== id))
  }
  const addArticle = (article) => {
    fetchData(
      '/articles',
      { heading: article.heading, content: article.content, author: currentuser._id },
      'POST'
    )
      .then((newArticle) => {
        updateArticles((prevData) => [...prevData, newArticle]);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const fetchArticles = () => {
    fetchData(`/users/${currentuser._id}/articles`, {}, 'GET')
      .then((articles) => {
        console.log(articles)
        updateArticles(articles);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    fetchArticles();
  }, []);
  return (
    <div className="profile">
      <div className="mt-4">Hello {currentuser.username} </div>
      <h5>Articles</h5>
      <ArticleList articles={articles} onDelete={onDeleteArticle}></ArticleList>
      <CreateArticle onCreate={addArticle}></CreateArticle>

    </div>
  );
}

export default Profile;
