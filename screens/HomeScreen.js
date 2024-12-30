import React, { useEffect, useState, useRef } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, Alert, Modal, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { setItemCount } from './Store'; 

export default function HomeScreen({ route }) {
  const { username } = route.params;
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const itemCount = useSelector(state => state.itemCount.itemCount);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedItems, setSelectedItems] = useState([]);
  const [isImageVisible, setIsImageVisible] = useState(false);

  // FlatList for scrolling
  const flatListRef = useRef(null);

  useEffect(() => {
    dispatch(setItemCount(0)); 

    const fetchData = async () => {
      try {
        const response = await fetch('https://67718380ee76b92dd48fe35d.mockapi.io/funbun/entertainment');
        const json = await response.json();
        setData(json);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    fetchData();
  }, [dispatch]);

  const handleLogout = () => {
    Alert.alert(
      "Confirm Logout",
      "Are you sure you want to log out?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Yes",
          onPress: () => navigation.navigate('Login'),
        },
      ]
    );
  };

  const toggleImageVisibility = () => {
    setIsImageVisible(!isImageVisible);
  };

  const handleSelectItem = (id) => {
    let newSelectedItems;
    if (selectedItems.includes(id)) {
      newSelectedItems = selectedItems.filter((item) => item !== id);
      dispatch(setItemCount(itemCount - 1)); // Decrease count when item is deselected
    } else {
      newSelectedItems = [...selectedItems, id];
      dispatch(setItemCount(itemCount + 1)); // Increase count when item is selected
    }
    setSelectedItems(newSelectedItems);
  };

  const handleHomeButtonPress = () => {
    if (flatListRef.current) {
      flatListRef.current.scrollToIndex({ index: 0, animated: true });
    }
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={[styles.card, selectedItems.includes(item.id) && styles.selectedCard]}
      onPress={() => handleSelectItem(item.id)}
    >
      <Image source={{ uri: item.image }} style={styles.cardImage} />
      <View style={styles.cardContent}>
        <Text style={styles.cardTitle}>{item.name}</Text>
        <Text style={styles.cardDescription}>{item.description}</Text>
        <Text style={styles.difficulty}>Difficulty Level: {item.difficulty || 'N/A'}</Text>
      </View>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#FF8C00" />
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.appName}>Fun Bun</Text>
        <View style={styles.profileContainer}>
          <TouchableOpacity onPress={toggleImageVisibility}>
            <Image
              source={require('../assets/images/Profile-pic.png')}
              style={styles.profileIcon}
            />
          </TouchableOpacity>
          <Text style={styles.username}>{username}</Text>
          <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
            <Image
              source={require('../assets/images/logout-image.png')}
              style={styles.logoutIcon}
            />
          </TouchableOpacity>
        </View>
      </View>

      {isImageVisible && (
        <Modal
          transparent={true}
          animationType="fade"
          visible={isImageVisible}
          onRequestClose={toggleImageVisibility}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <TouchableOpacity onPress={toggleImageVisibility}>
                <Image
                  source={require('../assets/images/Profile-pic.png')}
                  style={styles.largeProfileImage}
                />
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      )}

      <FlatList
        ref={flatListRef}
        data={data}
        renderItem={renderItem}
        keyExtractor={(item, index) => (item.id ? item.id.toString() : `key-${index}`)}
        contentContainerStyle={styles.listContainer}
      />

      <TouchableOpacity style={styles.itemsSelectedButton}>
        <Text style={styles.itemsSelectedButtonText}>{itemCount} Selected Games</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#4F5B62', 
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#1A1F2E',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#4B59F7', 
    height: 80,
    shadowColor: '#4B59F7',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.7,
    shadowRadius: 6,
    elevation: 10, 
  },
  appName: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFD700', 
    textShadowColor: '#4B59F7',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 5,
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileIcon: {
    width: 45,
    height: 45,
    borderRadius: 22.5,
    marginRight: 15,
    borderWidth: 2,
    borderColor: '#FF006E', 
    shadowColor: '#FF006E',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 6,
  },
  username: {
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  logoutButton: {
    marginLeft: 12,
  },
  logoutIcon: {
    width: 24,
    height: 24,
    tintColor: '#FF006E',
  },
  listContainer: {
    padding: 25,
  },
  card: {
    backgroundColor: '#1A1F2E',
    borderRadius: 5,
    marginBottom: 10,
    overflow: 'hidden',
    elevation: 10,
    shadowColor: '#4B59F7',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.6,
    shadowRadius: 8,
    borderColor: '#4B59F7', 
    borderWidth: 3,
  },
  selectedCard: {
    borderWidth: 3,
    borderColor: '#FF006E', 
  },
  cardImage: {
    width: '100%',
    height: 200,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  cardContent: {
    padding: 15,
  },
  cardTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FF006E', 
    fontFamily: 'PressStart2P_400Regular',
  },
  cardDescription: {
    fontSize: 18,
    color: '#EAEAEA',
    marginVertical: 1,
    fontStyle: 'italic',
  },
  difficulty: {
    marginTop: 10,
    fontSize: 15,
    color: '#FFD700', 
    fontWeight: 'bold',
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0D0F1A',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 18,
    color: '#4B59F7',
    fontFamily: 'PressStart2P_400Regular', 
  },
  itemsSelectedButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#4B59F7',
    paddingVertical: 12,
    paddingHorizontal: 18,
    borderRadius: 50,
    shadowColor: '#4B59F7',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.7,
    shadowRadius: 6,
  },
  itemsSelectedButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.8)', 
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: 300,
    height: 300,
    justifyContent: 'center',
    alignItems: 'center',
  },
  largeProfileImage: {
    width: 200,
    height: 200,
    borderRadius: 100,
    borderWidth: 4,
    borderColor: '#FF006E',
    shadowColor: '#FF006E',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.8,
    shadowRadius: 10,
  },
});

