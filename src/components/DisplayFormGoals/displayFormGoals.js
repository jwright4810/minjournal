import React from 'react'; 

const displayFormGoals = ({ title, desc, icon }) => {
    return (
        <div>
            <h1>{title}</h1>
            <p>{desc}</p>
            <img 
              className= "pa2 center"
              src={icon}
              alt= 'goal icon' 
              width="30px"
              height="30px"
            />
        </div>
    )
}

export default displayFormGoals; 


