import React from 'react';
import Burger from "../../components/Burger/Burger";

class BurgerBuilder extends React.Component{
    render(){
        return (
            <>
                <Burger/>
                <div>Build Control</div>
            </>
        )
    }
}

export default BurgerBuilder;