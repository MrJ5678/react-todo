import React, { Component } from "react"

let tmpTask
export default class TaskItem extends Component {
  constructor(props) {
    super(props)
    this.state = {
      task: this.props.taskItem.task,
      isEditing: false,
    }
  }
  setEditingState = isEditing => {
    this.setState({ isEditing: isEditing })
  }
  toggleTask = () => {
    this.props.toggleTask(this.props.id)
  }
  deleteTask = () => {
    this.props.deleteTask(this.props.id)
  }
  handleChange = event => {
    tmpTask = this.state.task
    this.setState({ task: event.target.value })
  }
  handleSubmit = event => {
    if (event.target.value.trim() === "") {
      alert("can not be empty")
      this.setState({ task: tmpTask })
      return false
    }
    event.preventDefault()
    this.props.editTask(this.props.id, this.state.task)
    this.setState({ isEditing: false })
  }
  render() {
    return (
      <tr>
        {this.state.isEditing ? (
          <>
            <td>
              <form onSubmit={this.handleSubmit}>
                <input
                  type="text"
                  value={this.state.task}
                  onChange={this.handleChange}
                  autoFocus
                />
              </form>
            </td>
            <td>
              <button
                className="save"
                onClick={this.handleSubmit}
                type="submit"
              >
                Save
              </button>
              <button
                className="back"
                onClick={() => this.setEditingState(false)}
                type="button"
              >
                Back
              </button>
            </td>
          </>
        ) : (
          <>
            <td className="task" onClick={this.toggleTask}>
              <input
                type="checkbox"
                readOnly
                checked={this.props.taskItem.isCompleted}
              />
              <span
                className={
                  this.props.taskItem.isCompleted
                    ? "completed"
                    : "not-completed"
                }
              >
                {this.props.taskItem.task}
              </span>
            </td>
            <td>
              <button
                className="edit"
                onClick={() => this.setEditingState(true)}
              >
                Edit
              </button>
              <button className="delete" onClick={this.deleteTask}>
                Delete
              </button>
            </td>
          </>
        )}
      </tr>
    )
  }
}
