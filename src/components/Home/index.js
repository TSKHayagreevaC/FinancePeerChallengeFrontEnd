import { Component } from "react";
import React from "react";
import { ImCross } from "react-icons/im";
import Popup from "reactjs-popup";

import ListItem from "../ListItem";

import "./index.css";

const apiConstants = {
  initial: "INITIAL",
  success: "SUCCESS",
  failure: "FAILURE",
  inProgress: "IN_PROGRESS",
};

class Home extends Component {
  state = {
    apiStatus: apiConstants.initial,
    entriesList: [],
    id: "",
    userId: "",
    newTitle: "",
    newBody: "",
  };

  componentDidMount() {
    this.getEntriesData();
  }

  getEntriesData = async () => {
    this.setState({ apiStatus: apiConstants.inProgress });
    const apiUrl = "http://localhost:3001/entriesData";
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application / json",
      },
    };
    const entriesListResponse = await fetch(apiUrl, options);
    if (entriesListResponse.ok) {
      const entriesListJson = await entriesListResponse.json();
      this.setState({
        entriesList: JSON.parse(entriesListJson.entriesData),
        apiStatus: apiConstants.success,
      });
    } else {
      this.setState({ apiStatus: apiConstants.failure });
    }
  };

  onSubmitAddNewEntryForm = (event) => {
    event.preventDefault();
    const { entriesList, newTitle, newBody } = this.state;
    const entriesListLength = entriesList.length;
    const newItemUserId = entriesList[entriesListLength - 1].userId + 1;
    const newEntry = {
      id: entriesListLength + 1,
      userId: newItemUserId,
      title: newTitle,
      body: newBody,
    };
    const newEntriesList = [...entriesList, newEntry];
    this.setState({ entriesList: newEntriesList });
    alert(`New Entry With The Name: ${newTitle} Is Added To The List`);
  };

  onChangeBody = (event) => {
    this.setState({ newBody: event.target.value });
  };

  onChangeTitle = (event) => {
    this.setState({ newTitle: event.target.value });
  };

  addNewEntryForm = () => {
    return (
      <>
        <h1 className="app-heading">FinancePeer</h1>
        <form
          className="add-entry-form"
          onSubmit={this.onSubmitAddNewEntryForm}
        >
          <label className="add-entry-form-label" htmlFor="addTitle">
            TITLE
          </label>
          <input
            className="add-entry-form-input"
            id="addTitle"
            onChange={this.onChangeTitle}
          />
          <label className="add-entry-form-label" htmlFor="addBody">
            BODY
          </label>
          <input
            className="add-entry-form-input"
            id="addBody"
            onChange={this.onChangeBody}
          />
          <button className="add-entry-form-submit-button" type="submit">
            Add Entry
          </button>
        </form>
      </>
    );
  };

  updateEntriesList = (newEntry) => {
    const { entriesList } = this.state;
    const updatedEntriesList = entriesList;
    const currentEntry = entriesList.find(
      (eachItem) => eachItem.id === newEntry.id
    );
    const indexOfEntry = entriesList.findIndex(
      (eachItem) => eachItem.id === newEntry.id
    );
    updatedEntriesList.splice(indexOfEntry, 1, newEntry);
    this.setState({ entriesList: updatedEntriesList });
    alert(
      `Entry With The Name: "${currentEntry.title}" Is Successfully Updated`
    );
  };

  renderEntriesList = () => {
    const { entriesList } = this.state;
    return (
      <div className="home-bg-container">
        <Popup
          className="popup-content"
          trigger={
            <button className="display-add-form-button">Add New Entry</button>
          }
          modal
        >
          {(close) => (
            <div className="popup-content-container">
              <button
                className="popup-close-button"
                type="button"
                onClick={close}
              >
                <ImCross color="#ffffff" size="30px" />
              </button>
              {this.addNewEntryForm()}
            </div>
          )}
        </Popup>
        <ul className="home-entries-list">
          {entriesList.map((eachItem) => (
            <ListItem
              key={eachItem.id}
              eachEntry={eachItem}
              updateEntriesList={this.updateEntriesList}
            />
          ))}
        </ul>
      </div>
    );
  };

  render() {
    return <div className>{this.renderEntriesList()}</div>;
  }
}

export default Home;
