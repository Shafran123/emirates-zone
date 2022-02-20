import { useFocusEffect } from '@react-navigation/native';
import React, { useEffect, useState, useLayoutEffect } from 'react'
import { View, Text, TextInput, TouchableOpacity, FlatList } from 'react-native';
import { connect } from 'react-redux';
import { logoutUser, getAllDrivers } from '../../../redux/actions/homeActions';


const Home = (props) => {

    const [loading, setloading] = useState(true)

    useEffect(() => {
        setloading(true)
        props.navigation.addListener(
            'focus',
            () => {
                console.log('focus');
                getAllDrivers()
            }
        );
    }, [])

    const getAllDrivers = () => {
        console.log('all  drivers get');
        props.getAllDrivers(res => {
            console.log(res);
            if (res) {
                setloading(false)
            }

        })
    }

  

    const navigateDriverScreen = (driver) => {
        console.log(driver);
        props.navigation.navigate('DriverDetails', { driver_data: driver })
    }

    const addUser = () => {
        props.navigation.navigate('DriverDetails' ,{ driver_data: null })
    }


    return (
        <View style={{ display: 'flex', alignItems: 'center', flex: 1, backgroundColor: 'white' }}>
            <View style={{ width: '80%', flex: 1 }}>
                <View style={{ height: 60 }}>

                </View>
                <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Text style={{ fontSize: 32, fontWeight: '700' }}>
                        Drivers
                    </Text>
                    <TouchableOpacity onPress={() => addUser()} style={{ backgroundColor: 'green', borderRadius: 5 }}>
                        <Text style={{ fontSize: 18, color: 'white', padding: 10 }}>
                            Add Driver
                        </Text>
                    </TouchableOpacity>

                </View>
                <View style={{ height: 40 }}>

                </View>
                {!loading ? (
                    <View style={{ flex: 1 }}>
                        <FlatList
                            data={props.drivers}
                            keyExtractor={item => item.id}
                            renderItem={(item) => {
                                return (
                                    <TouchableOpacity onPress={() => navigateDriverScreen(item.item)} style={{marginBottom: 10}}>
                                        <View style={{ height: 52 , display: 'flex' , justifyContent: 'center', paddingLeft: 10, borderWidth: 2, borderColor : 'lightgray' , borderRadius: 5 }}>
                                            <Text>
                                                {item.item.id} : {item.item.name}
                                            </Text>
                                        </View>
                                    </TouchableOpacity>
                                );
                            }}
                        />
                    </View>
                ) :
                    <View>
                        <Text>
                            loading
                        </Text>
                    </View>}


                < View style={{ height: 10 }}>

                </View>

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

export default connect(mapStateToProps, { logoutUser, getAllDrivers })(Home);
