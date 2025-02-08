import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import { Image, StyleSheet } from 'react-native';
import HistoryScreen from './history_screen';
import HomeScreen from './home_screen';

// Bottom Tab Navigation Component
const Tab = createBottomTabNavigator();

const BottomNav = () => {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ color, size }) => {
                    let iconSource;

                    // Choose image source based on route name
                    if (route.name === 'Home') {
                        iconSource = require('../assests/home.png'); // Local image for Home
                    } else if (route.name === 'History') {
                        iconSource = require('../assests/history.png'); // Local image for History
                    }

                    return (
                        <Image
                            source={iconSource}
                            style={[route.name === 'History' ? styles.icon : styles.icon1]}
                        />
                    );
                },
                tabBarActiveTintColor: 'green',  // Active tab color
                tabBarInactiveTintColor: 'black',  // Inactive tab color
                tabBarStyle: styles.tabBar, // Custom tab bar styles
                headerShown: false,  // Hide the header for all screens
                tabBarLabelStyle: styles.tabBarLabel, // Custom label style
                paddingBottom: 10
            })}
        >
            <Tab.Screen name="Home" component={HomeScreen} />
            <Tab.Screen name="History" component={HistoryScreen} />
        </Tab.Navigator>
    );
};

const styles = StyleSheet.create({
    tabBar: {
        backgroundColor: '#ffffff', // Tab bar background color
        borderTopWidth: 0,
        elevation: 10, // Shadow effect for a modern look
        borderRadius: 15,
        height: 70, // Height of the tab bar
        paddingBottom: 10,
    },
    tabBarLabel: {
        fontSize: 12,  // Font size for the labels
        fontWeight: 'bold',
        marginBottom: 5,
    },
    icon: {
        width: 22,
        height: 22,
        resizeMode: 'contain',  // To preserve aspect ratio of the icons

    },
    icon1: {
        width: 28,
        height: 28,
        resizeMode: 'contain',  // To preserve aspect ratio of the icons
    },
});

export default BottomNav;
