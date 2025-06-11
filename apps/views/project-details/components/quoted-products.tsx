import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const QuotedProducts = ({ quotedProducts }) => {

  const renderItem = (item, index) => {
    const statusStyles = getStatusStyle(item.Status);

    return (
      <View style={styles.productContainer} key={index}>
        <View style={styles.productHeader}>
          <Text style={styles.productName}>{item.Product}</Text>
          <View style={[styles.productStatusContainer, statusStyles.statusBadge]}>
            <Text style={[styles.productStatus, statusStyles.statusText]}>
              {item.Status}
            </Text>
          </View>
        </View>
        <Text style={styles.productValue}>AED {parseFloat(item.value).toLocaleString()}</Text>
      </View>
    );
  };

  // Function to get status styling based on the product status
  const getStatusStyle = (status) => {
    switch (status.toLowerCase()) {
      case 'open':
        return { statusBadge: { backgroundColor: '#FFF' }, statusText: { color: '#ffcc00' } };
      case 'won':
        return { statusBadge: { backgroundColor: '#e0e0e0' }, statusText: { color: '#2e8b57' } };
      case 'lost':
        return { statusBadge: { backgroundColor: '#e0e0e0' }, statusText: { color: '#b01c12' } };
      default:
        return { statusBadge: { backgroundColor: '#e0e0e0' }, statusText: { color: '#333' } };
    }
  };

  return (
    <View style={styles.container}>
      {quotedProducts?.map((item, index) => {
        return renderItem(item, index);
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
    width: '100%',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  productContainer: {
    backgroundColor: '#f8f8f8',
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  productHeader: {
    flexDirection: 'row', // Align product name and status horizontally
    justifyContent: 'space-between', // Space out the product name and status
    alignItems: 'center', // Center align vertically
  },
  productName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  productStatusContainer: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    width: 'auto',
  },
  productStatus: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  productValue: {
    fontSize: 16,
    color: '#2e8b57', // Green color for value
    marginTop: 5,
  },
});

export default QuotedProducts;
