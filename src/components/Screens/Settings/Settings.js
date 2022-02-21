import { useFocusEffect } from '@react-navigation/native';
import React, { useEffect, useState, useLayoutEffect } from 'react'
import { View, Text, TextInput, TouchableOpacity, FlatList } from 'react-native';
import { connect } from 'react-redux';
import { logoutUser, getAllDrivers } from '../../../redux/actions/homeActions';


const Flights = (props) => {

    const [loading, setloading] = useState(true)

    useEffect(() => {

    }, [])

    const logout = () => {
        console.log('logout clicked');
        props.logoutUser((res) => {
            console.log(res, 'res from home');
            props.navigation.navigate('MainAuth')
        })
    }


    return (
        <View style={{ display: 'flex', alignItems: 'center', flex: 1, backgroundColor: 'white' }}>
            <View style={{ width: '85%', flex: 1 }}>
                <View style={{ height: 60 }}>

                </View>
                <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Text style={{ fontSize: 32, fontWeight: '700' }}>
                        Settings
                    </Text>


                </View>

                <View style={{ height: 40 }}>

                </View>
                <TouchableOpacity onPress={() => logout()} style={{ backgroundColor: 'red', borderRadius: 5, marginBottom: 40 }}>
            
                    <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 52, backgroundColor: 'red', width: '100%', borderRadius: 5 }}>
                          
                                        <Text style={{ fontSize: 18, fontWeight: '600', color: 'white' }}>
                                        Logout
                                        </Text>
                     
                                </View>
                </TouchableOpacity>
            </View>
        </View >
    )
}

const mapStateToProps = (state) => {
    return {
        home: state.home.home,
        drivers: state.home.drivers
    };
};

export default connect(mapStateToProps, { logoutUser, getAllDrivers })(Flights);
