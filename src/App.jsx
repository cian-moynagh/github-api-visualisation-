import React, { Component } from 'react';
import axios from 'axios';
import Form from './components/Form.jsx';
import SortedList from './components/SortedList.jsx';
import ProfileDetails from './components/ProfileDetails.jsx';
class App extends Component {
  constructor() {
    super();
    this.state = {
      gitun: 'No username',
      infoclean : '',
      formData: {
        username: '',
      },
      repitems: null,
      staritems: null,
}
    this.handleUserFormSubmit = this.handleUserFormSubmit.bind(this);
    this.handleFormChange= this.handleFormChange.bind(this);
  }
handleUserFormSubmit(event) {
    event.preventDefault();
    axios.get('https://api.github.com/users/'+this.state.formData.username)
    .then(response => this.setState({
      gitun: response.data.login,
      infoclean: response.data,
    })).catch((err) => { console.log(err); });
axios.get('https://api.github.com/users/'+this.state.formData.username+'/repos')
    .then(response => this.setState({
      repitems : response.data
      .filter(({fork}) => fork === false)
      .sort((b, a) => (a.watchers_count + a.forks_count) - (b.watchers_count + b.forks_count)).slice(0,10)
      })).catch((err) => { console.log(err); });
axios.get('https://api.github.com/users/'+this.state.formData.username+'/starred')
    .then(response => this.setState({
      staritems : response.data
      .filter(({fork}) => fork === false)
      .sort((b, a) => (a.watchers_count + a.forks_count) - (b.watchers_count + b.forks_count)).slice(0,10)
    })).catch((err) => { console.log(err); });
  };
handleFormChange(event) {
    const obj = this.state.formData;
    obj[event.target.name] = event.target.value;
    this.setState(obj);
  };
render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">GitHub API</h1>
        </header>
        <p className="App-intro">
          :)
        </p>
        <hr></hr>
        <Form
          formData={this.state.formData}
          handleUserFormSubmit={this.handleUserFormSubmit}
          handleFormChange={this.handleFormChange}
        />
        <hr></hr>
        Profile Details:
        <ProfileDetails infoclean={this.state.infoclean}/>
        <hr></hr>
        Repositories:
        <SortedList repitems={this.state.repitems}/>
        <hr></hr>
     
</div>
    );
  }
}
export default App;