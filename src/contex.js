import React, { Component } from "react";
import axios from "axios";

const Context = React.createContext();

// manipulator with the state
// using action {type: ....    , payload - paramener like a id or other}
const reducer = (state, action) => {
  switch (action.type) {
    case "DELETE_CONTACT":
      return {
        ...state,
        contacts: state.contacts.filter(
          contact => contact.id !== action.payload
        )
      };
    case "ADD_CONTACT":
      return {
        ...state,
        contacts: [action.payload, ...state.contacts]
      };
    default:
      return state;
  }
};

// main tag for all the body of the page - to share the glogal state for all nested components
export class Provider extends Component {
  state = {
    contacts: [],
    dispatch: action => this.setState(state => reducer(state, action))
  };

  async componentDidMount() {
    const res = await axios.get("https://jsonplaceholder.typicode.com/users");
    this.setState({ contacts: res.data });
  }

  render() {
    return (
      <Context.Provider value={this.state}>
        {this.props.children}
      </Context.Provider>
    );
  }
}

// Consumers of the global state - is the special componenet which incapsulates components and give them access to the gloabal state
export const Consumer = Context.Consumer;
