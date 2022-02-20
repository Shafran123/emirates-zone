import React, { useState } from 'react'
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { registerUser } from '../../../redux/actions/homeActions';

const Register = (props) => {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirm_password, setConfirm_Password] = useState('')

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
        if(password === confirm_password){
            console.log('password match');
            return true
        }else{
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
                    let data ={ 
                        name :name,
                        email : email,
                        password : password,
                        password_confirmation : confirm_password
                    }
                    props.registerUser(data, (responce) => {
                        console.log(responce);
                        if(responce){
                            props.naviagtion.navigate('Home')
                        }
                    })
            }


        } else {
            console.log('form not completed');
        }

    }

    return (
        <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flex: 1 }}>
            <View style={{ width: '80%' }}>
                <View >
                    <Text style={{ fontSize: 24, fontWeight: '600' }}>
                        Register
                    </Text>
                </View>
                <View style={{ height: 20 }}>

                </View>
                <View>
                    <TextInput
                        placeholder='Name'
                        onChangeText={(name) => setName(name)}
                        autoFocus={true}
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
                    <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 52, backgroundColor: 'red', width: '100%', borderRadius: 5 }}>
                        <Text>
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

export default connect(mapStateToProps, { registerUser })(Register);
