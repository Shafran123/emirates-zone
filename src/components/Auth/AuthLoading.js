import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect } from 'react'
import { View ,Text } from 'react-native';
import { connect } from 'react-redux';

const AuthLoading = (props) => {

  useEffect(() => {
    _bootstrapAsync()

  }, [])
  

  const _bootstrapAsync = async () => {
    const userToken = await AsyncStorage.getItem('token')
    props.navigation.navigate(userToken ? 'Home' : 'MainAuth')
  }

  return (
      <View>
          <Text>
          AuthLoading
          </Text>
      </View>
  )
}

const mapStateToProps = (state) => {
    return {
      home: state.home.home,
    };
  };

export default connect(mapStateToProps, {  })(AuthLoading);
  