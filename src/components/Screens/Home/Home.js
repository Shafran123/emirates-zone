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
        props.navigation.navigate('DriverDetails', { driver_data: null })
    }


    return (
        <View style={{ display: 'flex', alignItems: 'center', flex: 1, backgroundColor: 'white' }}>
            <View style={{ width: '85%', flex: 0.9 }}>
                <View style={{ height: 60  }}>

                </View>
                <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Text style={{ fontSize: 32, fontWeight: '700' }}>
                        Drivers
                    </Text>
                    <TouchableOpacity onPress={() => addUser()} style={{ backgroundColor: '#2D59CA', borderRadius: 5 }}>
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
                                    <TouchableOpacity onPress={() => navigateDriverScreen(item.item)} style={{ marginBottom: 20 }}>
                                        <View style={{ height: 82, display: 'flex', justifyContent: 'space-between', padding: 10, borderWidth: 2, borderColor: 'lightgray', borderRadius: 5 }}>

                                        <View style={{display : 'flex' , flexDirection: 'row', justifyContent: 'space-between'}}>
                                                <Text style={{ fontSize: 20, fontWeight: '700' }}>
                                                    {item.item.name}
                                                </Text>

                                                <View style={{ width: 100, height: 25, borderRadius: 15, backgroundColor: item.item.license_type == 'Two Wheeler' ?  '#61B8E6' :'#2D59CA' , display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                                    <Text style={{ color: 'white' }}>
                                                        {item.item.license_type}
                                                    </Text>
                                                </View>
                                        </View>

                                        <View>
                                            <Text>
                                                Age : {item.item.age}
                                            </Text>

                                            <Text>
                                                License exp : {item.item.license_expiry}
                                            </Text>
                                        </View>

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
