import { View, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import Routes from './src/routes';

import { AuthProvider } from './src/hooks/auth';
import { AppProvider } from './src/hooks';

export default function App() {
  return (
    <NavigationContainer>
      <AppProvider>
        <StatusBar backgroundColor={"#1d1d2e"} barStyle="light-content" translucent={false} />
        <Routes />
      </AppProvider>
    </NavigationContainer>
  );
}