import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import {
    TextInput,
    StyleSheet,
    Text,
    View,
    Button,
    ScrollView,
    FlatList,
} from 'react-native';
import GoalItem from './components/GoalItem';
import GoalInput from './components/GoalInput';

export default function App() {
    const [courseGoals, setCourseGoal] = useState([]);
    const [isAddMode, setIsAddMode] = useState(false);

    const addGoalHandler = (goalTitle) => {
        setCourseGoal((currentGoals) => [
            ...currentGoals,
            {
                id: Math.random().toString(),
                value: goalTitle,
            },
        ]);
        setIsAddMode(false);
    };

    const removeGoalHandler = (goalId) => {
        console.log('TO BE DELETED: ' + goalId);
        console.log(courseGoals);
        setCourseGoal((currentGoals) => {
            return currentGoals.filter((goal) => goal.id !== goalId);
        });
    };

    const cancelGoalAdditionHandler = () => {
        setIsAddMode(false);
    };

    return (
        <View style={styles.screen}>
            <GoalInput
                visible={isAddMode}
                onAddGoal={addGoalHandler}
                onCancel={cancelGoalAdditionHandler}
            />
            <FlatList
                keyExtractor={(item) => item.id}
                data={courseGoals}
                renderItem={(itemData) => (
                    <GoalItem
                        id={itemData.item.id}
                        onDelete={removeGoalHandler}
                        title={itemData.item.value}
                    />
                )}
            />
            <Button
                title='Add New Goal'
                onPress={() => setIsAddMode(!isAddMode)}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    screen: {
        padding: 50,
    },
    input: {
        width: '80%',
        borderColor: 'black',
        borderWidth: 1,
        padding: 10,
    },
    listItem: {
        padding: 10,
        marginVertical: 10,
        backgroundColor: '#ccc',
        borderColor: 'black',
        borderWidth: 1,
    },
});
