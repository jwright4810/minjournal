import React from 'react'; 
import Plus from './icon-plus.svg';
import DisplayFormGoals from '../DisplayFormGoals/displayFormGoals';
import Popover from 'react-bootstrap/Popover'
import Overlay from 'react-bootstrap/Overlay'
import Button from 'react-bootstrap/Button'
import ButtonToolbar from 'react-bootstrap/ButtonToolbar'
import './SetGoals.css';


class SetGoals extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            route: 'startButton',
            goalTitle: '',
            goalDesc: '',
            goalIcon: '',
            goalList: [],
            show: false,
            usedIcons: []          
        }
    } 
    
    //sets current goal title being edited to state.goalTitle so we can grab it and push it into the goaltitle list
    onTitleChange = (event) => {
        this.setState({goalTitle: event.target.value})
    }
    onDescChange = (event) => {
        this.setState({goalDesc: event.target.value})
    }
    // function will take the goalTitle and goalDesc set in state and push them into the goalList 
    // then it will map over that array and add those goals to the page
    // note: function checks to make sure there are no more than six goals
    addGoal = () => {
        const { goalTitle, goalDesc, goalIcon, goalList} = this.state;
        if(goalList.length === 6) {
            alert('Already at 6 goals, please submit to move forward');
        } else {
            goalTitle !== '' && goalDesc !== "" && goalIcon !==""
                ? goalList.push({title: goalTitle, desc: goalDesc, icon: goalIcon})
                : alert('cannot set an empty goal')
        
      
        this.setState({
            goalTitle: '',
            goalDesc: '',
            goalIcon: '' 
          }); 
        }
        
    }
    /*onSubmitGoals will set goals into the user_profile database and will redirect the form to the dashboard */
    onSubmitGoals = () => {
        const { user } = this.props;
        
        if(this.state.goalList.length < 3) {
            alert('must have at least 3 goals')
        } else {
            fetch('http://localhost:3000/submitGoals', {
                method: 'put',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                  goalList: this.state.goalList, 
                  id: user.id
               })
           })
           .then(response => response.json())
           .then(user => {
              if(user.id) {
                this.props.loadGoals(user)
                this.props.onRouteChange('home')
              }
            })
           .catch(err => {
               console.log('Request failure: ', err)
            })
        }
    }
    /*popover functions*/
    handleClick = ({ target }) => {
        this.setState(s => ({ target, show: !s.show }));
      };

    setIcon = (event) => {
        const {usedIcons} = this.state;

        if(usedIcons.indexOf(event.target.src) === -1) {
            this.setState({
                goalIcon: event.target.src,
                show: !this.state.show,
            })
            usedIcons.push(event.target.src);
            console.log(usedIcons);
        } else {
            alert('Icon already used.')
        }       
    }

    render() {
        
        const { goalList } = this.state;
        const { icons, user } = this.props; 
        const iconList = icons.map((icon, i) => {
            return (
              <img 
                className= "icons pa2 center"
                key={i}
                src={icons[i]} 
                alt='goal icon'
                width="30px"
                height="30px"
                onClick={this.setIcon}
              />
            )
        })
        
        return (  

            <article className="br3 ba b--black-10 mv4 w-90 w-75-m w-50-l mw9 shadow-5 center bg-transparent" >
                <main className="pa4 black-80">
                    <div className="measure center">
                    <fieldset id="sign_up" className="ba b--transparent ph0 mh0 mb0">
                        <legend className="f3 fw6 ph0 mh0">Goal range</legend>
                        <h3>{user.goalStart} - {user.goalEnd}</h3>
                        
                        <div >
                              {
                              goalList.map((goal, i) => {
                                return (
                                    <DisplayFormGoals 
                                        key={i}
                                        title={goalList[i].title}
                                        desc={goalList[i].desc}
                                        icon={goalList[i].icon}
                                        index={i}
                                       
                                    />
                                );
                              })
                            } 
                            
                        </div>
                        
                        <div className="mt4">
                        <label className="db fw6 lh-copy f6" htmlFor="goal">Goal</label>
                        <input 
                            className="pa2 br2 input-reset ba bg-transparent hover-bg-navy hover-white w-100" 
                            type="text" 
                            name="goal"  
                            id="goal" 
                            placeholder="Title of your goal"
                            value={this.state.goalTitle}
                            onChange={this.onTitleChange}
                        />
                        </div>
                        <div className="mt3">
                        <label className="db fw6 lh-copy f6" htmlFor="goalDesc">Trackable step</label>
                        <textarea 
                            className=" textarea br2 pa2 ba b--black input-reset ba bg-transparent hover-bg-navy hover-white border-hover w-100" 
                            type="textarea" 
                            rows="4"
                            name="goalDesc"  
                            id="goalDesc" 
                            placeholder= "What trackable steps will you do to accomplish this goal?"
                            value={this.state.goalDesc}
                            onChange={this.onDescChange}
                        ></textarea>
                        </div>
                        
                        <div className="flex items-center mb1 mt2 "> {/*this needs to be changed to a button when clicked lets you set an icon */}
                        <ButtonToolbar>
                            <Button className="iconbtn" onClick={this.handleClick}>
                                <img 
                                    className="grow pointer mt2 "
                                    src={Plus} 
                                    alt="goal icon" 
                                    width="20px" 
                                    height="20px"   
                                /> 
                            </Button>

                            <Overlay
                            show={this.state.show}
                            target={this.state.target}
                            placement="bottom"
                            container={this}
                            containerPadding={20}
                            >
                            <Popover id="popover-contained" className="mt2 w-25 flex flex-wrap bg-white br3 ba b--black-10 shadow-5">
                                {iconList}
                            </Popover>
                            </Overlay>
                        </ButtonToolbar>
                        <p className="pl2 pt1">Goal Icon</p>
                        </div>
                        
                    </fieldset>
                    <div className="addGoal mb1 flex justify-end ">
                        <img 
                            className="grow pointer mt2 "
                            src={Plus} 
                            alt="add goal icon" 
                            width="20px" 
                            height="20px"
                            onClick={this.addGoal}    
                          /> 
                          <p className="pl2 pt2 mt0">add goal</p>
                    </div>     
                         
                        
                    <div className="submitGoals">
                        <input onClick={this.onSubmitGoals}
                            className="b ph3 br2 pv2 input-reset ba b--black bg-transparent hover-bg-navy hover-white border-hover grow pointer f6 dib"
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

            