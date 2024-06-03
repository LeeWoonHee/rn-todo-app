import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { theme } from "@/constants/Colors";

type Props = {
  work: () => void;
  travel: () => void;
  working: boolean;
};

const HeaderTab = ({ work, travel, working }: Props) => {
  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={work} activeOpacity={0.7}>
        <Text
          style={{
            ...styles.btnText,
            color: working ? "#fff" : theme.gray,
          }}
        >
          Work
        </Text>
      </TouchableOpacity>
      <TouchableOpacity activeOpacity={0.7} onPress={travel}>
        <Text
          style={{
            ...styles.btnText,
            color: !working ? "#fff" : theme.gray,
          }}
        >
          Travel
        </Text>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  header: {
    justifyContent: "space-between",
    flexDirection: "row",
    marginTop: 30,
  },
  btnText: {
    fontSize: 36,
    color: "#fff",
    fontWeight: "600",
  },
});
export default HeaderTab;
