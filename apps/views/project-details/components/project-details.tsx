import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import QuotedProducts from './quoted-products';

const ProjectDetails = ({ project, quotedProducts }) => {
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={[styles.sectionText, { color: 'white' }]}>
          <Text style={styles.boldText}>Project No: </Text>{project.ProjectNo || 'N/A'}
        </Text>
        <Text style={[styles.sectionText, { color: 'white' }]}>
          <Text style={styles.boldText}>Project Status: </Text>{project.ProjectStatus || 'N/A'}
        </Text>
        <Text style={[styles.sectionText, { color: 'white' }]}>
          <Text style={styles.boldText}>Stage: </Text>{project.Stage || 'N/A'}
        </Text>
      </View>

      <Text style={[styles.sectionText, {paddingHorizontal:25, fontWeight:'600'}]}>Quoted Products</Text>
      <QuotedProducts quotedProducts={quotedProducts}/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  card: {
    backgroundColor: '#b01c12',
    borderRadius: 10,
    padding: 15,
    width: '90%',
    marginVertical: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#ddd',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3, // For Android shadow
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginVertical: 10,
  },
  sectionText: {
    fontSize: 16,
    color: '#555',
    alignSelf: 'flex-start'
  },
  boldText: {
    fontWeight: 'bold',
    color: 'white',
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
  },
  tabText: {
    fontSize: 16,
    color: '#666',
  },
  activeTabText: {
    color: '#b01c12',
    fontWeight: 'bold',
  },
  detailsContainer: {
    width: '90%',
  },
  section: {
    marginBottom: 20,
    width: '100%',
  },
  tableRow: {
    flexDirection: 'row',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  tableCell: {
    flex: 1,
    fontSize: 14,
    color: '#555',
    textAlign: 'left',
    paddingHorizontal: 8,
  },
  tableHeader: {
    fontWeight: 'bold',
    color: '#333',
    backgroundColor: '#f5f5f5',
  },
});

export default ProjectDetails;
