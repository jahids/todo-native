import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from "react-native";
import { IconButton } from "react-native-paper";
import { v4 as uuidv4 } from "uuid";

const TodoScreen = () => {
  const [task, setTask] = useState("");
  const [taskList, setTaskList] = useState([]);
  const [editedTask, setEditedTask] = useState(null);

  const handleAddTask = () => {
    if (task === "") {
      return;
    }

    setTaskList([...taskList, { id: uuidv4(), title: task }]);
    setTask("");
  };

  const handleDeleteTask = (id) => {
    const updatedTaskList = taskList.filter((task) => task.id !== id);
    setTaskList(updatedTaskList);
  };

  const handleEditTask = (task) => {
    setEditedTask(task);
    setTask(task.title);
  };

  const handleUpdateTask = () => {
    const updatedTasks = taskList.map((item) => {
      if (item.id === editedTask.id) {
        return { ...item, title: task };
      }
      return item;
    });
    setTaskList(updatedTasks);
    setEditedTask(null);
    setTask("");
  };

  const renderTasks = ({ item, index }) => (
    <View style={styles.taskContainer}>
      <Text style={styles.taskText}>{item.title}</Text>
      <IconButton
        icon="pencil"
        color="#fff"
        size={20}
        onPress={() => handleEditTask(item)}
      />
      <IconButton
        icon="delete"
        color="#fff"
        size={20}
        onPress={() => handleDeleteTask(item.id)}
      />
    </View>
  );

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Add a task"
        value={task}
        onChangeText={(text) => setTask(text)}
      />
      {editedTask ? (
        <TouchableOpacity style={styles.button} onPress={handleUpdateTask}>
          <Text style={styles.buttonText}>Save</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity style={styles.button} onPress={handleAddTask}>
          <Text style={styles.buttonText}>Add</Text>
        </TouchableOpacity>
      )}

      <FlatList
        data={taskList}
        renderItem={renderTasks}
        keyExtractor={(item) => item.id}
      />

      {taskList.length <= 0 && <Text>No tasks added</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
    marginTop: 40,
  },
  input: {
    borderWidth: 2,
    borderColor: "#000",
    borderRadius: 6,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  button: {
    backgroundColor: "#000",
    borderRadius: 6,
    paddingVertical: 12,
    marginVertical: 34,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 3,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 20,
  },
  taskContainer: {
    backgroundColor: "#1e90ff",
    borderRadius: 6,
    paddingHorizontal: 6,
    paddingVertical: 8,
    marginBottom: 12,
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 3,
  },
  taskText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "800",
    flex: 1,
  },
});

export default TodoScreen;
