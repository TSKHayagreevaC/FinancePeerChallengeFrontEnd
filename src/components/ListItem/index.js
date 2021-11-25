import { Component } from "react";
import React from "react";
import { ImCross } from "react-icons/im";
import Popup from "reactjs-popup";

import "./index.css";

class ListItem extends Component {
  state = {
    title: "",
    body: "",
  };

  onSubmitUpdateForm = (event) => {
    event.preventDefault();
    const { eachEntry, updateEntriesList } = this.props;
    const { title, body } = this.state;
    const updatedEntry = {
      id: eachEntry.id,
      userId: eachEntry.userId,
      title: title,
      body: body,
    };
    updateEntriesList(updatedEntry);
  };

  onChangeBody = (event) => {
    this.setState({ body: event.target.value });
  };

  onChangeTitle = (event) => {
    this.setState({ title: event.target.value });
  };

  updateEntryForm = () => {
    return (
      <form className="update-entry-form" onSubmit={this.onSubmitUpdateForm}>
        <label className="update-entry-form-label" htmlFor="updateTitle">
          TITLE
        </label>
        <input
          className="update-entry-form-input"
          id="updateTitle"
          onChange={this.onChangeTitle}
        />
        <label className="update-entry-form-label" htmlFor="updateBody">
          BODY
        </label>
        <input
          className="update-entry-form-input"
          id="updateBody"
          onChange={this.onChangeBody}
        />
        <button className="update-entry-form-submit-button" type="submit">
          Update Entry
        </button>
      </form>
    );
  };

  render() {
    const eachEntry = this.props;
    return (
      <li>
        <div className="each-entry-top-container">
          <h1 className="each-entry-title">{eachEntry.eachEntry.title}</h1>
          <Popup
            className="popup-content"
            trigger={
              <button className="display-update-form-button">Update</button>
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
                {this.updateEntryForm()}
              </div>
            )}
          </Popup>
        </div>
        <p className="each-entry-body">{eachEntry.eachEntry.body}</p>
        <hr className="each-entry-hr-line" />
      </li>
    );
  }
}

export default ListItem;
