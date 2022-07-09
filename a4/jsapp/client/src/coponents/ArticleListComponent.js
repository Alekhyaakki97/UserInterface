import Article from './ArticleComponent'

const ArticleList = ({ articles, onDelete}) => (
    <ul className='list-group'>
      {articles.map(article => (
        <li key={article._id} className='list-group-item'>
            <Article article={article} onDelete={onDelete}></Article>
        </li>
      ))}
    </ul>
  );

export default ArticleList;