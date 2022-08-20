import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { selectRestaurant } from "../features/restaurantSlice";
import {
  removeFrombasket,
  selectBasketItems,
  selectBasketTotal,
} from "../features/basketSlice";
import { XCircleIcon } from "react-native-heroicons/outline";
import { urlFor } from "../sanity";

const BasketScreen = () => {
  const navigation = useNavigation();
  const restaurant = useSelector(selectRestaurant);
  const items = useSelector(selectBasketItems);
  const basketTotal = useSelector(selectBasketTotal);
  const dispatch = useDispatch();
  const [groupedItemInBaskets, setGroupedItemsInBaskets] = useState([]);
  useEffect(() => {
    const groupedItems = items.reduce((results, item) => {
      (results[item.id] = results[item.id] || []).push(item);
      return results;
    }, {});
    setGroupedItemsInBaskets(groupedItems);
  }, [items]);
  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="bg-gray-100 flex-1">
        <View className="p-5 border-b border-[#00CCBB] bg-white shadow-xs">
          <View>
            <Text className="text-lg font-bold text-center">Basket</Text>
            <Text className="text-center text-gray-400">
              {restaurant.title}
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            className="rounded-full bg-gray-100 absolute top-5 right-5"
          >
            <XCircleIcon color="#00CCBB" height={40} width={40} />
          </TouchableOpacity>
        </View>
        <View className="flex-row items-center px-4 py-3 bg-white space-x-4 my-5">
          <Image
            source={{
              uri: "https://links.papareact.com/wru",
            }}
            className="h-7 w-7 bg-gray-300 p-4 rounded-full"
          />
          <Text className="flex-1">Deliver in 50-75 mins</Text>
          <TouchableOpacity>
            <Text className="text-[#00CCBB]">Change</Text>
          </TouchableOpacity>
        </View>
        <ScrollView className="divide-y divide-gray-200">
          {Object.entries(groupedItemInBaskets).map(([key, items]) => (
            <View
              key={key}
              className="flex-row items-center space-x-3 bg-white py-2 px-5"
            >
              <Text className="text-[#00CCBB]">{items.length} ✕</Text>
              <Image
                source={{
                  uri: urlFor(items[0]?.image).url(),
                }}
                className="h-12 w-12 rounded-full"
              />
              <Text className="flex-1">{items[0].name}</Text>
              <Text className="text-gray-600">
                ₹ {items[0].price * items.length}
              </Text>
              <TouchableOpacity>
                <Text
                  className="text-[#00CCBB]"
                  onPress={() => dispatch(removeFrombasket({ id: key }))}
                >
                  Remove
                </Text>
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>
        <View className="p-5 bg-white mt-5 space-y-4">
          <View className="flex-row items-center justify-between">
            <Text className="text-gray-400">Subtotal</Text>
            <Text className="text-gray-400">₹{basketTotal}</Text>
          </View>
          <View className="flex-row items-center justify-between">
            <Text className="text-gray-400">Delivery fee</Text>
            <Text className="text-gray-400">₹ 30</Text>
          </View>
          <View className="flex-row items-center justify-between">
            <Text>Order total</Text>
            <Text className="font-extrabold">₹{basketTotal + 30}</Text>
          </View>
          <TouchableOpacity
            onPress={() => navigation.navigate("PreparingOrderScreen")}
            className="rounded-xl bg-[#00CCBB] p-4 "
          >
            <Text className="text-lg font-bold text-center text-white">
              Place Order
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default BasketScreen;
