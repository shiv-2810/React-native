import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { useSelector } from "react-redux";
import { selectBasketItems, selectBasketTotal } from "../features/basketSlice";
import { useNavigation } from "@react-navigation/native";

const BasketIcon = () => {
  const items = useSelector(selectBasketItems);
  const navigation = useNavigation();
  const basketTotal = useSelector(selectBasketTotal);
  if (items.length == 0) return;
  return (
    <View className="absolute bottom-10 w-full z-50">
      <TouchableOpacity
        onPress={() => navigation.navigate("Basket")}
        className="mx-5 bg-[#00CCBB] flex-row items-center p-4 justify-between rounded-lg"
      >
        <Text className="text-white font-extrabold text-lg text-center">
          {items.length} items | ₹{basketTotal}
        </Text>
        <Text className="text-white font-extrabold text-lg text-center">
          View Basket
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default BasketIcon;
