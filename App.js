//import React from 'react';
import { View, Text, ActivityIndicator, FlatList, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react'; 
import { StyleSheet } from 'react-native';
import useFetch from './hooks/useFetch'; 
import useFetchDescription from './hooks/useFetchDescription';

const QuranApp = () => {
  const { data, loading, error } = useFetch('https://api.alquran.cloud/v1/surah');
  const [expandedItem, setExpandedItem] = useState(null); 
  const toggleItem = (surahNumber) => {
    if (expandedItem === surahNumber) {
      setExpandedItem(null);  // Close the dropdown if already open
    } else {
      setExpandedItem(surahNumber);  // Open the dropdown
    }
  };

  
  if (loading) return <ActivityIndicator size="large" color="#0000ff" />;
  if (error) return <Text>Error: {error}</Text>;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Quran App</Text>
      </View>
      <FlatList
        data={data.data}
        keyExtractor={(item) => item.number.toString()}
        contentContainerStyle={styles.listContainer}
        renderItem={({ item }) => (
          <View style={styles.listItem}>
            <TouchableOpacity onPress={() => toggleItem(item.number)}>
              <Text style={styles.surahText}>
                <Text style={styles.surahNumber}>{item.number}.</Text> {item.englishName} - {item.englishNameTranslation}
              </Text>
            </TouchableOpacity>

            {expandedItem === item.number && (
              <DescriptionDropdown surahNumber={item.number} />
            )}
          </View>
        )}
      />
    </View>
  );
};

// Component to handle the dropdown description
const DescriptionDropdown = ({ surahNumber }) => {
  const { description, loadingDescription, error } = useFetchDescription(surahNumber);

  if (loadingDescription) return <ActivityIndicator size="small" color="#0000ff" />;
  if (error) return <Text>Error: {error}</Text>;

  return (
    <View style={styles.descriptionContainer}>
      <Text style={styles.descriptionText}>
        {description || 'No description available.'}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: 'blue',
    height: '20%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  listContainer: {
    flexGrow: 1,  // This ensures the list takes up available space
    justifyContent: 'center',  // Center the list vertically
    paddingVertical: 20,
    alignItems: 'center',  // Center the list items horizontally
  },
  listItem: {
    width: '90%',
    marginBottom: 15,
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  surahText: {
    fontSize: 18,
    color: '#333',
  },
  surahNumber: {
    color: 'green',  // Color for the surah number
    fontWeight: 'bold',
  },
  descriptionContainer: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
  },
  descriptionText: {
    fontSize: 16,
    color: '#555',
  },
});

export default QuranApp;