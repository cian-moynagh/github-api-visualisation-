import React, { Component } from 'react';
import axios from 'axios';
import Form from './components/Form.jsx';
import { Alert, Container } from 'react-bootstrap';
import SortedList from './components/SortedList.jsx';
import ProfileDetails from './components/ProfileDetails.jsx';
import LanguageList from './components/LanguageList.jsx';
import lda from './lda';
import "./css/App.css";

class App extends Component {
  constructor() {
    super();
    this.state = {
      gitun: 'No username',
      infoclean : '',
      info: '',
      formData: {
        username: '',
      },
      repitems: null,
      staritems: null,
      replanguagecount: {},
      keywords: null
 }
    this.handleUserFormSubmit = this.handleUserFormSubmit.bind(this);
    this.handleFormChange= this.handleFormChange.bind(this);
  }
handleUserFormSubmit(event) {
        event.preventDefault();
        axios.get('https://api.github.com/users/' + this.state.formData.username)
            .then(response => this.setState({
                gitun: response.data.login,
                infoclean: response.data,
                info: JSON.stringify(response.data, undefined, 2)
            })).catch((err) => { console.log(err); }); axios.get('https://api.github.com/users/' + this.state.formData.username + '/repos')
                .then(response => {
                    var itemsWithFalseForks = response.data.filter(item => item.fork === false);
                    var sortedItems = itemsWithFalseForks.sort((b, a) => {
                        if ((a.watchers_count + a.forks_count) < (b.forks_count + b.watchers_count)) {
                            return -1
                        } else if ((a.watchers_count + a.forks_count) > (b.forks_count + b.watchers_count)) {
                            return 1
                        } else {
                            return 0
                        }
                    });
                    let dictrlc = Object.assign({}, this.state.replanguagecount);
                    for (var i = 0; i < itemsWithFalseForks.length; i++) {
                        dictrlc[itemsWithFalseForks[i]['language']] = -~dictrlc[itemsWithFalseForks[i]['language']]
                    } this.setState({
                        repitems: sortedItems.slice(0, 10),
                        replanguagecount: dictrlc,
                    })
                }).catch((err) => { console.log(err); });
        axios.get('https://api.github.com/users/' + this.state.formData.username + '/starred')
            .then(response => {
                var itemsWithFalseForks = response.data.filter(item => item.fork === false);
                var sortedItems = itemsWithFalseForks.sort((b, a) => {
                    if ((a.watchers_count + a.forks_count) < (b.forks_count + b.watchers_count)) {
                        return -1
                    } else if ((a.watchers_count + a.forks_count) > (b.forks_count + b.watchers_count)) {
                        return 1
                    } else {
                        return 0
                    }
                });
                var documents = []
                for (var i = 0; i < response.data.length; i++) {
                    var descr = response.data[i]['description']
                    if (descr != null) {
                        var newtext = descr.match(/[^.!?]+[.!?]+/g)
                        if (newtext != null) {
                            documents = documents.concat(newtext)
                        }
                    }
                }
                var result = lda(documents, 3, 3);
                var keywords = new Set()
                for (var k = 0; k < 3; k++) {
                    for (var j = 0; j < 3; j++) {
                        keywords = keywords.add(result[k][j]['term']);
                    }
                } this.setState({
                    staritems: sortedItems.slice(0, 10),
                    keywords: Array.from(keywords).join(', ')
                })
            }).catch((err) => { console.log(err); })
    }; handleFormChange(event) {
        const obj = this.state.formData;
        obj[event.target.name] = event.target.value;
        this.setState(obj);
  };
render() {
        return (
            <div className="App">
                <header className="App-header">
                    <div class="slide-in-blurred-top">
                        <h1 style={{ color: "rgb(30, 203, 37)" }}>GitHub API Interogator</h1>
                    </div>
                </header>
                <body>
                    <div className="Headings">
                        <div class="slide-in-blurred-top">
 


                            <p style={{ color: "rgb(30, 203, 37)" }} className="App-intro">
                                search github user to fetch and visualise their data
        </p>                </div>
                        <div class="slide-in-blurred-top">
                            <Form
                                formData={this.state.formData}
                                handleUserFormSubmit={this.handleUserFormSubmit}
                                handleFormChange={this.handleFormChange}
                            />
                        </div>
                        <hr></hr>
                        <div class="slide-in-blurred-top">
                            <p style={{ color: "rgb(30, 203, 37)" }}><b> Profile Details: </b></p>

                            <ProfileDetails infoclean={this.state.infoclean} />
                            <hr></hr>
                            <p style={{ color: "rgb(30, 203, 37)" }}> <b> Personal Language Split:</b></p>
                            <div className = "LangList">
                                <LanguageList langslist={this.state.replanguagecount} />
                                </div>
                            <hr></hr>
                            <p><b> Stars of this User's Repositories:</b></p>
                            <SortedList repitems={this.state.repitems} />
                            <hr></hr>
                            <p> <b> Starred Repositories:</b></p>
                            <SortedList repitems={this.state.staritems} />
                            <hr></hr>

                            <p> <b> Keywords: </b> </p> {this.state.keywords}
                            <hr></hr>
                        </div>
                    </div>
                </body>
            </div>

        );
    }
} export default App;