import {
  ScrollView,
  Pressable,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Entypo } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { theme } from "@/constants/Colors";

type Todo = {
  checked: boolean;
  text: string;
  working: boolean;
};
type Todos = {
  [key: string]: Todo;
};
type Props = {
  toDos: Todos;
  working: boolean;
  completeTodo: (id: number | string) => void;
  deleteTodo: (id: number | string) => void;
  checked: boolean;
};
const ScrollViewComponent = ({
  toDos,
  working,
  checked,
  completeTodo,
  deleteTodo,
}: Props) => {
  return (
    <ScrollView>
      {Object.keys(toDos).map((index) =>
        toDos[index].working === working ? (
          <View style={styles.todo} key={index}>
            <Pressable
              style={[
                styles.checkboxBase,
                toDos[index].checked && styles.checkboxChecked,
              ]}
              onPress={() => completeTodo(index)}
            >
              {toDos[index].checked && (
                <Entypo name="check" size={22} color="white" />
              )}
            </Pressable>
            <Text
              style={[
                styles.todoText,
                toDos[index].checked && styles.completeTodo,
              ]}
            >
              {toDos[index].text}
            </Text>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => deleteTodo(index)}
            >
              <Feather name="trash-2" size={22} color="#aaa" />
            </TouchableOpacity>
          </View>
        ) : null
      )}
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  todo: {
    backgroundColor: theme.todoBg,
    marginBottom: 10,
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  todoText: {
    fontSize: 14,
    color: "#fff",
    fontWeight: "600",
  },
  checkboxBase: {
    width: 24,
    height: 24,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
    borderWidth: 2,
    borderColor: "white",
    backgroundColor: "transparent",
  },
  checkboxChecked: {
    alignItems: "center",
  },
  completeTodo: {
    textDecorationLine: "line-through",
    color: "#aaa",
  },
});
export default ScrollViewComponent;
