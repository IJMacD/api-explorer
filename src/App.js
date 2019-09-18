import React from 'react';
import './App.css';
import { saveState, restoreState } from './saveState';
import ResponseBody from './ResponseBody';

const STORAGE_KEY = "api-explorer-saved-state";

/**
 * @typedef QueryRecord
 * @prop {string} endpoint
 * @prop {string} method
 * @prop {number} status
 * @prop {[string,string][]} headers
 * @prop {string} body
 */

class App extends React.Component {
  constructor (props) {
    super(props);

    this.state = restoreState(STORAGE_KEY, {
      apiRoot: "",
      endpoint: "",
      method: "GET",
      /** @type {QueryRecord[]} */
      history: [],
      loading: false,
      selectedIndex: -1,
    });
  }

  async sendQuery () {
    const { endpoint, method } = this.state;
    const url = this.state.apiRoot + endpoint;

    this.setState({ loading: true });
    const r = await fetch(url);
    const body = await r.text();

    this.setState({
      loading: false,
      history: [ {
        endpoint,
        method,
        status: r.status,
        headers: [...r.headers],
        body
      }, ...this.state.history ],
      selectedIndex: 0,
    });
  }

  setSelected (index) {
    if (index >= 0 && index < this.state.history.length) {
      const item = this.state.history[index];
      this.setState({
        selectedIndex: index,
        endpoint: item.endpoint,
        method: item.method,
      });
    }
  }

  componentDidUpdate () {
    saveState(STORAGE_KEY, this.state);
  }

  render () {
    const { history, selectedIndex } = this.state;
    const selected = selectedIndex >= 0 && selectedIndex < history.length ? history[selectedIndex] : null;

    return (
      <div className="App">
        <label>
            API Root { ' ' }
            <input className="App-apiroot" value={this.state.apiRoot} onChange={e=>this.setState({ apiRoot: e.target.value })} placeholder="http://" />
          </label>
        <div className="App-panels">
          <div className="App-History">
            <h2>History</h2>
            <ul className="App-HistoryList">
              {
                this.state.history.map((h,i) => {
                  return <li key={i} className={selectedIndex === i ? "selected" : ""} onClick={()=>this.setSelected(i)}>
                    <span className="badge badge-get">{h.method}</span>
                    <span className="App-HistoryList-endpoint">/{h.endpoint}</span>
                    <span className="App-HistoryList-status">{h.status}</span>
                  </li>
                })
              }
            </ul>
          </div>
          <div className="App-Request">
            <h2>Request</h2>
            <form className="App-Request-url" onSubmit={e=>{this.sendQuery(); e.preventDefault()}}>
              <select disabled={this.state.loading} value={this.state.method} onChange={e=>this.setState({ method: e.target.value })}>
                <option>GET</option>
                <option>POST</option>
                <option>PUT</option>
                <option>DELETE</option>
                <option>OPTION</option>
              </select>
              <input disabled={this.state.loading} value={this.state.endpoint} onChange={e=>this.setState({ endpoint: e.target.value })} placeholder="endpoint" />
              <button disabled={this.state.loading}>Send</button>
            </form>
          </div>
          <div className="App-Response">
            <h2>Response</h2>
            <code className="App-Response-Headers">
              {
                selected && [...selected.headers].map(([key, value]) => `${key}: ${value}`).join("\n")
              }
            </code>
            <div className="App-Response-body" style={{ backgroundColor: this.state.loading ? "#CCC" : "" }}>
              <ResponseBody response={selected} onDrillDown={id => this.setState({ endpoint: `${this.state.endpoint}/${id}` }, () => this.sendQuery())} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
