import React, { useEffect, useState } from 'react';
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

// Get screen width and height for responsive design
const { width, height } = Dimensions.get('window');

const StopwatchScreen = ({ navigation }) => {
    const [time, setTime] = useState(0);
    const [isRunning, setIsRunning] = useState(false);

    useEffect(() => {
        let interval;
        if (isRunning) {
            interval = setInterval(() => {
                setTime(prevTime => prevTime + 1);
            }, 1000);
        } else {
            clearInterval(interval);
        }
        return () => clearInterval(interval);
    }, [isRunning]);

    const startStopwatch = () => {
        setIsRunning(true); // Start the stopwatch
    };

    const pauseStopwatch = () => {
        setIsRunning(false); // Pause the stopwatch
    };

    const resetStopwatch = () => {
        setIsRunning(false); // Stop the stopwatch
        setTime(0); // Reset time to zero
    };

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes < 10 ? '0' : ''}${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
    };

    return (
        <View style={styles.container}>
            <Text style={styles.timer}>{formatTime(time)}</Text>
            {/* Timer Buttons */}
            <View style={styles.buttonContainer}>
                <View style={styles.rightButtonsContainer}>
                    <TouchableOpacity
                        style={[styles.button, { backgroundColor: 'skyblue', borderTopRightRadius: 30, borderBottomRightRadius: 30 }]}
                        onPress={pauseStopwatch}
                    >
                        <Text style={styles.buttonText}>Pause</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.startButton]}
                        onPress={startStopwatch}
                    >
                        {isRunning ? <Text style={styles.buttonText}>Running</Text> : <Text style={styles.buttonText}>Start</Text>}
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.button, { backgroundColor: 'skyblue', borderTopLeftRadius: 30, borderBottomLeftRadius: 30 }]}
                        onPress={resetStopwatch}
                    >
                        <Text style={styles.buttonText}>Reset</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    timer: {
        fontSize: height * 0.1, // responsive font size
        color: '#333',
        fontWeight: 'bold',
        marginBottom: height * 0.05, // spacing below the timer
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        width: '100%',
        marginTop: height * 0.05,
    },
    startButton: {
        backgroundColor: 'darkgreen',
        paddingVertical: height * 0.05,
        paddingHorizontal: width * 0.1,
        borderRadius: 50,
    },
    rightButtonsContainer: {
        flexDirection: "row-reverse",
        justifyContent: 'center',
        width: '100%',
    },
    button: {
        flex: 1,
        paddingVertical: height * 0.01,
        marginHorizontal: width * 0.03,
        borderRadius: 10, // default radius for buttons
        justifyContent: 'center',
        alignItems: 'center',

    },
    buttonText: {
        color: '#fff',
        fontSize: height * 0.025, // responsive font size
        fontWeight: '600',
    },
});

export default StopwatchScreen;
