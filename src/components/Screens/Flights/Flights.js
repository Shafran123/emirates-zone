import { useFocusEffect } from '@react-navigation/native';
import React, { useEffect, useState, useLayoutEffect } from 'react'
import { View, Text, TextInput, TouchableOpacity, FlatList, Image } from 'react-native';
import { connect } from 'react-redux';
import { logoutUser, getAllDrivers, getFlights } from '../../../redux/actions/homeActions';


const Flights = (props) => {

    const [loading, setloading] = useState(true)
    const [page, setPage] = useState(0)

    useEffect(() => {
        props.getFlights(page, res => {
            console.log(res);
            if (res) {
                setloading(false)
            }
        })
    }, [page])


    const getMoreData = () => {
        console.log('get more data');
        let temp_page = page + 1
        setPage(temp_page)
    }


    return (
        <View style={{ display: 'flex', alignItems: 'center', flex: 1, backgroundColor: 'white' }}>
            <View style={{ width: '80%', flex: 1 }}>
                <View style={{ height: 60 }}>

                </View>
                <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Text style={{ fontSize: 32, fontWeight: '700' }}>
                        Flights
                    </Text>
                </View>

                <View style={{ height: 40 }}>

                </View>

                <View style={{ flex: 1 }}>
                    <FlatList
                        data={props.flights}
                        onEndReached={() => getMoreData()}
                        keyExtractor={item => item._id}
                        renderItem={(item) => {
                            return (
                                <TouchableOpacity onPress={() => navigateDriverScreen(item.item)} style={{ marginBottom: 10 }}>

                                    <View style={{ height: 72, display: 'flex', flexDirection: 'row', alignItems: 'center', paddingLeft: 10, borderWidth: 2, borderColor: 'lightgray', borderRadius: 5 }}>
                                        <Image resizeMode='contain' source={{ uri: item.item.airline[0]?.logo }} style={{ height: 40, width: 40 }} />
                                        <View style={{paddingLeft : 15}}>
                                            <Text>
                                                {item.item.name}
                                            </Text>
                                            <Text>
                                                {item.item.airline[0]?.country}
                                            </Text>
                                        </View>

                                    </View>
                                </TouchableOpacity>
                            );
                        }}
                    />
                </View>


            </View>
        </View >
    )
}

const mapStateToProps = (state) => {
    return {
        home: state.home.home,
        drivers: state.home.drivers,
        flights: state.home.flights
    };
};

export default connect(mapStateToProps, { logoutUser, getAllDrivers, getFlights })(Flights);
