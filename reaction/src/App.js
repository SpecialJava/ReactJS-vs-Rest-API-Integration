  import React, {Component} from 'react';

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
   return (
    <div>{this.state.data.map((obj) => 
      <p  key={obj.userId}> {obj.userName} </p>
      )}</div>
    );
  }

}

export default App;
