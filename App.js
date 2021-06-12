import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react';
import MainStackNavigator from './src/navigation/stack.navigation';
import DrawerNavigator from './src/navigation/drawer.navigation';
import Screens from './src/screens';
import AppContext from './src/components/context.component';
import TurroAPIUtils from './src/models/turro.api.model'

const App = () => {
  const [isLoading, setLoading] = useState(true);

  const [makes, setMakes] = useState([])
  const [models, setModels] = useState([])

  const getMakes = async () => {
    await TurroAPIUtils.getMakes()
      .then(makes => {
        console.log("Makes -> data", JSON.stringify(makes))
        setMakes(makes)
      })
      .catch((error) => console.error(error))
  }

  const getModels = async () => {
    await TurroAPIUtils.getModels()
      .then(models => {
        console.log("Models -> data", JSON.stringify(models))
        setModels(models)
      })
      .catch((error) => console.error(error))
  }

  const appData = {
    makes: makes,
    models
  };

  useEffect(async () => {
    await getMakes()
    await getModels()
    setTimeout(async () => {
      setLoading(false);
    }, 1000)
  }, [])

  if (isLoading) return (<Screens.SplashScreen />)
  else return (
    <AppContext.Provider value={appData}>
      <MainStackNavigator />
    </AppContext.Provider>
  )

};

export default App;