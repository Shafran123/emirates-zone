import React, { useEffect, useState } from 'react'
import { View, Text, TextInput, TouchableOpacity, Image, KeyboardAvoidingView, Keyboard } from 'react-native';
import { connect } from 'react-redux';
import { registerUser } from '../../../redux/actions/homeActions';

const Register = (props) => {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirm_password, setConfirm_Password] = useState('')
    const [isKeyboardVisible, setKeyboardVisible] = useState(false);

    const validateEmail = () => {
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
        if (reg.test(email) == true) {
            console.log('email valid');
            return true
        } else {
            console.log('email not valid');
            return false
        }

    }

    const validatePassword = () => {
        if (password === confirm_password) {
            console.log('password match');
            return true
        } else {
            console.log('password not match');
            return false
        }
    }

    const register = () => {
        console.log('register user clicked');

        ///Form Vlaidations
        if (name && email && password && confirm_password) {
            console.log('form fileld');

            //Vlaidate Email
            let isValidEmail = validateEmail()
            console.log(isValidEmail, 'isValidEmail');

            //Validate Two Password Feilds

            let isPasswordsMatched = validatePassword()
            console.log(isPasswordsMatched, 'isPasswordsMatched');

            if (isValidEmail && isPasswordsMatched) {
                console.log('register user now');
                let data = {
                    name: name,
                    email: email,
                    password: password,
                    password_confirmation: confirm_password
                }
                props.registerUser(data, (responce) => {
                    console.log(responce);
                    if (responce) {
                        props.navigation.navigate('Home')
                    }
                })
            }


        } else {
            console.log('form not completed');
        }

    }

    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener(
            'keyboardDidShow',
            () => {
                console.log('KEY BOARD UP');
                setKeyboardVisible(true); // or some other action
            }
        );
        const keyboardDidHideListener = Keyboard.addListener(
            'keyboardDidHide',
            () => {
                console.log('KEY BOARD Down');
                setKeyboardVisible(false); // or some other action
            }
        );

        return () => {
            keyboardDidHideListener.remove();
            keyboardDidShowListener.remove();
        };
    }, [])


    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={{ flex: 1 }}>
            <View style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flex: 1 }}>

                <View style={{ width: '100%', height: '40%', backgroundColor: 'red' }}>
                    <View style={{ height: '100%', width: '100%', opacity: 0.5, backgroundColor: 'black', position: 'absolute', top: 0, zIndex: 10000 }}>

                    </View>
                    <Image
                        source={require("../../../../assets/1479041216-507.jpg")}
                        resizeMode="cover"
                        style={{ height: '100%' }}
                    />

                    <View style={{ height: '100%', width: '100%', position: 'absolute', top: 100, left: 40, zIndex: 10000 }}>
                        <View>
                            <Image resizeMode='contain' source={require('../../../../assets/ez-investment-w.png')} style={{ height: 60, width: 160 }} />
                        </View>
                        {!isKeyboardVisible ? (
                            <View style={{ width: '85%' }}>
                                <Text style={{ fontSize: 32, paddingTop: 20, fontWeight: '700', color: 'white' }}>
                                    UAE Most Trusted {'\n'}Service
                                </Text>
                                <Text style={{ fontSize: 16, color: 'white', paddingTop: 20 }}>
                                    Discover opportunities to grow your business together with Abu Dhabi's economy, your top-choice partner.
                                </Text>
                            </View>
                        ) : null}

                    </View>

                </View>

                <View style={{ width: '80%', height: '60%', display: 'flex', justifyContent: 'center' }}>
                    <View >
                        <Text style={{ fontSize: 32, fontWeight: '700' , color : isKeyboardVisible ? 'white' : 'black' }}>
                            Register
                        </Text>
                    </View>
                    <View style={{ height: 20 }}>

                    </View>
                    <View>
                        <TextInput
                            placeholder='Name'
                            onChangeText={(name) => setName(name)}

                            style={{ paddingLeft: 15, height: 52, borderWidth: 1, borderColor: 'gray', borderRadius: 5 }}
                        />
                    </View>
                    <View style={{ height: 20 }}>

                    </View>
                    <View>
                        <TextInput
                            placeholder='Email'
                            onChangeText={(email) => setEmail(email)}
                            style={{ paddingLeft: 15, height: 52, borderWidth: 1, borderColor: 'gray', borderRadius: 5 }}
                        />
                    </View>
                    <View style={{ height: 20 }}>

                    </View>
                    <View>
                        <TextInput
                            placeholder='Password'
                            secureTextEntry={true}
                            onChangeText={(password) => setPassword(password)}
                            style={{ paddingLeft: 15, height: 52, borderWidth: 1, borderColor: 'gray', borderRadius: 5 }}
                        />
                    </View>
                    <View style={{ height: 20 }}>

                    </View>
                    <View>
                        <TextInput
                            placeholder='Confirm Password'
                            secureTextEntry={true}
                            onChangeText={(confirmed_password) => setConfirm_Password(confirmed_password)}
                            style={{ paddingLeft: 15, height: 52, borderWidth: 1, borderColor: 'gray', borderRadius: 5 }}
                        />
                    </View>

                    <View style={{ height: 20 }}>

                    </View>

                    <TouchableOpacity onPress={() => register()}>
                        <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 52, backgroundColor: '#2D59CA', width: '100%', borderRadius: 5 }}>
                            <Text style={{ fontSize: 18, fontWeight: '600', color: 'white' }}>
                                Register
                            </Text>
                        </View>
                    </TouchableOpacity>

                    <View style={{ paddingTop: 20, display: 'flex', flexDirection: 'row' }}>
                        <Text style={{ fontSize: 16, color: 'gray' }}>
                            Already have an account?
                        </Text>
                        <Text style={{ paddingLeft: 5, fontSize: 16, color: 'black', fontWeight: '700' }}>
                            Login
                        </Text>
                    </View>
                </View>

            </View>
        </KeyboardAvoidingView>
    )
}

const mapStateToProps = (state) => {
    return {
        home: state.home.home,
    };
};

export default connect(mapStateToProps, { registerUser })(Register);
