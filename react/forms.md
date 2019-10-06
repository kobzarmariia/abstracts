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

Another example: (good style) + reference (ref="input") ref can be repeated in deferent component

```
import React, { Compomponent, Fragment } from 'react';

class Form extends Component {
  state ={
    inputText: '',
    textAreaText: '',
    selectText: '',
    showData: {
      name: '',
      text: '',
      position: ''
    }
  }

  //example whith refs
  handleChange = () => {
    this.setState({
      inputText: this.inputRef.current.value,
      textAreaText: this.inputRef.current.value,
      selectText: this.inputRef.current.value,
    })
  }

  /*
  handleInputChange = ({ target: {value} }) => { //e -> destructuring (pulled value) event.target.value
  console.log(this.el.value);  //call ref
    this.setState({
      inputText : value,
    })
  }

  handleTextAreaChange = ({ target: {value} }) => {
    this.setState({
      textAreaText : value,
    })
  }

    handleTextAreaChange ({ target: {value} }) => {
    this.setState({
      selectText: value,
    })
  }
  */

  handleShow = (e) => { //create state memory
    e.preventDefault();
    const { inputText, textAreaText } = this.state;
    this.setState({
      inputText: '',
      textAreaText: '',
      selectText: '',
      showData: {
        name: inputText,
        text: textAreaText,
        position: selectText
      }
    })
  }

  /*
  getRef = (node) => { this.el = node };
  */

  //new style reference
  inputRef = React.createRef();
  textAreaRef = React.createRef();
  selectRef = React.createRef();

  render() {
    const { inputText, textAreaText, selectText } = this.state;
    const { name, text, position } = showData;

    return (
      <Fragment>
      <form>
        <label>
          Name:
          <input /*ref={this.getRef}*/
            ref={this.inputRef}   //set up reference
            type="text" name="name"
            value={inputText}
            onChange={this.handleChange}/>
        </label>

        <label hmtlFor="text">Text:</label>
        <textarea ref={this.textAreaRef} id="text" value={textAreaText} onChange={this.handleChange}/>

        <select ref={this.selectRef} value={selecText} onChange={this.handleChange}>
          <option value="Back">Back</option> //beter with with map
          <option value="Front">Front</option>
        </select>

        <button onClick={this.handleShow}>Show</button>
        <h2>{name}</h2>
        <h2>{text}</h2>
        <h2>{position}</h2>
      </form>
      </Fragment>
    )
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
