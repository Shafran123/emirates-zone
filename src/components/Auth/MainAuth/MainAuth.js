import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { connect } from 'react-redux';

const MainAuth = (props) => {

    const onClickLogin = () => {
        console.log('login clicked');
        props.navigation.navigate('Login')
    }

    const onClickRegister = () => {
        console.log('register clicked');
        props.navigation.navigate('Register')
    }

    return (
        <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flex: 1 }}>
            <View style={{ width: '80%' }}>
                <TouchableOpacity onPress={() => onClickLogin()}>
                    <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 52, backgroundColor: 'green', width: '100%', borderRadius: 5 }}>
                        <Text style={{ color: 'white' }}>
                            Login
                        </Text>

                    </View>

                </TouchableOpacity>


                <View style={{ height: 20 }}>

                </View>

                <TouchableOpacity onPress={() => onClickRegister()}>
                <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 52, backgroundColor: 'red', width: '100%', borderRadius: 5 }}>
                    <Text style={{ color: 'white' }}>
                        Register
                    </Text>
                </View>
                </TouchableOpacity>
            </View>

        </View>
    )
}


const mapStateToProps = (state) => {
    return {
        home: state.home.home,
    };
};

export default connect(mapStateToProps, {})(MainAuth);