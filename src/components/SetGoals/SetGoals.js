import React from 'react'; 




class SetGoals extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            route: 'startButton',
            goalStart: '',
            goalEnd: ''
        }
    } 


    onSetGoalsButton = () => {
        
        if(this.state.route === 'startButton'){
           fetch('http://localhost:3000/setgoals', {
                method:'get',
                headers: {'Content-Type': 'application/json'},
           })
           .then(response => response.json())
           .then(date => {
                this.setState({
                    goalStart: date.goalstart,
                    goalEnd: date.goalend
                })
           })
           .catch(console.log)

           this.setState({route: 'anything'});
            
        } else {
            this.setState({route: 'startButton'});   
        }
    }

    render() {
        const { route } = this.state
        return (
          <div className='setGoals'>
            {route === 'startButton'
            ? <div>
                <button onClick={this.onSetGoalsButton}>Set New Goals</button>
              </div>
            : (
               <div>
                <h1>Your current goal range is {this.state.goalStart} - {this.state.goalEnd}</h1> 
                <button onClick={this.onSetGoalsButton}>reset</button>
               </div> 
             )
            }
          </div>
        );
    }
}

export default SetGoals;  

            