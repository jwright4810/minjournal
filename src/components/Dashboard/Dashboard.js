import React from 'react'; 

class Dashboard extends React.Component {
    constructor(props) {
    super(props);    
    
  }



 render() {
     return (
         <div>
             <h2>Hello {this.props.user.name}</h2>
         </div>
     );
  } 
}

export default Dashboard; 