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
      padding: theme.spacing.unit * 2,
    },
  });

class SetGoals extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            route: 'startButton',
            goalStart: '',
            goalEnd: '',
            goalTitle: '',
            goalDesc: '',
            goalList: [],
            anchorEl: null,
            open: false
        }
    } 

    /*This function needs to run when submit button is clicked on register or if todays 
    date is equal to goal-end data in database */
    componentWillMount() {
        
           fetch('http://localhost:3000/setgoals', {
                method:'get',
                headers: {'Content-Type': 'application/json'},
           })
           .then(response => response.json())
           .then(date => {
                this.setState({
                    goalStart: date.goalstart,
                    goalEnd: date.goalend,

                })
           })
           .catch(console.log)
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
        const { goalTitle, goalDesc, goalList} = this.state;
        if(goalList.length === 6) {
            alert('Already at 6 goals, please submit to move forward');
        } else {
            goalTitle !== '' && goalDesc !== "" 
                ? goalList.push({title: goalTitle, desc: goalDesc})
                : alert('cannot set an empty goal')
        
        console.log(goalList);
        this.setState({goalTitle: ''});
        this.setState({goalDesc: ''});  
        }
        
    }
    /*onSubmitGoals will set goals into the user_profile database and will redirect the form to the dashboard */
    onSubmitGoals = () => {
        if(this.state.goalList.length < 3) {
            alert('must have at least 3 goals')
        } else {
            alert('sending goals to server')
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

    render() {
        const { classes } = this.props;
        const { goalList, anchorEl, open } = this.state;
        const id = open ? 'simple-popper' : null;
        const { icons } = this.props; 
        const iconList = icons.map((icon, i) => {
            return (
              <img 
                className= "pa1 center"
                src={icons[i]} 
                width="30px"
                height="30px"
              />
            )
        })
        
        return (  

            <article className="br3 ba b--black-10 mv4 w-90 w-50-m w-50-l mw9 shadow-5 center" >
                <main className="pa4 black-80">
                    <div className="measure">
                    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                        <legend className="f3 fw6 ph0 mh0">Goal range: {this.state.goalStart} - {this.state.goalEnd}</legend>
                        
                        <div>
                              {
                              goalList.map((goal, i) => {
                                return (
                                    <DisplayFormGoals 
                                        key={i}
                                        title={goalList[i].title}
                                        desc={goalList[i].desc}
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
                            className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
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
                            
                                

                            {/*This dialog box is close to what we want but really we need a popper, check
                            documentation */}
                            <Popper id={id} open={open} anchorEl={anchorEl} transition>
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

            