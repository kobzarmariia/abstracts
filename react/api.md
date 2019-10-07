# React work with API

```
const BASE_PATH = 'htttp://hh.algolia.com/api/v1';
const SEARCH_PATH = '/search';
const SEARCH_PARAM = 'query=';
const PAGE_HITS = 'hitsPerPage='; //our API give us hitsPerPage
const PAGE_PARAM = 'page=';

const HITS = [ //options for select
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
    hitsPerPage: 20, //default
    page: 0 //numerion from 0
  }

  componentDidMount() {
     const { searchQuery, hitsPerPage, page } = this.state;
     fetchData(searchQuery, hitsPerPage, page);
  }

  fetchData = (searchQuery, hitsPerPage, page) => {
     fetch(`${BASE_PATH}${SEARCH_PATH}?${SEARCH_PARAM}${searchQuery}${PAGE_HITS }${hitsPerPage}&${PAGE_PARAM}`)
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
      this.fetchData(searchQuery, hitsPerPage, 0);
    }
  }

  setNews = result => {
    this.setState({ result });
  }

  handleHitsChange = ({ target: { value } }) => { // take option from select and updates (from API) list
     const { constQuery } = this.state;

     this.setState({
       hitsPerPage: +value, // + -> string to value
       page: 0
     }, () => {
        this.fetchData (searchQuery, this.state.hitsPerPage, 0)
     })
  }

  handlePageChange = ({ target }) => { //data-attr
    const btnType = target.getAttribute('data-name');
    let { page } = this.state;

    switch (btnType) {
      case 'next':
        this.updatePage(page + 1);
        break;
      case 'prev':
        this.updatePage(page - 1);
        break;
      default: null;
    }
  }

  updatePage = (number) => {
    const { searchQuery, hitsPerPage } = this.state;
    this.setState({
      page: number,
    }, () => {
      this.fetchData(searchQuery, hitsPerPage, number);
    })
  }

  render() {
    const { searchQuery, result, hitsPerPage } = this.state;
    const { hits = [] } = result;

    return(
      <div className="wrapper">
        <Title title="Hacker news">
        <Select options={HITS} handleChange={this.handleHitsChange} value={hitsPerPage} />
        <Pagination
          onClick={this.handlePageChange}
          page={page}
          lastPage={nbPages}
        >
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

Pagination component

```
const Pagination = ({ onClick, page, lastPage }) => (
  <div className="paginationWrapper">
    { page !== 0 && <button onClick={onClick} data-name="prev">{'<<'}</button> }
    { page !== lastPage - 1 && <button onClick={onClick} data-name="next">{'>>'}</button> }
  </div>
);

Pagination.propTypes = {
  onClick: PropTypes.func,
  page: PropTypes.number,
  lastPage: PropTypes.number,
}

Pagination.defaultProps = {
  onClick: () => {},
  page: 0,
  lastPage: 0,
}

```
