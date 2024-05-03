import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import DataTile from "./DataTile";
import { DataApi } from "../api/Api";

function Garden({ garden, gardenBuddy, userId, handleCloseViewGardenBuddy }) {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const intervalId = setInterval(() => {
      getData();
    }, 3000);

    return () => clearInterval(intervalId);
  }, []);

  const getData = async () => {
    try {
      setLoading(true);
      const response = await DataApi.getUserGardenData(garden.id);
      setData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.button}
          onPress={handleCloseViewGardenBuddy}
        >
          <Text style={styles.buttonText}>Back</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.container}>
        {loading && !data && <ActivityIndicator size="large" color="#2ECC71" />}

        {data && (
          <>
            <DataTile
              name="Height"
              currentValue={data.curr_height}
              currentUnit="cm"
              idealValue={data.curr_height}
              idealUnit="cm"
            />
            <DataTile
              name="Temperature"
              currentValue={data.curr_temperature}
              currentUnit="°C"
              idealValue={data.ideal_temperature}
              idealUnit="°C"
            />
            <DataTile
              name="Moisture"
              currentValue={data.curr_moisture}
              currentUnit="%"
              idealValue={data.ideal_moisture}
              idealUnit="%"
            />
            <DataTile
              name="PH"
              currentValue={data.curr_ph}
              currentUnit="pH"
              idealValue={data.ideal_ph}
              idealUnit="pH"
            />
            <DataTile
              name="Salinity"
              currentValue={data.curr_salinity}
              currentUnit="SA"
              idealValue={data.ideal_salinity}
              idealUnit="SA"
            />
            <DataTile
              name="Brightness"
              currentValue={data.curr_brightness}
              currentUnit="🔅"
              idealValue={data.curr_brightness}
              idealUnit="🔅"
            />
          </>
        )}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#2ECC71",
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#2ECC71",
  },
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingHorizontal: 10,
  },
});

export default Garden;
