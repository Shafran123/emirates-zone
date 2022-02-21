import React from 'react'
import { Image, ImageBackground, Text, TouchableOpacity, View } from 'react-native'
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

        <View style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', flex: 1, backgroundColor: 'white',  }}>
            <Image
                source={require("../../../../assets/The-survey-was-conducted-by-Georgetown-University.jpg")}
                resizeMode="cover"
                style={{ height: '100%', width: '100%', position: 'absolute', top: 0 }}
            />
            <View style={{ height: '100%', width: '100%', position: 'absolute', top: 0  ,backgroundColor: 'black' , opacity: 0.6 }}>

            </View>
            <View style={{ width: '80%', marginBottom: 80 }}>

                <View>
                    <Image resizeMode='contain' source={require('../../../../assets/ez-investment-w.png')} style={{ height: 60, width: 160 }} />
                </View>
                <View style={{ height: 20 }}>

                </View>

                <View>
                    <Text style={{ fontSize: 24, fontWeight: '800', paddingBottom: 8 , color: 'white' }}>
                        Find out why UAE
                    </Text>
                    <Text style={{ fontSize: 14, fontWeight: '500', paddingBottom: 8 ,color : 'white' }}>
                        Tops the list of the fastest-growing and best-managed economies in the Middle East
                    </Text>
                </View>

                <View style={{ height: 20 }}>

                </View>


                <TouchableOpacity onPress={() => onClickLogin()}>
                    <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 52, backgroundColor: '#2D59CA', width: '100%', borderRadius: 5 }}>
                        <Text style={{ fontSize: 18, fontWeight: '600', color: 'white' }}>
                            Login
                        </Text>

                    </View>

                </TouchableOpacity>


                <View style={{ height: 20 }}>

                </View>

                <TouchableOpacity onPress={() => onClickRegister()}>
                    <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 52, borderWidth: 2, borderColor: 'white', backgroundColor: 'transparent', width: '100%', borderRadius: 5 }}>
                        <Text style={{ fontSize: 18, fontWeight: '600', color: 'white' }}>
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