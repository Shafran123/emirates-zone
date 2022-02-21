import React, { useEffect, useRef, useState } from 'react'
import { View, Text, TextInput, TouchableOpacity, FlatList, KeyboardAvoidingView, Button, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { logoutUser, getAllDrivers, udpateDriverDetails, deleteDriver, addDriverDetails } from '../../../redux/actions/homeActions';
import { Picker } from '@react-native-picker/picker';
import { ArrowBackIcon, CheckIcon, Select, Spinner } from 'native-base';
import RNDateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';

const DriverDetails = (props) => {

    const { driver_data } = props.route.params;
    const [is_add_driver, set_Add_Driver] = useState(false)
    const [driver_name, setd_Driver_Name] = useState('')
    const [license_type, set_license_type] = useState(0);
    const [driver_age, set_driver_age] = useState('');
    const [license_exp, set_license_exp] = useState(moment().format('YYYY-MM-DD'));
    const [phone_no, set_Phone_No] = useState('');

    const [loading, set_loading] = useState(false)
    const [loading_delete, set_loading_delete] = useState(false)

    const [date, setDate] = useState(new Date(license_exp));
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);

    useEffect(() => {
        console.log(driver_data, props.route.params.driver_data);
        if (driver_data) {
            setDriverData()
            set_Add_Driver(false)
        } else {
            set_Add_Driver(true)
        }
    }, [])

    useEffect(() => {
        console.log(new Date(), moment().toLocaleString());
        setShow(false)
    }, [driver_name, phone_no, license_type, driver_age])



    const setDriverData = () => {
        setd_Driver_Name(driver_data?.name)
        set_license_type(driver_data?.license_type == "Two Wheeler" ? 0 : 1)
        set_driver_age(driver_data?.age)
        set_license_exp(driver_data?.license_expiry)
        setDate(new Date(driver_data?.license_expiry))
        set_Phone_No(driver_data?.phone)
    }


    const pickerRef = useRef();

    const updateDriver = () => {
        console.log('update');
        set_loading(true)
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
            if (res) {
                set_loading(false)
                props.navigation.navigate('Home')
            }
        })
    }


    const addDriver = () => {
        console.log('update');

        set_loading(true)

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
                set_loading(false)
                props.navigation.navigate('Home')
            }
        })
    }

    const deleteDriver = () => {
        console.log('delete');
        set_loading_delete(true)
        props.deleteDriver(driver_data, (res) => {
            console.log(res);
            if (res) {
                set_loading_delete(false)
                props.navigation.navigate('Home')

            }
        })
    }

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        console.log(currentDate);
        setShow(Platform.OS === 'ios');
        setDate(currentDate);
        set_license_exp(moment(currentDate).format('YYYY-MM-DD'))
    };

    return (
        <>
            <View style={{paddingLeft : 25 , backgroundColor : 'white'}}>
                <View style={{ height: 60 }}>

                </View>

                <TouchableOpacity onPress={() => props.navigation.goBack()}>
                    <View style={{ paddingBottom: 20, display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                        <ArrowBackIcon size={6} />
                        <View>
                            <Text style={{ fontSize: 18, fontWeight: '600', paddingLeft: 5 }}>Back</Text>

                        </View>

                    </View>
                </TouchableOpacity>
            </View>

            <ScrollView

                style={{ flex: 1, backgroundColor: 'white' }}>
                <View style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flex: 1, backgroundColor: 'white' }}>
                    <View style={{ width: '85%' }}>
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
                                License Type
                            </Text>

                            <Select selectedValue={license_type} height="52" fontSize={14} borderColor='gray.500'
                                style={{ paddingLeft: 15, height: 52, borderWidth: 1, borderColor: 'gray', borderRadius: 5 }}
                                minWidth="200"
                                accessibilityLabel="License Type"
                                placeholder="License Type" _selectedItem={{

                                    style: { color: 'white' },
                                    endIcon: <CheckIcon size="4" />
                                }} mt={1} onValueChange={itemValue => set_license_type(itemValue)}>
                                <Select.Item key={0} color='white' label="Two Wheeler" value={0} />
                                <Select.Item key={1} label="Four Wheeler" value={1} />

                            </Select>

                            {/* <Picker
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
                        </Picker> */}

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
                            <TouchableOpacity onPress={() => setShow(true)}>
                                <View
                                    style={{ display: 'flex', justifyContent: 'center', paddingLeft: 15, height: 52, borderWidth: 1, borderColor: 'gray', borderRadius: 5 }}
                                >
                                    <Text> {license_exp.toString()} </Text>
                                </View>

                            </TouchableOpacity>

                            {show ?
                                (
                                    <RNDateTimePicker
                                        testID="dateTimePicker"
                                        value={date}
                                        mode={mode}
                                        display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                                        is24Hour={true}
                                        onChange={onChange}
                                    />
                                ) : null}



                        </View>
                        <View style={{ height: 10 }}>

                        </View>

                        <View>
                            <Text style={{ paddingBottom: 5 }}>
                                Phone Number
                            </Text>
                            <TextInput
                                placeholder='(00)-000-10240'
                                value={phone_no}
                                onChangeText={(phone) => set_Phone_No(phone)}
                                style={{ paddingLeft: 15, height: 52, borderWidth: 1, borderColor: 'gray', borderRadius: 5 }}
                            />


                        </View>


                        <View style={{ height: 40 }}>

                        </View>



                    </View>

                    <View style={{ width: '85%', marginBottom: 80 }}>
                        {is_add_driver ? (
                            <View>
                                <TouchableOpacity onPress={() => addDriver()} style={{ backgroundColor: 'green', borderRadius: 5 }}>
                                    <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 52, backgroundColor: '#2D59CA', width: '100%', borderRadius: 5 }}>
                                        {loading ? <Spinner color="white" /> :
                                            <Text style={{ fontSize: 18, fontWeight: '600', color: 'white' }}>
                                                Add Driver
                                            </Text>
                                        }

                                    </View>
                                </TouchableOpacity>
                            </View>
                        ) :
                            <View>
                                <View>
                                    <TouchableOpacity onPress={() => updateDriver()} style={{ backgroundColor: 'orange', borderRadius: 5 }}>

                                        <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 52, backgroundColor: '#2D59CA', width: '100%', borderRadius: 5 }}>
                                            {loading ? <Spinner color="white" /> :
                                                <Text style={{ fontSize: 18, fontWeight: '600', color: 'white' }}>
                                                    Update Driver
                                                </Text>
                                            }

                                        </View>
                                    </TouchableOpacity>
                                </View>

                                <View style={{ height: 20 }}>

                                </View>

                                <View>
                                    <TouchableOpacity onPress={() => deleteDriver()} style={{ backgroundColor: 'red', borderRadius: 5 }}>
                                        <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 52, backgroundColor: 'red', width: '100%', borderRadius: 5 }}>
                                            {loading_delete ? <Spinner color="white" /> :
                                                <Text style={{ fontSize: 18, fontWeight: '600', color: 'white' }}>
                                                    Delete Driver
                                                </Text>
                                            }

                                        </View>
                                    </TouchableOpacity>
                                </View>

                            </View>
                        }
                    </View>

                </View>
            </ScrollView>

        </>

    )
}

const mapStateToProps = (state) => {
    return {
        home: state.home.home,
        drivers: state.home.drivers
    };
};

export default connect(mapStateToProps, { logoutUser, getAllDrivers, udpateDriverDetails, deleteDriver, addDriverDetails })(DriverDetails);
