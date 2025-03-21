
import React from 'react';
import { View, FlatList, Text, StyleSheet } from 'react-native';
import { useGlobalContext } from '../context/globalContext';

const SavedJobsScreen = () => {
  const { jobs, theme } = useGlobalContext();

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={styles.content}>
        <Text style={[styles.title, { color: theme.dominant }]}>
          Saved Jobs
        </Text>
        <Text style={[styles.subText, { color: theme.text }]}>
          Here, you may view your saved jobs.
        </Text>
        <FlatList
          data={jobs}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={[styles.jobCard, { backgroundColor: theme.cardBackground }]}>
              <Text style={[styles.jobTitle, { color: theme.dominant }]}>{item.title}</Text>
              <Text style={[styles.jobCompany, { color: theme.text }]}>{item.companyName}</Text>
              <Text style={[styles.jobSalary, { color: theme.text }]}>
                Salary: {item.minSalary} - {item.maxSalary}
              </Text>
            </View>
          )}
          contentContainerStyle={styles.listContent}
          ListEmptyComponent={
            <Text style={[styles.emptyText, { color: theme.text }]}>No saved jobs available.</Text>
          }
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 16,
    textAlign: 'center',
  },
  subText: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
  listContent: {
    paddingBottom: 80,
  },
  jobCard: {
    padding: 16,
    borderRadius: 10,
    marginBottom: 12,
    elevation: 3, 
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  jobTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  jobCompany: {
    fontSize: 16,
    marginBottom: 4,
  },
  jobSalary: {
    fontSize: 16,
  },
  emptyText: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 20,
  },
});

export default SavedJobsScreen;
