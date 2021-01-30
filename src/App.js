import React, { Component } from 'react';
import './App.css';
import TaskForm from './Components/TaskForm';
import Control from './Components/Control';
import TaskList from './Components/TaskList';
import { connect } from 'react-redux';
import * as actions from './actions';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [],  //id unique, name, status
      taskEditing: null,
      filter: {
        name: '',
        status: -1
      },
      keyword: '',
      sortBy: 'name',
      sortValue: 1
    }
  }

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


  onShowForm = () => {
    this.setState({
      isDisplayForm: true
    });
  }

  // onUpdateStatus=(id)=>{
  //   var { tasks} = this.state;
  //   var index = this.findIndex(id);
  //   console.log(index);
  //   if(index!==-1){
  //     tasks[index].status= !tasks[index].status;
  //     this.setState({
  //       tasks: tasks
  //     });
  //     localStorage.setItem('tasks',JSON.stringify(tasks));
  //   }
  // }

  // findIndex = (id) =>{
  //   var { tasks} = this.state;
  //   var result = -1
  //   tasks.forEach((task,index)=>{
  //     if(task.id===id){
  //       result = index  
  //     }
  //   });
  //   return result;
  // }

  onDelete = (id)=>{
    var { tasks} = this.state;
    var index = this.findIndex(id);
    console.log(index);
    if(index!==-1){
      tasks.splice(index,1);
      this.setState({
        tasks: tasks
      });
      localStorage.setItem('tasks',JSON.stringify(tasks));
    }
    this.onCloseForm();
  }

  onUpdate=(id)=>{
    console.log(id);
    var { tasks} = this.state;
    var index = this.findIndex(id);
    var taskEditing = tasks[index]
    console.log(index);
    this.setState({
      taskEditing: taskEditing
    });
    this.onShowForm();
  }

  onFilter = (filterName, filterStatus) =>{
    console.log(filterName,'-',filterStatus);
    filterStatus = parseInt(filterStatus, 10);
    this.setState({
      filter: {
        name: filterName.toLowerCase(),
        status: filterStatus
      }
    })
  } 

  onSearch = (keyword) => {
    this.setState ({
      keyword: keyword
    })
  }

  onSort = (sortBy, sortValue) => {
    this.setState({
      sortBy: sortBy,
      sortValue: sortValue   
    });
    console.log(this.state);
  }

  render() {
    var { tasks, taskEditing, filter, keyword, sortBy, sortValue} = this.state;
    var { isDisplayForm } = this.props;
    if(filter){
      if(filter.name){
        tasks = tasks.filter((task)=>{
          return task.name.toLowerCase().indexOf(filter.name) !== -1;
        });
      }
      tasks = tasks.filter((task)=>{
        if(filter.status === -1) {
          return task;
        } else {
          return task.status === (filter.status === 1 ? true : false);
        }
        
      });
    }
    if(keyword){
      tasks = tasks.filter((task)=>{
        return task.name.toLowerCase().indexOf(keyword) !== -1;
      });
    }
    if(sortBy === 'name') {
      tasks.sort((a,b)=>{
        if(a.name > b.name) return sortValue;
        else if (a.name < b.name) return sortValue;
        else return 0
      });
    } else {
      tasks.sort((a,b)=>{
        if(a.status > b.status) return sortValue;
        else if (a.status < b.status) return sortValue;
        else return 0
      });
    }
    var elmTaskForm = isDisplayForm === true ? 
        <TaskForm 
          task={taskEditing}
        /> : '';
  return (
    <div className="container">
        <div className="text-center">
          <h1>Quản Lý Công Việc</h1>
          <hr />
        </div>
        <div className="row">
          <div className={isDisplayForm === true ? 'col-xs-4 col-sm-4 col-md-4 col-lg-4': ''}>
            { elmTaskForm }
          </div>
          <div className={isDisplayForm === true ? 'col-xs-8 col-sm-8 col-md-8 col-lg-8' : 'col-xs-12 col-sm-12 col-md-12 col-lg-12'}>
            <button 
              type="button" 
              className="btn btn-primary mb-4 mr-4"
              onClick={this.props.onToggleForm}
            >
              <span className="fa fa-plus mr-5" />Thêm Công Việc
            </button>

            <button 
              type="button" 
              className="btn btn-primary mb-4"
              onClick={this.onGenerateData}>
              <span className="fa fa-plus mr-5" />Generate Data
            </button>
            <Control            
              onSearch={ this.onSearch }
              onSort = {this.onSort}
              sortBy={sortBy}
              sortValue={sortValue}
            />
            <div className="row mt-15">
              <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                <TaskList 
                  onUpdateStatus={this.onUpdateStatus}
                  onDelete={this.onDelete}
                  onUpdate={this.onUpdate}
                  onFilter={this.onFilter}
                />
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
    onToggleForm : () => {
      dispatch(actions.toggleForm());
    },
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(App);

