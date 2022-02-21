import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { Provider } from 'react-redux';
import AuthLoading from './src/components/Auth/AuthLoading';
import AppNavigator from './src/components/Navigaiton/AppNavigator';
import store from './src/redux/store';
import { NativeBaseProvider, Box } from "native-base";

export default function App() {
  return (
   <>
       <NativeBaseProvider>
       <Provider store={store}>
       <StatusBar style="dark" />
          <AppNavigator />
       </Provider>
       </NativeBaseProvider>
   </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
