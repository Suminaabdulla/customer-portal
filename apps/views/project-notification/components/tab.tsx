import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';

const NotificationTab = ({ projectUpdates }) => {
  const [activeTab, setActiveTab] = useState('salesman'); // Default tab: Salesman

  return (
    <View style={styles.container}>
      {/* Tab Navigation */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tabButton, activeTab === 'salesman' && styles.activeTab]}
          onPress={() => setActiveTab('salesman')}
        >
          <Text style={[styles.tabText, activeTab === 'salesman' && styles.activeTabText]}>Salesman</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tabButton, activeTab === 'marketing' && styles.activeTab]}
          onPress={() => setActiveTab('marketing')}
        >
          <Text style={[styles.tabText, activeTab === 'marketing' && styles.activeTabText]}>Marketing</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tabButton, activeTab === 'sm' && styles.activeTab]}
          onPress={() => setActiveTab('sm')}
        >
          <Text style={[styles.tabText, activeTab === 'sm' && styles.activeTabText]}>SM</Text>
        </TouchableOpacity>
      </View>

      {/* Content Based on Active Tab */}
      <ScrollView contentContainerStyle={styles.detailsContainer}>
        {activeTab === 'salesman' && (
  <View style={styles.section}>
    <Text style={styles.sectionTitle}>Salesman Updates</Text>
    {projectUpdates?.SalesmanUpdates?.map((item, index) => (
      <View key={index} style={styles.notificationCard}>
        {/* Overview */}
        <Text style={styles.notificationTitle}>
          {item.Overview || 'No updates available'}
        </Text>

        {/* Remarks */}
        {item.Remarks && (
          <Text style={styles.remarksText}>
            {item.Remarks}
          </Text>
        )}

        {/* Win Percentage */}
        {item.WinPerc && (
          <View style={styles.winPercContainer}>
            <Text style={styles.winPercText}>
              Win Percentage: {item.WinPerc}%
            </Text>
          </View>
        )}

        {/* Footer Section */}
        <View style={styles.cardFooter}>
          <Text style={styles.dateText}>
            {item.UpdatedDate ? item.UpdatedDate : 'No date available'}
          </Text>
          {item.UpdatedBy && (
            <Text style={styles.updatedByText}>
              {`Updated by: ${item.UpdatedBy}`}
            </Text>
          )}
        </View>
      </View>
    ))}
  </View>
)}

{activeTab === 'marketing' && (
  <View style={styles.section}>
    <Text style={styles.sectionTitle}>Marketing Updates</Text>
    {projectUpdates?.MarketingUpdates?.map((item, index) => (
      <View key={index} style={styles.notificationCard}>
        {/* Overview */}
        <Text style={styles.notificationTitle}>
          {item.Overview || 'No updates available'}
        </Text>

        {/* Remarks */}
        {item.Remarks && (
          <Text style={styles.remarksText}>
            {item.Remarks}
          </Text>
        )}

        {/* Win Percentage */}
        {item.WinPerc && (
          <View style={styles.winPercContainer}>
            <Text style={styles.winPercText}>
              Win Percentage: {item.WinPerc}%
            </Text>
          </View>
        )}

        {/* Footer Section */}
        <View style={styles.cardFooter}>
          <Text style={styles.dateText}>
            {item.UpdatedDate ? item.UpdatedDate : 'No date available'}
          </Text>
          {item.UpdatedBy && (
            <Text style={styles.updatedByText}>
              {`Updated by: ${item.UpdatedBy}`}
            </Text>
          )}
        </View>
      </View>
    ))}
  </View>
)}

         {activeTab === 'sm' && (
  <View style={styles.section}>
    <Text style={styles.sectionTitle}>SM Updates</Text>
    {projectUpdates?.SMUpdates?.map((item, index) => (
      <View key={index} style={styles.notificationCard}>
        {/* Overview */}
        <Text style={styles.notificationTitle}>
          {item.Overview || 'No updates available'}
        </Text>

        {/* Remarks */}
        {item.Remarks && (
          <Text style={styles.remarksText}>
            {item.Remarks}
          </Text>
        )}

        {/* Win Percentage */}
        {item.WinPerc && (
          <View style={styles.winPercContainer}>
            <Text style={styles.winPercText}>
              Win Percentage: {item.WinPerc}%
            </Text>
          </View>
        )}

        {/* Footer Section */}
        <View style={styles.cardFooter}>
          <Text style={styles.dateText}>
            {item.UpdatedDate ? item.UpdatedDate : 'No date available'}
          </Text>
          {item.UpdatedBy && (
            <Text style={styles.updatedByText}>
              {`Updated by: ${item.UpdatedBy}`}
            </Text>
          )}
        </View>
      </View>
    ))}
  </View>
)}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    width: '100%',
  },
  tabButton: {
    paddingVertical: 10,
    flex: 1,
    alignItems: 'center',
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: '#b01c12',
    backgroundColor: '#b01c12',
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 4,
    elevation: 6,
  },
  tabText: {
    fontSize: 16,
    color: '#666',
  },
  activeTabText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  detailsContainer: {
    width: '90%',
  },
  section: {
    marginBottom: 20,
    width: '100%',
  },
  notificationCard: {
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
  notificationTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  notificationDetails: {
    fontSize: 14,
    color: '#555',
    marginBottom: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginVertical: 10,
  },
  remarksText: {
    fontSize: 14,
    color: '#495057',
    marginBottom: 12,
    lineHeight: 20,
  },
  winPercContainer: {
    marginTop: 8,
    paddingVertical: 6,
    paddingHorizontal: 12,
    backgroundColor: '#e0f7fa',
    borderRadius: 4,
  },
  winPercText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#00796b',
  },
  cardFooter: {
    marginTop: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dateText: {
    fontSize: 12,
    color: '#888',
  },
  updatedByText: {
    fontSize: 12,
    color: '#555',
    fontStyle: 'italic',
  },
});

export default NotificationTab;
