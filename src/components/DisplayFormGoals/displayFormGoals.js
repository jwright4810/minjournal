import React from 'react'; 
import './dFG.css';

const displayFormGoals = ({ title, desc, icon, index }) => {
    return (
        <div className="br3 ba b--black-10 mv4 w-95 w-95-m w-95-l mw8 shadow-5 bg-white center">
            <h1 className="tl f4 pl2 ">Goal #{index + 1}: {title}</h1>
            <p className="tl f6 pl3 pr3 pa3 bg-near-white">Trackable step: {desc}</p>
            <img 
              className= "imgpadding"
              src={icon}
              alt= 'goal icon' 
              width="40px"
              height="40px"
              
            />
        </div>
    )
}

export default displayFormGoals; 


