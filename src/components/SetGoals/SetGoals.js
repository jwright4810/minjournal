import React from 'react'; 
import Plus from './icon-plus.svg';



class SetGoals extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            route: 'startButton',
            goalStart: '',
            goalEnd: ''
        }
    } 

    /*This function needs to ran when submit button is clicked on register or if todays 
    date is equal to goal-end data in database */
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
            <article className="br3 ba b--black-10 mv4 w-90 w-50-m w-50-l mw9 shadow-5 center" >
                <main className="pa4 black-80">
                    <div className="measure">
                    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                        <legend className="f1 fw6 ph0 mh0">Goal range: {this.state.goalStart} - {this.state.goalEnd}</legend>
                        <div className="mt4">
                        <label className="db fw6 lh-copy f6" htmlFor="goal">Goal</label>
                        <input 
                            className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                            type="text" 
                            name="goal"  
                            id="goal" 
                            placeholder="Title of your goal"
                            onChange={this.onNameChange}

                        />
                        </div>
                        <div className="mt3">
                        <label className="db fw6 lh-copy f6" htmlFor="goalDesc">Desc of goal</label>
                        <input 
                            className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                            type="text" 
                            name="goalDesc"  
                            id="goalDesc" 
                            placeholder= "detailed description of your goal"
                            onChange={this.onEmailChange}

                        />
                        </div>
                        
                        <div className="flex items-center mb2 mt2"> {/*this needs to be changed to a button when clicked lets you set an icon */}
                            <input className="mr2" type="checkbox" id="ifSuccess" value="if successful" />
                            <label htmlFor="ifSuccess" className="lh-copy">If successful</label>
                        </div>

                    </fieldset>

                        <img src={Plus} width="30px" height="30px"/> 
                    <div className="">
                        <input onClick={this.onSubmitSignIn}
                            className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                            type="submit" 
                            value="Set Goals" />
                        

                    </div>
                
                    </div>
            </main>
        </article>
        );
    }
}

export default SetGoals;  

            