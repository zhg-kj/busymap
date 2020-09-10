import React, {Component} from 'react';

import './searchbar.css'

class SearchBar extends Component {
  constructor (props) {
    super(props)
    this.state = {
      keyWord: ''
    }
  }

  handleSearch = (e) => {
    this.setState({ keyWord: e.target.value })
  }

  handleClick = () => {
    this.props.onSearch(this.state.keyWord);
  }

  handleReset = () => {
    this.props.onReset();
  }

  enterPressed = (event) => {
    var code = event.keyCode || event.which;
    if(code === 13) { 
      //13 is the enter keycode
      this.props.onSearch(this.state.keyWord);
    } 
  }

  render() {
    return(
      <div className='searchWrapper'>
        <input className='input' type='text' spellcheck='false' placeholder='Enter a keyword: ie. Costco' onChange={this.handleSearch} value={this.state.keyWord} onKeyPress={this.enterPressed}/>
        <div className='sbuttonWrapper'>
          <button className='sbutton' onClick={this.handleClick}>Search</button>|<button className='sbutton' onClick={this.handleReset}>Reset</button>
        </div>
      </div>
    )
  }
}

export default SearchBar;