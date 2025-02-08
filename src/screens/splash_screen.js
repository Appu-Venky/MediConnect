import { useNavigation } from "@react-navigation/native";
import React, { useEffect } from "react";
import { Animated, Easing, StyleSheet, View } from "react-native";

const SplashScreen = () => {
    const navigation = useNavigation();
    const rotateAnim = new Animated.Value(0);
    const fadeAnim = new Animated.Value(0);
    const translateYAnim = new Animated.Value(50);

    useEffect(() => {
        // Rotate Animation (Clock Icon)
        Animated.loop(
            Animated.timing(rotateAnim, {
                toValue: 1,
                duration: 2000,
                easing: Easing.linear,
                useNativeDriver: true,
            })
        ).start();

        // Fade In & Slide Up Animation
        Animated.parallel([
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 1000,
                useNativeDriver: true,
            }),
            Animated.timing(translateYAnim, {
                toValue: 0,
                duration: 1000,
                useNativeDriver: true,
            }),
        ]).start();

        // Navigate after 3 seconds
        setTimeout(() => {
            navigation.replace("BottomNav");
        }, 3000);
    }, []);

    const rotateInterpolate = rotateAnim.interpolate({
        inputRange: [0, 1],
        outputRange: ["0deg", "360deg"],
    });

    return (
        <View style={styles.container}>
            {/* Rotating Clock Icon */}
            <Animated.Image
                source={{ uri: "https://cdn-icons-png.flaticon.com/512/25/25438.png" }}
                style={[styles.clockIcon, { transform: [{ rotate: rotateInterpolate }] }]}
            />

            {/* Welcome Text */}
            <Animated.Text
                style={[
                    styles.text,
                    { opacity: fadeAnim, transform: [{ translateY: translateYAnim }] },
                ]}
            >
                MediConnect Pro
            </Animated.Text>
        </View>
    );
};

export default SplashScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "skyblue",
        alignItems: "center",
        justifyContent: "center",
    },
    clockIcon: {
        width: 100,
        height: 100,
        marginBottom: 20,
        color: "red",
    },
    text: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#FFFFFF",
    },
});
