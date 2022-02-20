import React, { useLayoutEffect, useState } from 'react'
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { loginUser } from '../../../redux/actions/homeActions';

const Login = (props) => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [form_eror, set_form_eror] = useState(false)

    const login = () => {
        set_form_eror(false)
        ///Form Vlaidations
        if (email && password) {
            console.log('valid form');
            let data ={ 
                email : email,
                password :password
            }

            props.loginUser(data ,(responce) => {
                console.log(responce);
                if(responce){
                    props.navigation.navigate('Home')
                }
            })
        }else{
            console.log('not valid form');
            set_form_eror(true)
        }
    }

    useLayoutEffect(() => {
        set_form_eror(false)
    }, [email , password])

    return (
        <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flex: 1 }}>
            <View style={{ width: '80%' }}>
                <View >
                    <Text style={{ fontSize: 24, fontWeight: '600' }}>
                        Login
                    </Text>
                </View>
                <View style={{ height: 20 }}>

                </View>
                <View>
                    <TextInput
                        placeholder='Email'
                        onChangeText={(email) => setEmail(email)}
                        style={{ paddingLeft : 15, height: 52, borderWidth: 1, borderColor: 'gray', borderRadius: 5 }}
                    />
                </View>
                <View style={{ height: 20 }}>

                </View>
                <View>
                    <TextInput
                        placeholder='Password'
                        secureTextEntry={true}
                        onChangeText={(password) => setPassword(password)}
                        style={{ paddingLeft : 15, height: 52, borderWidth: 1, borderColor: 'gray', borderRadius: 5 }}
                    />
                </View>

                {form_eror  ? (
                    <View style={{marginTop : 10 }}>
                        <Text style={{color : 'red'}}>
                            Please Enter Email & Password
                        </Text>
                        </View>
                ) : null}

                <View style={{ height: 20 }}>

                </View>

                <TouchableOpacity onPress={() => login()}>
                    <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 52, backgroundColor: 'green', width: '100%', borderRadius: 5 }}>
                        <Text>
                            Login
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

export default connect(mapStateToProps, {loginUser})(Login);
