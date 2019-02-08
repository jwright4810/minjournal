import React from 'react'; 
import Plus from './icon-plus.svg';
import DisplayFormGoals from '../DisplayFormGoals/displayFormGoals';
import PropTypes from 'prop-types'; 
import Popper from '@material-ui/core/Popper';
import Typography from '@material-ui/core/Typography'; 
import Fade from '@material-ui/core/Fade';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    typography: {
      padding: theme.spacing.unit * 1,
    },
  });

class SetGoals extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            route: 'startButton',
            goalTitle: '',
            goalDesc: '',
            goalIcon: '',
            goalList: [],
            anchorEl: null,
            open: false
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
        
        console.log(goalList);
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
                this.props.onRouteChange('setgoal')//eventually change that to dashboard
              }
            })
           .catch(err => {
               console.log('Request failure: ', err)
            })
        }
    }
    /*modal functions*/
    handleClick = event => {
        const { currentTarget } = event;
        this.setState(state => ({
          anchorEl: currentTarget,
          open: !state.open,
        }));
      };

    setIcon = (event) => {
        this.setState({goalIcon: event.target.src, open:!this.state.open}) 
    }

    render() {
        const { classes } = this.props;
        const { goalList, anchorEl, open } = this.state;
        const id = open ? 'simple-popper' : null;
        const { icons, user } = this.props; 
        const iconList = icons.map((icon, i) => {
            return (
              <img 
                className= "pa2 center"
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

            <article className="br3 ba b--black-10 mv4 w-90 w-50-m w-50-l mw9 shadow-5 center bg-white" >
                <main className="pa4 black-80">
                    <div className="measure center">
                    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                        <legend className="f3 fw6 ph0 mh0">Goal range: {user.goalStart} - {user.goalEnd}</legend>
                        
                        <div>
                              {
                              goalList.map((goal, i) => {
                                return (
                                    <DisplayFormGoals 
                                        key={i}
                                        title={goalList[i].title}
                                        desc={goalList[i].desc}
                                        icon={goalList[i].icon}
                                    />
                                );
                              })
                            } 
                            
                        </div>
                        
                        <div className="mt4">
                        <label className="db fw6 lh-copy f6" htmlFor="goal">Goal</label>
                        <input 
                            className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                            type="text" 
                            name="goal"  
                            id="goal" 
                            placeholder="Title of your goal"
                            value={this.state.goalTitle}
                            onChange={this.onTitleChange}
                        />
                        </div>
                        <div className="mt3">
                        <label className="db fw6 lh-copy f6" htmlFor="goalDesc">Desc of goal</label>
                        <input 
                            className=" pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                            type="text" 
                            name="goalDesc"  
                            id="goalDesc" 
                            placeholder= "detailed description of your goal"
                            value={this.state.goalDesc}
                            onChange={this.onDescChange}

                        />
                        </div>
                        
                        <div className="flex items-center mb1 mt2 "> {/*this needs to be changed to a button when clicked lets you set an icon */}
                            <img 
                                className="grow pointer dib"
                                src={Plus} 
                                alt="add goal identifier icon" 
                                width="20px" 
                                height="20px"
                                onClick={this.handleClick}   
                            />
                            <span className="pa2 lh-copy">Goal identifier</span>
                            
                            <Popper 
                                className=" center mw5"
                                id={id} 
                                open={open} 
                                anchorEl={anchorEl} 
                                transition
                            >
                                {({ TransitionProps }) => (
                                     <Fade {...TransitionProps} timeout={350}>
                                        <Paper>
                                            <Typography className={classes.typography}>{iconList}</Typography>
                                        </Paper>
                                    </Fade>
                                )}
                            </Popper>
                            
                        </div>
                        
                    </fieldset>
                    <div className="addGoal mb3 flex justify-end ">
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

SetGoals.propTypes = {
    classes: PropTypes.object.isRequired,
  };

export default withStyles(styles)(SetGoals);  

            