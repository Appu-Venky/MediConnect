import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import { Platform, ProgressBarAndroid, ProgressViewIOS, StyleSheet, Text, TextInput, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

const HistoryScreen = () => {
    const [timers, setTimers] = useState([]);
    const [searchQuery, setSearchQuery] = useState(""); // Search input state

    useEffect(() => {
        loadTimers();
    }, []);

    const loadTimers = async () => {
        try {
            const savedTimers = await AsyncStorage.getItem("timers");
            if (savedTimers) {
                const timers = JSON.parse(savedTimers);
                setTimers(timers);
            }
        } catch (error) {
            console.error("Error loading timers:", error);
        }
    };

    // Group timers into running and completed categories
    const groupedTimers = timers.reduce((acc, timer) => {
        if (timer.remainingTime > 0) {
            acc.running.push(timer);
        } else {
            acc.completed.push(timer);
        }
        return acc;
    }, { running: [], completed: [] });

    // Apply search filter
    const filteredRunningTimers = groupedTimers.running.filter(timer =>
        timer.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const filteredCompletedTimers = groupedTimers.completed.filter(timer =>
        timer.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <View style={styles.container}>
            <Text style={styles.title}>History</Text>

            {/* Search Input Field */}
            <TextInput
                style={styles.searchInput}
                placeholder="Search Categories..."
                placeholderTextColor={color="black"}
                value={searchQuery}
                onChangeText={setSearchQuery}
            />

            <ScrollView>
                <Text style={styles.categoryTitle}>Running Timers</Text>
                {filteredRunningTimers.length > 0 ? (
                    filteredRunningTimers.map((timer, index) => {
                        const progress = timer.initialTime ? timer.remainingTime / timer.initialTime : 0;
                        return (
                            <View key={index} style={styles.timerCard}>
                                <Text style={styles.timerName}>{timer.name}</Text>
                                <Text style={styles.timerDetail}>
                                    ⏳ Remaining Time: {timer.remainingTime}s
                                </Text>
                                <Text style={styles.runningText}>Status: Running</Text>

                                {Platform.OS === "android" ? (
                                    <ProgressBarAndroid
                                        styleAttr="Horizontal"
                                        indeterminate={false}
                                        progress={progress}
                                        color="#007BFF"
                                        style={styles.progressBar}
                                    />
                                ) : (
                                    <ProgressViewIOS
                                        progress={progress}
                                        progressTintColor="#007BFF"
                                        style={styles.progressBar}
                                    />
                                )}
                            </View>
                        );
                    })
                ) : (
                    <Text style={styles.noResults}>No running timers found</Text>
                )}

                <Text style={styles.categoryTitle}>Completed Timers</Text>
                {filteredCompletedTimers.length > 0 ? (
                    filteredCompletedTimers.map((timer, index) => (
                        <View key={index} style={styles.timerCard}>
                            <Text style={styles.timerName}>{timer.name}</Text>
                            <Text style={styles.timerDetail}>
                                ⏳ Completed Time: {timer.initialTime}s
                            </Text>
                            <Text style={styles.completedText}>Status: Completed</Text>

                            {Platform.OS === "android" ? (
                                <ProgressBarAndroid
                                    styleAttr="Horizontal"
                                    indeterminate={false}
                                    progress={1}
                                    color="#28A745"
                                    style={styles.progressBar}
                                />
                            ) : (
                                <ProgressViewIOS
                                    progress={1}
                                    progressTintColor="#28A745"
                                    style={styles.progressBar}
                                />
                            )}
                        </View>
                    ))
                ) : (
                    <Text style={styles.noResults}>No completed timers found</Text>
                )}

            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: "#F8F9FA",
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 15,
    },
    searchInput: {
        height: 40,
        borderColor: "#ccc",
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 10,
        marginBottom: 10,
        backgroundColor: "#fff",
    },
    categoryTitle: {
        fontSize: 18,
        fontWeight: "bold",
        marginTop: 20,
    },
    timerCard: {
        backgroundColor: "#FFFFFF",
        padding: 15,
        borderRadius: 10,
        marginVertical: 5,
        elevation: 3,
    },
    timerName: {
        fontSize: 18,
        fontWeight: "bold",
    },
    timerDetail: {
        fontSize: 14,
        color: "#555",
        marginBottom: 5,
    },
    runningText: {
        color: "#007BFF",
        fontWeight: "bold",
    },
    completedText: {
        color: "#28A745",
        fontWeight: "bold",
    },
    progressBar: {
        height: 10,
        marginTop: 5,
    },
    noResults: {
        fontSize: 16,
        color: "#888",
        textAlign: "center",
        marginTop: 10,
    },
});

export default HistoryScreen;
