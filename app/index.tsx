import { View, TextInput, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StatusBar } from "expo-status-bar";
import { theme } from "@/constants/Colors";
import React, { useEffect, useState } from "react";
import ScrollViewComponent from "@/components/ScrollViewComponent";
import HeaderTab from "@/components/HeaderTab";
type Todo = {
  checked: boolean;
  text: string;
  working: boolean;
};
type Todos = {
  [key: string]: Todo;
};

type TabState = {
  tabState: boolean;
};

const STORAGE_KEY = "@toDos";
const STATE_KEY = "@tabState";
export default function index() {
  const [working, setWorking] = useState(true);
  const [text, setText] = useState("");
  const [toDos, setToDos] = useState<Todos>({});
  const [checked, setChecked] = useState(false);
  const travel = () => {
    setWorking(false);
    saveTabState(false);
  };
  const work = () => {
    setWorking(true);
    saveTabState(true);
  };
  const saveToDos = async (toSave: Todos) => {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(toSave));
  };
  const saveTabState = async (state: boolean) => {
    const tab = { tabState: state };
    await AsyncStorage.setItem(STATE_KEY, JSON.stringify(tab));
  };
  const loadTabState = async () => {
    const state: string | null = await AsyncStorage.getItem(STATE_KEY);
    if (state) {
      const { tabState }: TabState = JSON.parse(state);
      setWorking(tabState);
    }
  };
  useEffect(() => {
    loadToDos();
    loadTabState();
  }, []);
  const loadToDos = async () => {
    const item: string | null = await AsyncStorage.getItem(STORAGE_KEY);
    if (item) setToDos(JSON.parse(item));
  };
  const onChangeTextInput = (e: any) => {
    setText(e);
  };
  const onAddToDo = async () => {
    if (!text) return;

    const newToDos = {
      ...toDos,
      [Date.now()]: { text, working, checked: false },
    };
    setToDos(newToDos);
    await saveToDos(newToDos);
    setText("");
  };
  const completeToDo = async (id: number | string) => {
    const newToDos: Todos = { ...toDos };
    if (newToDos[id]) newToDos[id].checked = !newToDos[id].checked;
    setToDos(newToDos);
    await saveToDos(newToDos);
  };
  const deleteToDo = async (id: number | string) => {
    const newToDos: Todos = { ...toDos };
    delete newToDos[id];
    setToDos(newToDos);
    await saveToDos(newToDos);
  };
  return (
    <View style={styles.container}>
      <StatusBar style="auto" hidden />
      <HeaderTab work={work} working={working} travel={travel} />
      <View>
        <TextInput
          onChangeText={onChangeTextInput}
          onSubmitEditing={onAddToDo}
          placeholder={working ? "Add a To Do" : "Where do you want to go "}
          value={text}
          style={styles.input}
          returnKeyType="done"
        />
      </View>
      <ScrollViewComponent
        checked={checked}
        toDos={toDos}
        working={working}
        completeTodo={completeToDo}
        deleteTodo={deleteToDo}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.bg,
    paddingHorizontal: 20,
  },
  input: {
    backgroundColor: "#fff",
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginVertical: 20,
    borderRadius: 10,
    fontSize: 16,
  },
});
