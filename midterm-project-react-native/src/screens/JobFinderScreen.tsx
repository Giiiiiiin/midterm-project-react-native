import React, { useState } from 'react';
import {
  View,
  FlatList,
  Text,
  StyleSheet,
  Pressable,
  ActivityIndicator,
  RefreshControl,
  useWindowDimensions,
} from 'react-native';
import { useGlobalContext } from '../context/globalContext';
import { useNavigation } from '@react-navigation/native';
import SearchBar from '../components/SearchBar';
import JobDetailsModal from '../components/JobDetailsModal';
import ApplicationFormModal from '../components/ApplicationFormModal';
import JobCard, { Job } from '../components/JobCard';


const JobFinderScreen = () => {
  const { jobs, theme, loading, fetchJobs, savedJobs, toggleSaveJob } = useGlobalContext();
  const navigation = useNavigation();
  const [detailsModalVisible, setDetailsModalVisible] = useState(false);
  const [appFormVisible, setAppFormVisible] = useState(false); 
  const [selectedJob, setSelectedJob] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const { width } = useWindowDimensions();

  const filteredJobs = jobs.filter((job) =>
    job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    job.companyName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const openDetailsModal = (job) => {
    setSelectedJob(job);
    setDetailsModalVisible(true);
  };

  const closeDetailsModal = () => {
    setDetailsModalVisible(false);
    setSelectedJob(null);
  };

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
      <Text style={[styles.pageTitle, { color: theme.dominant }]}>Home Page</Text>
      <Text style={[styles.pageSubText, { color: theme.text }]}>
        Here, you may find your desired jobs.
      </Text>

      <SearchBar
        value={searchQuery}
        onChangeText={setSearchQuery}
        placeholder="Search saved jobs..."
        style={{
          backgroundColor: theme.background,
          borderColor: theme.accent,
          color: theme.text,
        }}
      />

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
          <JobCard
            job={item}
            theme={theme}
            isSaved={savedJobs.includes(item.id)}
            onOpenDetails={openDetailsModal}
            onToggleSave={toggleSaveJob}
            onOpenApply={openApplicationForm}
            saveText="Save Job"     
            savedText="Saved"   
          />
        )}
        ListEmptyComponent={
          <Text style={{ color: theme.text, textAlign: 'center' }}>No jobs available.</Text>
        }
        contentContainerStyle={styles.listContent}
      />

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
          View Saved Jobs [{savedJobs.length}]
        </Text>
      </Pressable>

      <JobDetailsModal
        visible={detailsModalVisible} 
        job={selectedJob} 
        onClose={closeDetailsModal} theme={theme}
      />

      <ApplicationFormModal
        visible={appFormVisible}
        job={selectedJob}
        onClose={closeApplicationForm}
        theme={theme}
      />
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
    paddingBottom: 150, 
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
    marginTop: 10,
  },
  closeButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  stickyBackButton: {
    position: 'absolute',
    top: 10,
    left: 16,
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 5,
    alignItems: 'center',
    zIndex: 2,
  },
  stickyBackButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default JobFinderScreen;
