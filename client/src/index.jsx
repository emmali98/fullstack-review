import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Search from './components/Search.jsx';
import RepoList from './components/RepoList.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      repos: []
    }
  }

  search (term) {
    console.log(`${term} was searched`);
    $.post('http://127.0.0.1:1128/repos', { term })
    .done((data) => {
      console.log('Search successful!', data);
      this.updateList();
    })
    .fail(() => {
      console.log('Error: search failed');
    });
  }

  updateList () {
    $.get('http://127.0.0.1:1128/repos')
    .done((data) => {
      console.log('rerendering...');
      this.setState({
        repos: data
      });
      console.log('done rendering ', data);
    })
  }

  render () {
    return (<div>
      <h1>Github Fetcher</h1>
      <RepoList repos={this.state.repos}/>
      <Search onSearch={this.search.bind(this)}/>
    </div>)
  }

  componentDidMount() {
    this.updateList()
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
