import React from 'react';

import Modal from '../../components/UI/Modal/Modal';

export default function withErrorHandler ( WrappedComponent, axios ) {
    return class extends React.Component {
        state  = {
            error: null
        }

        componentDidMount () {
            axios.interceptors.request.use(req => {
                this.setState({error: null})
                return req;
            })
            axios.interceptors.response.use(null, error => {
                this.setState({error: error})
                return error;
            });

        }

        errorConfirmedHandler = () => {
            this.setState({error: null})
        }

        render () {
            const errorMsg = this.state.error ? this.state.error.message : null;

            return (
                <>
                    <Modal show={!!this.state.error} clicked={this.errorConfirmedHandler}>
                        {errorMsg}
                    </Modal>
                    <WrappedComponent {...this.props}/>
                </>
            );
        }
    }
}