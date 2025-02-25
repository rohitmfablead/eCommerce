import React from "react";
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { toggleLike } from "../redux/likeSlice";
import BaseLayout from "../components/BaseLayout";
import { heart, heart1 } from "../assets/image";
import { Colors } from "../utils/theme";

const WishlistScreen = ({navigation}) => {
  const likedProducts = useSelector((state) => state.likeSlice.likedProducts);
  const dispatch = useDispatch();

  const handleLike = (product) => {
    dispatch(toggleLike(product));
  };


  const HandleNavigate = (item) => {
    navigation.navigate("ProductDetails", { item: item });
  };

  return (
    <BaseLayout>
      <View style={styles.container}>
        <Text style={styles.title}>My Wishlist</Text>

        {likedProducts.length === 0 ? (
          <Text style={styles.emptyText}>Your wishlist is empty.</Text>
        ) : (
          <FlatList
            data={likedProducts}
            keyExtractor={(item) => item?.id?.toString()}
            renderItem={({ item }) => {
              const isLiked = likedProducts.some((likedItem) => likedItem.id === item.id);

              return (
                <TouchableOpacity
                
                onPress={()=>HandleNavigate(item)}
                style={styles.card}>
                  <Image source={{ uri: item.image }} style={styles.image} />
                  <View style={styles.details}>
                    <Text numberOfLines={1} style={styles.titleText}>{item.title}</Text>
                    <Text style={styles.price}>${item.price}</Text>
                    <Text numberOfLines={2} style={styles.description}>{item.description}</Text>
                  </View>

                  {/* Like/Dislike Button */}
                  <TouchableOpacity
                    style={styles.likeButton}
                    onPress={() => handleLike(item)}
                  >
                    <Image
                      style={styles.like}
                      source={isLiked ? heart1 : heart}
                    />
                  </TouchableOpacity>
                </TouchableOpacity>
              );
            }}
          />
        )}
      </View>
    </BaseLayout>
  );
};

export default WishlistScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // padding: 16,
    // backgroundColor: "#fff",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    // marginBottom: 16,
    textAlign: "center",
    paddingVertical: 10,
  },
  emptyText: {
    fontSize: 16,
    textAlign: "center",
    marginTop: 20,
    color: "gray",
  },
  card: {
    flexDirection: "row",
    backgroundColor: "#f9f9f9",
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
    alignItems: "center",
  },
  image: {
    width: 80,
    height: 80,
    resizeMode: "contain",
    borderRadius: 8,
    marginRight: 12,
  },
  details: {
    flex: 1,
    gap: 5,
  },
  titleText: {
    fontSize: 16,
    fontWeight: "semibold",
  },
  price: {
    fontSize: 14,
    color: Colors.PRIMARY_COLOR,
    fontWeight: "bold",
  },
  description: {
    fontSize: 12,
    color: "#555",
    marginTop: 4,
  },
  likeButton: {
    bottom: 30,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
  },
  liked: {
    backgroundColor: "#ff4d4d",
  },
  notLiked: {
    backgroundColor: "#4CAF50",
  },
  likeText: {
    color: "#fff",
    fontWeight: "bold",
  },
  like: {
    width: 24,
    height: 24,
    resizeMode: 'contain'
  },
});
