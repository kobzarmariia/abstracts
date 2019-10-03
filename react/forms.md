# Forms

## Managed components

If the form is processed using a JavaScript function that has access to the entered data, this is called “managed components”. 

So, the source of the value for the name input field is the this.state.name object.

To track changes in the input field, we need to define a handler for the change event using the onChange attribute. 
This handler will fire every time you press a keyboard key. 
If we do not define a similar handler for the field, then this input field will be read-only.

```
class NameForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value}); //Attention
  }

  handleSubmit(event) {
    alert('Name: ' + this.state.value);
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Имя:
          <input type="text" value={this.state.value} onChange={this.handleChange} /> //
        </label>
        <input type="submit" value="Sent" />
      </form>
    );
  }
}
```

### Filter example 

```
<input placeholder="Поиск" onChange={this.filterList} />
     <ul>
        {
          this.state.items.map(function(item){
             return <Item key={item} name={item} />
          })
        }
     </ul>


    filterList(e){
        var filteredList = this.props.data.items.filter(function(item){
            return item.toLowerCase().search(e.target.value.toLowerCase())!== -1;
        });
        // обновление состояния
        this.setState({items: filteredList});
    }
```
