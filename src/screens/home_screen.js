import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  Platform,
  ProgressBarAndroid,
  ProgressViewIOS,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import StopWatchScreen from "./stopwatch_screen";

const HomeScreen = () => {
  const [timers, setTimers] = useState([]);
  const [expandedCategories, setExpandedCategories] = useState({});
  const navigation = useNavigation();

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", loadTimers);
    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    const interval = setInterval(() => {
      updateTimers();
    }, 1000); // Update every second

    return () => clearInterval(interval);
  }, [timers]);

  const loadTimers = async () => {
    try {
      const savedTimers = await AsyncStorage.getItem("timers");
      if (savedTimers) {
        const parsedTimers = JSON.parse(savedTimers);
        setTimers(parsedTimers);
      }
    } catch (error) {
      console.error("Error loading timers:", error);
    }
  };

  const updateTimers = () => {
    const updatedTimers = timers.map((timer) => {
      if (timer.remainingTime > 0) {

        return {
          ...timer,
          remainingTime: Math.max(0, timer.remainingTime - 1),
        };


      }
      return timer; // No update for completed timers
    });
    setTimers(updatedTimers);
    saveTimers(updatedTimers); // Save timers after updating
  };

  const saveTimers = async (updatedTimers) => {
    try {
      await AsyncStorage.setItem("timers", JSON.stringify(updatedTimers));
      setTimers(updatedTimers);
    } catch (error) {
      console.error("Error saving timers:", error);
    }
  };

  const clearTimer = (index) => {
    const updatedTimers = timers.filter((_, i) => i !== index);
    saveTimers(updatedTimers);
  };

  const toggleCategory = (category) => {
    setExpandedCategories((prev) => ({
      ...prev,
      [category]: !prev[category],
    }));
  };

  const groupedTimers = timers.reduce((acc, timer) => {
    acc[timer.category] = acc[timer.category] || [];
    acc[timer.category].push(timer);
    return acc;
  }, {});

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Medi Clock</Text>

      <ScrollView>

        <StopWatchScreen />


        {Object.keys(groupedTimers).map((category, idx) => (
          <View key={idx}>
            <TouchableOpacity
              style={styles.categoryHeader}
              onPress={() => toggleCategory(category)}
            >
              <Text style={styles.categoryTitle}>{category}</Text>
              <Text style={styles.expandText}>
                {expandedCategories[category] ? "▲" : "▼"}
              </Text>
            </TouchableOpacity>

            {expandedCategories[category] &&
              groupedTimers[category].map((timer, index) => {
                const progress = timer.initialTime
                  ? timer.remainingTime / timer.initialTime
                  : 0;
                const isCompleted = timer.remainingTime <= 0;

                
                return (
                  <View key={index} style={styles.timerCard}>
                    <Text style={styles.timerName}>{timer.name}</Text>
                    <Text style={styles.timerDetail}>
                      ⏳ Remaining Time: {timer.remainingTime}s
                    </Text>
                    <Text
                      style={[
                        styles.timerDetail,
                        isCompleted ? styles.completedText : styles.runningText,
                      ]}
                    >
                      🔄 Status: {isCompleted ? "Completed" : "Running"}
                    </Text>

                    {Platform.OS === "android" ? (
                      <ProgressBarAndroid
                        styleAttr="Horizontal"
                        indeterminate={false}
                        progress={progress}
                        color={isCompleted ? "#28A745" : "#007BFF"}
                        style={styles.progressBar}
                      />
                    ) : (
                      <ProgressViewIOS
                        progress={progress}
                        progressTintColor={isCompleted ? "#28A745" : "#007BFF"}
                        style={styles.progressBar}
                      />
                    )}

                    <TouchableOpacity
                      style={styles.clearButton}
                      onPress={() => clearTimer(index)}
                    >
                      <Text style={styles.buttonText}>Clear</Text>
                    </TouchableOpacity>
                  </View>
                );
              })}
          </View>
        ))}
      </ScrollView>
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate("AddTimer")}
      >
        <Text style={styles.addButtonText}>+ Add Timer</Text>
      </TouchableOpacity>
    </View>
  );
};

export default HomeScreen;

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
    marginBottom: 15,

  },
  categoryHeader: {
    backgroundColor: "#007BFF",
    padding: 12,
    borderRadius: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 5,
    marginTop: 15
  },
  categoryTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  expandText: {
    fontSize: 18,
    color: "#FFFFFF",
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
  clearButton: {
    backgroundColor: "#F44336",
    padding: 8,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 5,
  },
  buttonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
  },
  addButton: {
    backgroundColor: "darkgreen",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 20,
  },
  addButtonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
  },
});
