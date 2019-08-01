  import React, {Component} from 'react';
  import ReactTable from 'react-table';
  import 'react-table/react-table.css';

  const API = 'http://192.168.31.21:8080/networld/list_of_user';

  export class App extends Component{

    constructor(props) {
      super(props); 
      this.state = {
        data: [] 
      }
    } 

    componentDidMount() {
     fetch(API).then(response =>{
      return response.json()
    }).then(response => {
     this.setState({ data: response });
   }).catch(error => {console.log(error); }); 
  } 

  render() {
    const data  = this.state.data.map(response =>{ 
      return {
        name: response.userName,
        email: response.userEmail,
        note: response.userNote
      }
    })

  const columns = [{
    Header: 'User Name',
    accessor: 'name'
  }, {
    Header: 'User Email',
    accessor: 'email',
  }, {
   Header: 'User Note',
   accessor: 'note'
 }]


 return <ReactTable data={data} columns={columns} />
}

}

export default App;
