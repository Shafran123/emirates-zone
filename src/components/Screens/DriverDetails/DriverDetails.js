import React, { useEffect, useRef, useState } from 'react'
import { View, Text, TextInput, TouchableOpacity, FlatList, KeyboardAvoidingView } from 'react-native';
import { connect } from 'react-redux';
import { logoutUser, getAllDrivers, udpateDriverDetails, deleteDriver, addDriverDetails } from '../../../redux/actions/homeActions';
import { Picker } from '@react-native-picker/picker';

const DriverDetails = (props) => {

    const { driver_data } = props.route.params;
    const [is_add_driver, set_Add_Driver] = useState(false)
    const [driver_name, setd_Driver_Name] = useState('')
    const [license_type, set_license_type] = useState(0);
    const [driver_age, set_driver_age] = useState('');
    const [license_exp, set_license_exp] = useState('');
    const [phone_no, set_Phone_No] = useState('');

    useEffect(() => {
        console.log(driver_data, props.route.params.driver_data);
        if (driver_data) {
            setDriverData()
            set_Add_Driver(false)
        } else {
            set_Add_Driver(true)
        }
    }, [])


    const setDriverData = () => {
        setd_Driver_Name(driver_data?.name)
        set_license_type(driver_data?.license_type == "Two Wheeler" ? 0 : 1)
        set_driver_age(driver_data?.age)
        set_license_exp(driver_data?.license_expiry)
        set_Phone_No(driver_data?.phone)
    }


    const pickerRef = useRef();

    const updateDriver = () => {
        console.log('update');

        let data = {
            id: driver_data?.id,
            name: driver_name,
            license_type: license_type == 0 ? 'Two Wheeler' : 'Four Wheeler',
            age: driver_age,
            license_expiry: license_exp,
            phone: phone_no
        }

        props.udpateDriverDetails(data, (res) => {
            console.log(res);
        })
    }


    const addDriver = () => {
        console.log('update');

        let data = {
            name: driver_name,
            license_type: license_type == 0 ? 'Two Wheeler' : 'Four Wheeler',
            age: driver_age,
            license_expiry: license_exp,
            phone: phone_no
        }

        props.addDriverDetails(data, (res) => {
            console.log(res);
            if (res) {
                props.navigation.navigate('Home')
            }
        })
    }

    const deleteDriver = () => {
        console.log('delete');
        props.deleteDriver(driver_data, (res) => {
            console.log(res);
            if (res) {
                props.navigation.navigate('Home')

            }
        })
    }

    return (
        <KeyboardAvoidingView style={{flex :1}}>
            <View style={{ display: 'flex', alignItems: 'center', flex: 1, backgroundColor: 'white' }}>
                <View style={{ width: '80%' }}>
                    <View style={{ height: 40 }}>

                    </View>
                    <View >

                        <Text style={{ fontSize: 24, fontWeight: '600' }}>
                            Driver Details
                        </Text>
                    </View>
                    <View style={{ height: 20 }}>

                    </View>
                    <View>
                        <Text style={{ paddingBottom: 5 }}>
                            Driver Name
                        </Text>
                        <TextInput
                            placeholder='Driver Name'
                            value={driver_name}
                            onChangeText={(name) => setd_Driver_Name(name)}
                            style={{ paddingLeft: 15, height: 52, borderWidth: 1, borderColor: 'gray', borderRadius: 5 }}
                        />


                    </View>
                    <View style={{ height: 10 }}>

                    </View>

                    <View>
                        <Text style={{ paddingBottom: 5 }}>
                            License_type
                        </Text>

                        <Picker
                            selectedValue={license_type}
                            ref={pickerRef}
                            mode='dialog'
                            itemStyle={{ height: 50 }}
                            onPress={() => console.log('jellop')}
                            style={{ paddingLeft: 15, height: 52, borderWidth: 1, borderColor: 'gray', borderRadius: 5 }}
                            onValueChange={(itemValue, itemIndex) =>
                                set_license_type(itemValue)
                            }>
                            <Picker.Item label="Two Wheeler" value={0} />
                            <Picker.Item label="Four Wheeler" value={1} />
                        </Picker>

                    </View>
                    <View style={{ height: 10 }}>

                    </View>


                    <View>
                        <Text style={{ paddingBottom: 5 }}>
                            Driver Age
                        </Text>
                        <TextInput
                            placeholder='Driver Age'
                            value={driver_age.toString()}
                            onChangeText={(age) => set_driver_age(age)}
                            style={{ paddingLeft: 15, height: 52, borderWidth: 1, borderColor: 'gray', borderRadius: 5 }}
                        />


                    </View>
                    <View style={{ height: 10 }}>

                    </View>


                    <View>
                        <Text style={{ paddingBottom: 5 }}>
                            License_expiry
                        </Text>
                        <TextInput
                            placeholder='YYYY-MM-DD'
                            value={license_exp}
                            onChangeText={(date) => set_license_exp(date)}
                            style={{ paddingLeft: 15, height: 52, borderWidth: 1, borderColor: 'gray', borderRadius: 5 }}
                        />


                    </View>
                    <View style={{ height: 10 }}>

                    </View>

                    <View>
                        <Text style={{ paddingBottom: 5 }}>
                            Phone Number
                        </Text>
                        <TextInput
                            value={phone_no}
                            onChangeText={(phone) => set_Phone_No(phone)}
                            style={{ paddingLeft: 15, height: 52, borderWidth: 1, borderColor: 'gray', borderRadius: 5 }}
                        />


                    </View>


                    <View style={{ height: 40 }}>

                    </View>

                    {is_add_driver ? (
                        <View>
                            <TouchableOpacity onPress={() => addDriver()} style={{ backgroundColor: 'green', borderRadius: 5 }}>
                                <Text style={{ fontSize: 18, textAlign: 'center', color: 'white', padding: 10 }}>
                                    Add Driver
                                </Text>
                            </TouchableOpacity>
                        </View>
                    ) :
                        <View>
                            <View>
                                <TouchableOpacity onPress={() => updateDriver()} style={{ backgroundColor: 'orange', borderRadius: 5 }}>
                                    <Text style={{ fontSize: 18, textAlign: 'center', color: 'white', padding: 10 }}>
                                        Update Driver
                                    </Text>
                                </TouchableOpacity>
                            </View>

                            <View style={{ height: 20 }}>

                            </View>

                            <View>
                                <TouchableOpacity onPress={() => deleteDriver()} style={{ backgroundColor: 'red', borderRadius: 5 }}>
                                    <Text style={{ fontSize: 18, textAlign: 'center', color: 'white', padding: 10 }}>
                                        Delete Driver
                                    </Text>
                                </TouchableOpacity>
                            </View>

                        </View>
                    }

                </View>

            </View>
        </KeyboardAvoidingView>

    )
}

const mapStateToProps = (state) => {
    return {
        home: state.home.home,
        drivers: state.home.drivers
    };
};

export default connect(mapStateToProps, { logoutUser, getAllDrivers, udpateDriverDetails, deleteDriver, addDriverDetails })(DriverDetails);
