import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import {
    Alert,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import RNPickerSelect from "react-native-picker-select";

const AddTimerScreen = () => {
    const [name, setName] = useState("");
    const [duration, setDuration] = useState("");
    const [category, setCategory] = useState("");
    const navigation = useNavigation();

    // Save Timer to AsyncStorage
    const saveTimer = async () => {
        if (!name || !duration || !category) {
            Alert.alert("Error", "Please fill all fields before saving.");
            return;
        }

        try {
            const newTimer = {
                name,
                duration: parseInt(duration),
                category,
                remainingTime: parseInt(duration),
                status: "Idle",
            };

            const existingTimers = await AsyncStorage.getItem("timers");
            const timers = existingTimers ? JSON.parse(existingTimers) : [];

            timers.push(newTimer);
            await AsyncStorage.setItem("timers", JSON.stringify(timers));
            Alert.alert("Success", "Timer added successfully!");
            navigation.goBack(); // Navigate back to Home Screen
        } catch (error) {
            console.error("Error saving timer:", error);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Add New Timer</Text>

            {/* Timer Name Input */}
            <Text style={styles.label}>Timer Name</Text>
            <TextInput
                style={styles.input}
                placeholder="Enter timer name"
                value={name}
                onChangeText={setName}
            />

            {/* Duration Input */}
            <Text style={styles.label}>Duration (seconds)</Text>
            <TextInput
                style={styles.input}
                placeholder="Enter duration"
                keyboardType="numeric"
                value={duration}
                onChangeText={setDuration}
            />

            {/* Category Dropdown */}
            <Text style={styles.label}>Category</Text>
            <RNPickerSelect
                onValueChange={(value) => setCategory(value)}
                items={[
                    { label: "Workout", value: "Workout" },
                    { label: "Study", value: "Study" },
                    { label: "Break", value: "Break" },
                    { label: "react", value: "react" },
                    { label: "developing", value: "developing" },
                    { label: "first round", value: "first round" },

                ]}
                placeholder={{ label: "Select a category...", value: category }}
                style={pickerSelectStyles}
            />

            {/* Save Button */}
            <TouchableOpacity style={styles.saveButton} onPress={saveTimer}>
                <Text style={styles.saveButtonText}>Save Timer</Text>
            </TouchableOpacity>
        </View>
    );
};

export default AddTimerScreen;

// Styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: "#F8F9FA",
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 20,
    },
    label: {
        fontSize: 16,
        fontWeight: "bold",
        marginTop: 10,
        marginBottom: 5,
    },
    input: {
        backgroundColor: "#FFFFFF",
        padding: 12,
        borderRadius: 8,
        fontSize: 16,
        borderWidth: 1,
        borderColor: "#ddd",
    },
    saveButton: {
        backgroundColor: "#007BFF",
        padding: 15,
        borderRadius: 8,
        marginTop: 20,
        alignItems: "center",
    },
    saveButtonText: {
        color: "#FFFFFF",
        fontSize: 18,
        fontWeight: "bold",
    },
});

// Picker Select Styles
const pickerSelectStyles = {
    inputIOS: {
        backgroundColor: "#FFFFFF",
        padding: 12,
        borderRadius: 8,
        fontSize: 16,
        borderWidth: 1,
        borderColor: "#ddd",

        marginBottom: 10,
    },
    inputAndroid: {
        backgroundColor: "#FFFFFF",
        padding: 12,
        borderRadius: 8,
        fontSize: 16,
        borderWidth: 1,
        borderColor: "#ddd",
        marginBottom: 10,
    },
};
