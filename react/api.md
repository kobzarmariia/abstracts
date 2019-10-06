# React work with API

```
const BASE_PATH = 'htttp://hh.algolia.com/api/v1';
const SEARCH_PATH = '/search';
const SEARCH_PARAM = 'query=';
const PAGE_HITS = 'hitsPerPage=';

const HITS = [
  {
    value: 10,
    label: 10
  },
  {
    value: 20,
    label: 20
  }
]

class News extends Component {

  state = {
    searchQuery: '',
    result: {},
    hitsPerPage: 20
  }

  componentDidMount() {
     const { searchQuery, hitsPerPage } = this.state;
     fetchData(searchQuery, hitsPerPage);
  }

  fetchData = (searchQuery, hitsPerPage) => {
     fetch(`${BASE_PATH}${SEARCH_PATH}?${SEARCH_PARAM}${searchQuery}${PAGE_HITS }${hitsPerPage}`)
     .then(res => res.json())
     .then(result =>  this.setNews(Result))
     .catch(error => error);
  }

  handleInputChange = ({ target: { value } }) => {
    this.setState({
      searchQuery: value,
    })
  }

  getSearch = ({key}) => { //search in API
    if(key ===  'Enter') {
      const { searchQuery, hitsPerPage } = this.state;
      this.fetchData(searchQuery, hitsPerPage );
    }
  }

  setNews = result => {
    this.setState({ result });
  }

  handleHitsChange = ({ target: { value } }) => {
     const { constQuery } = this.state;

     this.setState({
       hitsPerPage: +value,
     }, () => {
        this.fetchData (searchQuery, this.state.hitsPerPage)
     })
  }

  render() {
    const { searchQuery,result  } = this.state;
    const { hits = [] } = result;

    return(
      <div className="wrapper">
        <Title title="Hacker news">
        <Select options={HITS} handleChange={this.handleHitsChange} value={hitsPerPage} / >
        <Input onKeyPress={this.getSearch} onChange={this.handleInputChange} value={searchValue } />
        <ul>
          {hits.map(({author, created_at, num_comments, objectID, title, points, url }) =>
          <NewsPost
            key={objectID}
            author={author}
            created_at...
          />
          )}
        </ul>
      </div>
    )
  }
}
```
