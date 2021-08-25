import React from 'react';
import { connect } from 'react-redux';
import { createPost, showAlert } from '../redux/actions';
import Alert from './Alert';

class PostForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
    };
  }

  submitHandler = (event) => {
    event.preventDefault();
    const { title } = this.state;

    if (!title.trim()) {
      this.props.showAlert('Post title should not be empty');
    } else {
      const newPost = {
        title,
        id: Date.now().toString(),
      };
      this.props.createPost(newPost);
      this.setState({ [event.target.name]: '' });
    }
  };

  changeInputHandler = (event) => {
    event.preventDefault();
    const newState = {
      [event.target.name]: event.target.value,
    };

    this.setState((prev) => ({
      ...prev,
      ...newState,
    }));
  };

  render() {
    const { alert } = this.props;
    return (
      <form name="title" onSubmit={this.submitHandler}>
        {alert && <Alert />}
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Post title
          </label>
          <input
            type="text"
            name="title"
            value={this.state.title}
            onChange={this.changeInputHandler}
            className="form-control"
            id="title"
          />
        </div>
        <button className="btn btn-success" name="title" type="submit">
          Add
        </button>
      </form>
    );
  }
}

const mapDispatchToProps = {
  createPost,
  showAlert,
};

const mapStateToProps = (state) => {
  return {
    alert: state.app.alert,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PostForm);
