import React, { useEffect, useState } from 'react';
import { View, Text, Dimensions, StyleSheet, TouchableOpacity} from 'react-native';
import { Card, Button, Icon, ListItem } from '@rneui/themed';
import { UserApi, OrderApi, ShopApi } from "../api/Api";
import Collapsible from 'react-native-collapsible';


const windowWidth = Dimensions.get('window').width;
const itemWidth = windowWidth * 0.5 - 20;

const Profile = ({ userId }) => {
  const [user, setUser] = useState("");
  const [orders, setOrders] = useState([]);
  const [expanded, setExpanded] = useState(false);
  const [lineOrders, setLineOrders] = useState([]);
  const [inventoryItems, setInventoryItems] = useState([]);
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [itemName, setItemName] = useState("");
  const [expandedOrder, setExpandedOrder] = useState(null); // Track the expanded order

  
  const toggleExpandedOrder = (orderId) => {
    if (expandedOrder === orderId) {
      setExpandedOrder(null); // Collapse the current one
    } else {
      setExpandedOrder(orderId); // Expand the new one
      getOrdersByOrderId(orderId); // Fetch order details
    }
  };

  const getUserById = (userId) => {
    UserApi.getUserById(userId).then((response) => {
      console.log(response.data.firstname);
      const user = response.data
      setUser(user)
    });
  };

  const getOrders = (userId) => {
    OrderApi.getOrdersByUserId(userId).then((response) => {
      console.log(response.data);
      const user_orders = response.data
      setOrders(user_orders)
      const order_ids = user_orders.map((order) => order.id);
      console.log(order_ids)
    });
  }

  const getOrdersByOrderId = (orderId) => {
    OrderApi.getOrdersByOrderId(orderId).then(async (response) => {
      console.log(response.data);
      const line_orders = response.data;
  
      // Initialize an object to hold inventory item names
      const itemNames = {};
  
      // Use a for-loop to wait for all inventory items to be fetched
      for (const order of line_orders) {
        await ShopApi.getInventoryItem(order.inventory_item_id).then((itemResponse) => {
          // Assuming itemResponse.data has the item details
          const item = itemResponse.data;
          itemNames[order.inventory_item_id] = item.name;
        }).catch(error => console.error("Failed to fetch item", error));
      }
  
      // Set the names in state
      setInventoryItems(itemNames);
  
      // Now set the line orders in state
      setLineOrders(line_orders);
    });
  }

  const getInventoryItem = (item_id) => {
    ShopApi.getInventoryItem(item_id). then((response) => {
      const item = response.data
      const data = item.map((item) => ({
        name: item.name,
      }));
      setItemName(data)
      console.log(itemName)
    })
  }
useEffect(() => {
    const fetchData = async () => {
      // ... same logic to fetch user and orders
      getUserById(userId);
      getOrders(userId);
    };
    fetchData();
  }, []);

  return (
    <View>
      <Card style={styles.itemContainer}>
                {/* <Image source={item.imageLink} style={styles.itemImage} /> */}
                <Card.Title> Hello {user.firstname} {user.lastname}! </Card.Title>
                <Card.Divider></Card.Divider>
                <Text style={styles.name}>Order History</Text>

                {orders.map((order, index) => (
                  <View key={order.id} bottomDivider>
                  <TouchableOpacity onPress={() => toggleExpandedOrder(order.id)} style={styles.row}>
                    <Text style={styles.rowname} >{order.id} - {order.order_status_enum} - ${order.total_price}</Text>
                    <Icon name="keyboard-arrow-down" size={30} />
                  </TouchableOpacity>
                  <Collapsible collapsed={expandedOrder !== order.id}>
              {expandedOrder === order.id && lineOrders.map((lineOrder, lineIndex) => (
                <ListItem key={lineOrder.id} bottomDivider> 
                <ListItem.Content>
                  <ListItem.Title>{inventoryItems[lineOrder.inventory_item_id]}</ListItem.Title>
                  <ListItem.Subtitle>Quantity: {lineOrder.quantity} Subtotal: ${lineOrder.sub_total}</ListItem.Subtitle>
                </ListItem.Content>
              </ListItem>
                  ))}
                  </Collapsible>
                </View>
                ))}
                </Card>
    </View>
  );
};



const styles = StyleSheet.create({
  itemContainer: {
      margin: 5,
      padding: 10,
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 5,
      width: windowWidth,
  },
  itemImage: {
      width: '100%',
      height: 100,
      marginBottom: 5,
  },
  user: {
    marginBottom: 6,
  },
  name: {
    fontSize: 16,
    marginTop: 5,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center', // Align items vertically
    justifyContent: 'space-between', // Use 'flex-start' if you want them to be aligned to the left
  },
  rowname: {
    fontSize: 16,
    marginTop: 5,
    // If you want to ensure the text doesn't go under the icon:
    flex: 1, // Takes up as much space as possible
    marginRight: 10, // Optional: adds some spacing between the text and the icon
  },
  
});

export default Profile;