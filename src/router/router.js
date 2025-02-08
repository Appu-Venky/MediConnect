import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import AddTimerScreen from '../screens/add_timer_screen';
import BottomNav from '../screens/Bottom_nav';
import HistoryScreen from '../screens/history_screen';
import HomeScreen from '../screens/home_screen';
import SplashScreen from '../screens/splash_screen';

const Stack = createStackNavigator();

const AppRouter = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName='splashscreen'>
                <Stack.Screen name="splashscreen" component={SplashScreen} options={{ headerShown: false }} />
                <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
                <Stack.Screen name="History" component={HistoryScreen} options={{ headerShown: false }} />
                <Stack.Screen name="AddTimer" component={AddTimerScreen} options={{ headerShown: false }} />
                <Stack.Screen name="BottomNav" component={BottomNav} options={{ headerShown: false }} />


            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default AppRouter;
