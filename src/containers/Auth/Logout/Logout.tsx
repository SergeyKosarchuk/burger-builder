import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { logout } from '../../../store/Auth/actions';
import { AuthActionType } from '../../../store/Auth/types';

interface ILogoutProps {
    onLogout(): void,
}

class Logout extends React.Component<ILogoutProps>{
    componentDidMount () {
        this.props.onLogout();
    }

    render (){
        return <Redirect to='/'/>
    }
}

const mapDispatchToProps = (dispatch: (action: AuthActionType) => void) => ({
    onLogout: () => dispatch(logout())
})


const connector = connect(null, mapDispatchToProps)(Logout);
export default connector;