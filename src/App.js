import React from 'react';
import './App.css';

/**
 * @typedef QueryRecord
 * @prop {string} endpoint
 * @prop {number} status
 * @prop {Headers} headers
 * @prop {string} body
 */

class App extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      apiRoot: "https://www.i-learner.edu.hk/api/v1/",
      endpoint: "",
      /** @type {QueryRecord[]} */
      history: [],
      loading: false,
      selectedIndex: -1,
    };
  }

  async sendQuery () {
    const { endpoint } = this.state;
    const url = this.state.apiRoot + endpoint;
    this.setState({ loading: true });
    const r = await fetch(url);
    const body = await r.text();
    this.setState({
      loading: false,
      history: [ {
        endpoint,
        status: r.status,
        headers: r.headers,
        body
      }, ...this.state.history ],
      selectedIndex: 0,
    });
  }

  render () {
    const { history, selectedIndex } = this.state;
    const selected = selectedIndex >= 0 && selectedIndex < history.length ? history[selectedIndex] : null;

    return (
      <div className="App">
        <div className="App-history">
          <label>
            API Root { ' ' }
            <input value={this.state.apiRoot} onChange={e=>this.setState({ apiRoot: e.target.value })} placeholder="http://" />
          </label>
          <ul className="App-HistoryList">
            {
              this.state.history.map((h,i) => {
                return <li key={i} className={selectedIndex === i ? "selected" : ""} onClick={()=>this.setState({ selectedIndex : i })}>
                  <span className="badge badge-get">GET</span>
                  <span className="App-HistoryList-endpoint">/{h.endpoint}</span>
                  <span className="App-HistoryList-status">{h.status}</span>
                </li>
              })
            }
          </ul>
        </div>
        <div className="App-params">
          <div className="App-url">
            <form onSubmit={e=>{this.sendQuery(); e.preventDefault()}}>
              <select>
                <option>GET</option>
                <option>POST</option>
                <option>PUT</option>
                <option>DELETE</option>
                <option>OPTION</option>
              </select>
              <input value={this.state.endpoint} onChange={e=>this.setState({ endpoint: e.target.value })} placeholder="endpoint" />
              <button>Send</button>
            </form>
          </div>
        </div>
        <div className="App-results" style={{ backgroundColor: this.state.loading ? "#CCC" : "" }}>
          <code className="App-headers">
            {
              selected && [...selected.headers].map(([key, value]) => `${key}: ${value}`).join("\n")
            }
          </code>
          <code>
            {
              selected && selected.body
            }
          </code>
        </div>
      </div>
    );
  }
}

export default App;
