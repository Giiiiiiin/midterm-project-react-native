
import React, { useState } from 'react';
import {
  View,
  FlatList,
  Text,
  StyleSheet,
  Modal,
  Pressable,
  ScrollView,
  ActivityIndicator,
  RefreshControl,
  useWindowDimensions,
} from 'react-native';
import { useGlobalContext } from '../context/globalContext';
import { useNavigation } from '@react-navigation/native';

const JobFinderScreen = () => {
  const { jobs, theme, loading, fetchJobs } = useGlobalContext();
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const { width } = useWindowDimensions();

  const openModal = (job) => {
    setSelectedJob(job);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedJob(null);
  };

  if (loading && jobs.length === 0) {
    return (
      <View style={[styles.loadingContainer, { backgroundColor: theme.background }]}>
        <ActivityIndicator size="large" color={theme.dominant} />
        <Text style={[styles.loadingText, { color: theme.text }]}>Loading jobs...</Text>
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Text style={[styles.pageTitle, { color: theme.dominant }]}>Home Page</Text>
      <Text style={[styles.pageSubText, { color: theme.text }]}>
        Here, you may find your desired jobs.
      </Text>
      
      <FlatList
        data={jobs}
        keyExtractor={(item) => item.id}
        refreshControl={
          <RefreshControl
            refreshing={loading}
            onRefresh={fetchJobs}
            colors={[theme.dominant]}
            tintColor={theme.dominant}
          />
        }
        renderItem={({ item }) => (
          <Pressable
            onPress={() => openModal(item)}
            style={({ pressed }) => [
              {
                transform: [{ scale: pressed ? 0.97 : 1 }],
                opacity: pressed ? 0.9 : 1,
              },
              styles.card,
              { backgroundColor: theme.cardBackground },
            ]}
          >
            <Text style={[styles.jobTitle, { color: theme.dominant }]}>{item.title}</Text>
            <Text style={[styles.jobCompany, { color: theme.text }]}>{item.companyName}</Text>
            <Text style={[styles.jobSalary, { color: theme.text }]}>
              Salary: {item.minSalary} - {item.maxSalary}
            </Text>
          </Pressable>
        )}
        ListEmptyComponent={
          <Text style={{ color: theme.text }}>No jobs available.</Text>
        }
        contentContainerStyle={styles.listContent}
      />
      

      {/* Sticky Button to Navigate to SavedJobsScreen */}
      <Pressable
        onPress={() => navigation.navigate('SavedJobs')}
        style={({ pressed }) => [
          styles.savedJobsButton,
          { 
            backgroundColor: theme.accent, 
            transform: [{ scale: pressed ? 0.97 : 1 }],
            opacity: pressed ? 0.9 : 1,
          },
        ]}
      >
        <Text style={[styles.savedJobsButtonText, { color: theme.text }]}>
          View Saved Jobs
        </Text>
      </Pressable>

      {/* Modal for Job Details */}
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={closeModal}
      >
        <View style={styles.modalContainer}>
          <View style={[styles.modalContent, { backgroundColor: theme.cardBackground }]}>
            <ScrollView contentContainerStyle={styles.modalScrollContent}>
              {selectedJob && (
                <>
                  <Text style={[styles.modalTitle, { color: theme.dominant }]}>
                    {selectedJob.title}
                  </Text>
                  <Text style={[styles.modalText, { color: theme.text }]}>
                    {selectedJob.description}
                  </Text>
                  <Text style={[styles.modalText, { color: theme.text }]}>
                    Category: {selectedJob.mainCategory}
                  </Text>
                  <Text style={[styles.modalText, { color: theme.text }]}>
                    Job Type: {selectedJob.jobType}
                  </Text>
                  <Text style={[styles.modalText, { color: theme.text }]}>
                    Work Model: {selectedJob.workModel}
                  </Text>
                  <Text style={[styles.modalText, { color: theme.text }]}>
                    Seniority: {selectedJob.seniorityLevel}
                  </Text>
                  <Text style={[styles.modalText, { color: theme.text }]}>
                    Salary: {selectedJob.minSalary} - {selectedJob.maxSalary}
                  </Text>
                  <Text style={[styles.modalText, { color: theme.text }]}>
                    Published: {selectedJob.pubDate}
                  </Text>
                  <Text style={[styles.modalText, { color: theme.text }]}>
                    Expires: {selectedJob.expiryDate}
                  </Text>
                  <Text style={[styles.modalText, { color: theme.text }]}>
                    Application Link: {selectedJob.applicationLink}
                  </Text>
                  <Text style={[styles.modalText, { color: theme.text }]}>
                    Locations: {selectedJob.locations.join(', ')}
                  </Text>
                  <Text style={[styles.modalText, { color: theme.text }]}>
                    Tags: {selectedJob.tags.join(', ')}
                  </Text>
                </>
              )}
            </ScrollView>
            <Pressable
              onPress={closeModal}
              style={({ pressed }) => [
                {
                  transform: [{ scale: pressed ? 0.97 : 1 }],
                  opacity: pressed ? 0.9 : 1,
                },
                styles.closeButton,
              ]}
            >
              <Text style={[styles.closeButtonText, { color: theme.text }]}>Close</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  pageTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 16,
    textAlign: 'center',
  },
  pageSubText: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
  listContent: {
    paddingTop: 16,
    paddingHorizontal: 16,
    paddingBottom: 100, // Ensure enough space so list items aren't hidden behind the button
  },
  card: {
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 16,
    marginTop: 10,
  },
  savedJobsButton: {
    position: 'absolute',
    bottom: 10,
    left: 16,
    right: 16,
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
    zIndex: 1,
  },
  savedJobsButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  modalContent: {
    width: '90%',
    maxHeight: '80%',
    borderRadius: 10,
    padding: 20,
  },
  modalScrollContent: {
    paddingBottom: 20,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalText: {
    fontSize: 16,
    marginBottom: 8,
  },
  closeButton: {
    backgroundColor: '#FF4500',
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  closeButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default JobFinderScreen;
// src/screens/JobFinderScreen.tsx
import React, { useState } from 'react';
import {
  View,
  FlatList,
  Text,
  TextInput,
  StyleSheet,
  Modal,
  Pressable,
  ScrollView,
  ActivityIndicator,
  RefreshControl,
  useWindowDimensions,
} from 'react-native';
import { useGlobalContext } from '../context/globalContext';
import { useNavigation } from '@react-navigation/native';
import ApplicationForm from '../components/ApplicationForm';

const JobFinderScreen = () => {
  const { jobs, theme, loading, fetchJobs, savedJobs, toggleSaveJob } = useGlobalContext();
  const navigation = useNavigation();
  const [detailsModalVisible, setDetailsModalVisible] = useState(false); // For job details modal
  const [appFormVisible, setAppFormVisible] = useState(false); // For application form modal
  const [selectedJob, setSelectedJob] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const { width } = useWindowDimensions();

  // Filter jobs based on search query (title or company)
  const filteredJobs = jobs.filter((job) =>
    job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    job.companyName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Opens job details modal
  const openDetailsModal = (job) => {
    setSelectedJob(job);
    setDetailsModalVisible(true);
  };

  const closeDetailsModal = () => {
    setDetailsModalVisible(false);
    setSelectedJob(null);
  };

  // Opens the Application Form modal
  const openApplicationForm = (job) => {
    setSelectedJob(job);
    setAppFormVisible(true);
  };

  const closeApplicationForm = () => {
    setAppFormVisible(false);
    setSelectedJob(null);
  };

  if (loading && jobs.length === 0) {
    return (
      <View style={[styles.loadingContainer, { backgroundColor: theme.background }]}>
        <ActivityIndicator size="large" color={theme.dominant} />
        <Text style={[styles.loadingText, { color: theme.text }]}>Loading jobs...</Text>
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      {/* Page Title and Subtext */}
      <Text style={[styles.pageTitle, { color: theme.dominant }]}>Home Page</Text>
      <Text style={[styles.pageSubText, { color: theme.text }]}>
        Here, you may find your desired jobs.
      </Text>

      {/* Search Bar */}
      <TextInput
        style={[
          styles.searchBar,
          {
            backgroundColor: theme.background,
            borderColor: theme.accent,
            color: theme.text,
          },
        ]}
        placeholder="Search jobs..."
        placeholderTextColor={theme.text}
        value={searchQuery}
        onChangeText={setSearchQuery}
      />

      {/* Job Listings */}
      <FlatList
        data={filteredJobs}
        keyExtractor={(item) => item.id}
        refreshControl={
          <RefreshControl
            refreshing={loading}
            onRefresh={fetchJobs}
            colors={[theme.dominant]}
            tintColor={theme.dominant}
          />
        }
        renderItem={({ item }) => (
          // Wrap the entire card in a Pressable to open the details modal.
          <Pressable
            onPress={() => openDetailsModal(item)}
            style={({ pressed }) => [
              {
                transform: [{ scale: pressed ? 0.97 : 1 }],
                opacity: pressed ? 0.9 : 1,
              },
              styles.card,
              { backgroundColor: theme.cardBackground },
            ]}
          >
            <Text style={[styles.jobTitle, { color: theme.dominant }]}>{item.title}</Text>
            <Text style={[styles.jobCompany, { color: theme.text }]}>{item.companyName}</Text>
            <Text style={[styles.jobSalary, { color: theme.text }]}>
              Salary: {item.minSalary} - {item.maxSalary}
            </Text>
            {/* Buttons Container */}
            <View style={styles.buttonsContainer}>
              {/* Save Job Button */}
              <Pressable
                onPress={() => toggleSaveJob(item.id)}
                style={({ pressed }) => {
                  const isSaved = savedJobs.includes(item.id);
                  return [
                    styles.button,
                    {
                      backgroundColor: isSaved ? theme.background : theme.accent,
                      borderWidth: 2,
                      borderColor: isSaved ? theme.accent : 'transparent',
                      transform: [{ scale: pressed ? 0.97 : 1 }],
                      opacity: pressed ? 0.9 : 1,
                    },
                  ];
                }}
              >
                <Text style={[styles.buttonText, { color: theme.text }]}>
                  {savedJobs.includes(item.id) ? 'Saved' : 'Save Job'}
                </Text>
              </Pressable>
              {/* Apply Button */}
              <Pressable
                onPress={() => openApplicationForm(item)}
                style={({ pressed }) => [
                  styles.button,
                  {
                    backgroundColor: theme.accent,
                    transform: [{ scale: pressed ? 0.97 : 1 }],
                    opacity: pressed ? 0.9 : 1,
                  },
                ]}
              >
                <Text style={[styles.buttonText, { color: theme.text }]}>Apply</Text>
              </Pressable>
            </View>
          </Pressable>
        )}
        ListEmptyComponent={
          <Text style={{ color: theme.text }}>No jobs available.</Text>
        }
        contentContainerStyle={styles.listContent}
      />

      {/* Sticky Button to Navigate to SavedJobsScreen */}
      <Text style={[styles.pageTitle, { color: theme.dominant }]}></Text>
      <Pressable
        onPress={() => navigation.navigate('SavedJobs')}
        style={({ pressed }) => [
          styles.savedJobsButton,
          {
            backgroundColor: theme.accent,
            transform: [{ scale: pressed ? 0.97 : 1 }],
            opacity: pressed ? 0.9 : 1,
          },
        ]}
      >
        <Text style={[styles.savedJobsButtonText, { color: theme.text }]}>
          View Saved Jobs
        </Text>
      </Pressable>

      {/* Modal for Job Details */}
      <Modal
        visible={detailsModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={closeDetailsModal}
      >
        <View style={styles.modalContainer}>
          <View style={[styles.modalContent, { backgroundColor: theme.cardBackground }]}>
            <ScrollView contentContainerStyle={styles.modalScrollContent}>
              {selectedJob && (
                <>
                  <Text style={[styles.modalTitle, { color: theme.dominant }]}>
                    {selectedJob.title}
                  </Text>
                  <Text style={[styles.modalText, { color: theme.text }]}>
                    {selectedJob.description}
                  </Text>
                  <Text style={[styles.modalText, { color: theme.text }]}>
                    Category: {selectedJob.mainCategory}
                  </Text>
                  <Text style={[styles.modalText, { color: theme.text }]}>
                    Job Type: {selectedJob.jobType}
                  </Text>
                  <Text style={[styles.modalText, { color: theme.text }]}>
                    Work Model: {selectedJob.workModel}
                  </Text>
                  <Text style={[styles.modalText, { color: theme.text }]}>
                    Seniority: {selectedJob.seniorityLevel}
                  </Text>
                  <Text style={[styles.modalText, { color: theme.text }]}>
                    Salary: {selectedJob.minSalary} - {selectedJob.maxSalary}
                  </Text>
                  <Text style={[styles.modalText, { color: theme.text }]}>
                    Published: {selectedJob.pubDate}
                  </Text>
                  <Text style={[styles.modalText, { color: theme.text }]}>
                    Expires: {selectedJob.expiryDate}
                  </Text>
                  <Text style={[styles.modalText, { color: theme.text }]}>
                    Application Link: {selectedJob.applicationLink}
                  </Text>
                  <Text style={[styles.modalText, { color: theme.text }]}>
                    Locations: {selectedJob.locations.join(', ')}
                  </Text>
                  <Text style={[styles.modalText, { color: theme.text }]}>
                    Tags: {selectedJob.tags.join(', ')}
                  </Text>
                </>
              )}
            </ScrollView>
            <Pressable
              onPress={closeDetailsModal}
              style={({ pressed }) => [
                styles.closeButton,
                {
                  transform: [{ scale: pressed ? 0.97 : 1 }],
                  opacity: pressed ? 0.9 : 1,
                },
              ]}
            >
              <Text style={[styles.closeButtonText, { color: theme.text }]}>Close</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      {/* Modal for Application Form */}
      <Modal
        visible={appFormVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={closeApplicationForm}
      >
        <View style={styles.modalContainer}>
          <View style={[styles.modalContent, { backgroundColor: theme.cardBackground }]}>
            <ApplicationForm job={selectedJob} onClose={closeApplicationForm} />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  pageTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 16,
    textAlign: 'center',
  },
  pageSubText: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
  searchBar: {
    height: 40,
    borderWidth: 2,
    borderRadius: 10,
    paddingHorizontal: 10,
    marginHorizontal: 16,
    marginBottom: 10,
  },
  listContent: {
    paddingTop: 16,
    paddingHorizontal: 16,
    paddingBottom: 150, // Ensure enough space so list items aren't hidden behind sticky buttons
  },
  card: {
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
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  button: {
    flex: 0.48,
    paddingVertical: 8,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 16,
    marginTop: 10,
  },
  savedJobsButton: {
    position: 'absolute',
    bottom: 10,
    left: 16,
    right: 16,
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
    zIndex: 1,
  },
  savedJobsButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  modalContent: {
    width: '90%',
    maxHeight: '80%',
    borderRadius: 10,
    padding: 20,
  },
  modalScrollContent: {
    paddingBottom: 20,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalText: {
    fontSize: 16,
    marginBottom: 8,
  },
  closeButton: {
    backgroundColor: '#FF4500',
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  closeButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default JobFinderScreen;
