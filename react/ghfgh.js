import React, {Component} from 'react';

class Article extends Component {
    state = {
        isOpen: true
    }

    render() {
        const {article} = this.props;
        const body = this.state.isOpen && <section>{article.text}</section>;
            return (
                <div>
                    <h2>
                        {article.title}
                        <button onClick={handleClick}>
                            {this.state.isOpen ? 'close' : 'open'}
                        </button>
                    </h2>
                    {body}
                    <h3>Creation date: {(new Date()).toDateString()}</h3>
                </div>
            );
    }

    handleClick = () => {
        this.setState({
            isOpen: !this.stat.isOpen
        });
    }
}

export default Article;

