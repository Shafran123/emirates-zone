import React, { useLayoutEffect, useState } from 'react'
import { View, Text, TextInput, TouchableOpacity, Image, KeyboardAvoidingView, Keyboard } from 'react-native';
import { connect } from 'react-redux';
import { loginUser } from '../../../redux/actions/homeActions';

const Login = (props) => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isKeyboardVisible, setKeyboardVisible] = useState(false);
    const [form_eror, set_form_eror] = useState(false)

    const login = () => {
        set_form_eror(false)
        ///Form Vlaidations
        if (email && password) {
            console.log('valid form');
            let data = {
                email: email,
                password: password
            }

            props.loginUser(data, (responce) => {
                console.log(responce);
                if (responce) {
                    props.navigation.navigate('Home')
                }
            })
        } else {
            console.log('not valid form');
            set_form_eror(true)
        }
    }

    useLayoutEffect(() => {
        set_form_eror(false)

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

    }, [email, password])

    return (
        <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{flex: 1}}>
 
        <View style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flex: 1 }}>

            <View style={{ width: '100%', height: '55%' }}>
                <View style={{ height: '100%', width: '100%', opacity: 0.5, backgroundColor: 'black', position: 'absolute', top: 0, zIndex: 10000 }}>
                    
                </View>
                <Image
                    source={require("../../../../assets/1479041216-507.jpg")}
                    resizeMode="cover"
                    style={{ height: '100%' }}
                />

                <View style={{height: '100%' , width: '100%' , position: 'absolute', top: isKeyboardVisible ? 80 : 160, left: 40, zIndex: 10000}}>
                    <View>
                        <Image resizeMode='contain' source={require('../../../../assets/ez-investment-w.png')} style={{ height: 60, width: 160 }} />
                    </View>
                    <View style={{width: '85%'}}>
                        <Text style={{fontSize: 32 , paddingTop : 20 , fontWeight: '700'  ,color: 'white'}}>
                            UAE Most Trusted {'\n'}Service
                        </Text>
                        <Text style={{fontSize :16 , color: 'white' , paddingTop: 20}}>
                        Discover opportunities to grow your business together with Abu Dhabi's economy, your top-choice partner.
                        </Text>
                    </View>
                </View>

            </View>

            <View style={{ width: '80%', marginBottom: 80 }}>
                <View >
                    <Text style={{ fontSize: 32, fontWeight: '700' }}>
                        Login
                    </Text>
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

                {form_eror ? (
                    <View style={{ marginTop: 10 }}>
                        <Text style={{ color: 'red' }}>
                            Please Enter Email & Password
                        </Text>
                    </View>
                ) : null}

                <View style={{ height: 20 }}>

                </View>

                <TouchableOpacity onPress={() => login()}>
                    <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 52, backgroundColor: '#2D59CA', width: '100%', borderRadius: 5 }}>
                        <Text style={{ fontSize: 18, fontWeight: '600', color: 'white' }}>
                            Login
                        </Text>
                    </View>
                </TouchableOpacity>

                <View style={{paddingTop : 20 , display: 'flex' , flexDirection: 'row'}}>
                    <Text style={{fontSize : 16 , color: 'gray'}}>
                        Dont you have an account? 
                    </Text>
                    <Text style={{paddingLeft: 5, fontSize : 16 , color: 'black' , fontWeight: '700'}}>
                         Sign Up
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

export default connect(mapStateToProps, { loginUser })(Login);
