import React, {Component} from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';

const GET_ALL_USER_API = 'http://192.168.31.21:8080/networld/list_of_user';
const INSERT_USER_API = 'http://192.168.31.21:8080/networld/add_user';

export class App extends Component{

  constructor(props) {
    super(props); 
    this.state = {
      data: [] 
    }
  } 

  componentDidMount() {
   fetch(GET_ALL_USER_API).then(response =>{
    return response.json()
  }).then(response => {
   this.setState({ data: response });
 }).catch(error => {console.log(error); }); 
} 

render() {

  const data  = this.state.data.map(response =>{ 
    return {
      id: response.userId,
      name: response.userName,
      email: response.userEmail,
      note: response.userNote
    }
  })

  const columns = [{
   Header: 'User ID',
   accessor: 'id'
 },{
  Header: 'User Name',
  accessor: 'name'
}, {
  Header: 'User Email',
  accessor: 'email',
}, {
 Header: 'User Note',
 accessor: 'note'
}]

this.handleChange = (e) =>{
  this.setState({ name: e.target.value });
}

this.onSubmit = (e) =>{
  e.preventDefault();

  fetch(INSERT_USER_API, {
  method: 'POST',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    userName:this.state.name,
    userEmail:this.state.email,
    userNote:this.state.note,
    userPassword:this.state.pass
  })
})

}

return (
  <div>
  <center>
  <form>
  <label>Name:<input type="text" name="name" onChange={ this.handleChange } /></label>
  <label>Email:<input type="text" name="email" value={this.state.email} /></label>
  <label>Note:<input type="text" name="note" value={this.state.note}/></label>
  <label>Pass:<input type="text" name="pass" value={this.state.pass}/></label>  
  <input type="submit" value="Insert Data" onClick={(e) => this.onSubmit(e)}/>
  </form>
  <hr/>
  <label>Enter user ID:<input type="text" /></label>
  <input type="submit" value="Update"/><br/>
  
  <label>Enter email ID:<input type="text" /></label>
  <input type="submit" value="Delete"/>
  </center>
  <hr/>
  <ReactTable data={data} columns={columns} />
  </div>
  );
}

}

export default App;
