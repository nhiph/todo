import React, { Component } from 'react';
import './App.css';
import TaskForm from './Components/TaskForm';
import Control from './Components/Control';
import TaskList from './Components/TaskList';
import { connect } from 'react-redux';
import * as actions from './actions';

class App extends Component {

  onGenerateData = () => {
    var tasks = [
      { id: this.generateID(),
        name:'Hoc lap trinh Angular',
        status: true
      },
      { id: this.generateID(),
        name:'Di boi',
        status: false
      },
      { id: this.generateID(),
        name:'Di ngu',
        status: true
      },  
    ];
    this.setState({
       tasks: tasks});
  //  Phan nay neu setState nhu vay khong luu tren localStorage hoac serve khi F5 render thi se mat data da tao => luu tren localStorage
  localStorage.setItem('tasks',JSON.stringify(tasks));
  }
  // JSON.stringify(tasks) nham luu tru tasks dang object thanh chuoi, khi lay ra su dung chuyen ve object bang parse


  onClearTask = () => {
    this.props.onClearTask();
    this.props.onOpenForm();
  }

  render() {
    var { isDisplayForm } = this.props;
  
  return (
    <div className="container">
        <div className="text-center">
          <h1>Quản Lý Công Việc</h1>
          <hr />
        </div>
        <div className="row">
          <div className={isDisplayForm === true ? 'col-xs-4 col-sm-4 col-md-4 col-lg-4': ''}>
          <TaskForm />
          </div>
          <div className={isDisplayForm === true ? 'col-xs-8 col-sm-8 col-md-8 col-lg-8' : 'col-xs-12 col-sm-12 col-md-12 col-lg-12'}>
            <button 
              type="button" 
              className="btn btn-primary mb-4 mr-4"
              onClick={this.onClearTask}
            >
              <span className="fa fa-plus mr-5" />Thêm Công Việc
            </button>

            <button 
              type="button" 
              className="btn btn-primary mb-4"
              onClick={this.onGenerateData}>
              <span className="fa fa-plus mr-5" />Generate Data
            </button>
            <Control/>
            <div className="row mt-15">
              <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                <TaskList />
              </div>
            </div>
          </div>
        </div>
      </div>
  );
}
}
const mapStateToProps = state => {
  return {
    isDisplayForm : state.isDisplayForm
  };
}
const mapDispatchToProps = (dispatch, props) => {
  return {
    onOpenForm : () => {
      dispatch(actions.openForm());
    },
    onClearTask : () => {
      dispatch(actions.clearTask());
    },
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(App);

 

