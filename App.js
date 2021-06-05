import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react';
import MainStackNavigator from './src/navigation/stack.navigation';
import DrawerNavigator from './src/navigation/drawer.navigation';
import Screens from './src/screens';

const App = () => {
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(async () => {
      setLoading(false);
    }, 1000)
  })

  if (isLoading) return (<Screens.SplashScreen />)
  else return (<MainStackNavigator />)

};

export default App;
