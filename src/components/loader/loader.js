//node imports
import React, { Component } from 'react'
import LottieLoader from 'react-lottie-loader'

//local imports
import spinnerData from '../../data/spinner.json'



class Spinner extends Component {


    render() {
        const { loading } = this.props
        if (!loading) return null;
        return (
            <LottieLoader animationData={spinnerData} style={{
                backgroundColor: 'transparent',
                height: 100,
                width: 100,
                margin: 'auto',
                left: 0,
                right: 0,
                top: 0,
                bottom: 0,
                position: 'fixed',
                zIndex: '99999'
            }} />
        )
    }
}



export default Spinner