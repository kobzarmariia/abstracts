import React from 'react';
import Article from '../Article';

export default function ArticleList({ articles }) {
    const articleElements = articles.map([article, index] => 
        <li key={article.id} className="arrticle-list_li">
            <Article article = {article} defaulOpen = {index === 0}/>
        </li>
    )
    return (
        <ul>
            {articleElements}
        </ul>
    )
}



