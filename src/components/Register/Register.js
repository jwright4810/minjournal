import React from 'react';
import './Register.css';
 


class Register extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            name: '',
            birthday: {
                month: '',
                day: '',
                year: '',
            }
        }
    }

    onNameChange = (event) => {
        this.setState({name: event.target.value})
    }

    onEmailChange = (event) => {
        this.setState({email: event.target.value})
    }

    onPasswordChange = (event) => {
        this.setState({password: event.target.value})
    }
    onBirthdayChange = (event) => {
        const bday = {...this.state.birthday};
        if(event.target.name === 'bday-month') {
            if(event.target.value !== 'Month') {
                bday.month = event.target.value;
                this.setState({birthday: bday});    
            } 
        } else if (event.target.name === 'bday-day') {
            bday.day = event.target.value;
            this.setState({birthday: bday});  
        } else if (event.target.name === 'bday-year') {
            bday.year = event.target.value;
            this.setState({birthday: bday});  
        }
    }



    onSubmitSignIn = () => {
        fetch('http://localhost:3000/register', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                email: this.state.email,
                password: this.state.password,
                name: this.state.name,
                birthday: `${this.state.birthday.month}/${this.state.birthday.day}/${this.state.birthday.year}`
            })
        })
            .then(response => response.json())
            .then(user => {
                if(user.user_id) {
                    this.props.loadUser(user)
                    this.props.onRouteChange('home')
                }
            })
        
    }
    
    render() {
        return (
            <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-60-l mw6 shadow-5 center" >
                <main className="pa4 black-80">
                    <div className="measure">
                    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                        <legend className="f1 fw6 ph0 mh0">Register</legend>
                        <div className="mt3">
                        <label className="db fw6 lh-copy f6" htmlFor="names">Name</label>
                        <input 
                            className="outline-transparent pa2 br2 input-reset ba bg-transparent hover-bg-navy hover-white w-100" 
                            type="text" 
                            name="name"  
                            id="name" 
                            onChange={this.onNameChange}

                        />
                        </div>
                        <div className="mt3">
                        <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                        <input 
                            className="outline-transparent pa2 br2 input-reset ba bg-transparent hover-bg-navy hover-white w-100" 
                            type="email" 
                            name="email-address"  
                            id="email-address" 
                            onChange={this.onEmailChange}

                        />
                        </div>
                        <div className="mt3">
                        <label className="db fw6 lh-copy f6" htmlFor="birthday">Birthday </label>
                            <div className="bday-form">
                            <select
                                className="bd-ma pa2 br2 w-30"
                                type="text"
                                name="bday-month"
                                id="bday-month"
                                onChange={this.onBirthdayChange}
                             >
                           <option className="month-defaultvalue opt-style" defaultValue="Month">Month</option>
                           <option className="opt-style" value="01">January</option>
                           <option value="02">Feburary</option>
                           <option value="03">March</option>
                           <option value="04">April</option>
                           <option value="05">May</option>
                           <option value="06">June</option>
                           <option value="07">July</option>
                           <option value="08">August</option>
                           <option value="09">September</option>
                           <option value="10">October</option>
                           <option value="11">November</option>
                           <option value="12">December</option>
                        </select>

                        <input 
                            placeholder="Day"
                            className="bd-ma outline-transparent pa2 br2 input-reset ba bg-transparent  w-30"
                            type="bday-day"
                            name="bday-day"
                            id="bday-day"
                            onChange={this.onBirthdayChange}
                        />
                        <input 
                            placeholder="Year"
                            className="bd-ma outline-transparent pa2 br2 input-reset ba bg-transparent w-30"
                            type="bday-year"
                            name="bday-year"
                            id="bday-year"
                            onChange={this.onBirthdayChange}
                         />
                            </div>
                        </div>
                        <div className="mv3">
                        <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                        <input 
                            className="outline-transparent pa2 br2 input-reset ba bg-transparent hover-bg-navy hover-white w-100" 
                            type="password" 
                            name="password"  
                            id="password" 
                            onChange={this.onPasswordChange}

                        />
                        </div>
                    </fieldset>
                    <div className="">
                        <input onClick={this.onSubmitSignIn}
                            className="b ph3 br2 pv2 input-reset ba b--black bg-transparent hover-bg-navy hover-white border-hover grow pointer f6 dib"
                            type="submit" 
                            value="Register" />
                    </div>
                
                    </div>
            </main>
        </article>
        );  
    }
    
}

export default Register;