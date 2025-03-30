// src/components/JobDetailsModal.tsx
import React from 'react';
import { View, Text, StyleSheet, Modal, Pressable, ScrollView, useWindowDimensions } from 'react-native';
import RenderHTML from 'react-native-render-html';

interface JobDetailsModalProps {
  visible: boolean;
  job: any;
  onClose: () => void;
  theme: {
    background: string;
    cardBackground: string;
    text: string;
    dominant: string;
    accent: string;
  };
}

// Helper function to format numbers as currency
const formatMoney = (value: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
  }).format(value);
};

const JobDetailsModal: React.FC<JobDetailsModalProps> = ({ visible, job, onClose, theme }) => {
  const { width } = useWindowDimensions();

  // Compute badge background based on theme's background color.
  const badgeBackground = theme.background === '#fff' ? '#e0e0e0' : '#333333';

  return (
    <Modal visible={visible} animationType="slide" transparent onRequestClose={onClose}>
      <View style={styles.modalContainer}>
        <View style={[styles.modalContent, { backgroundColor: theme.cardBackground }]}>
          <ScrollView contentContainerStyle={styles.modalScrollContent}>
            {job && (
              <>
                {/* Job Title */}
                <Text style={[styles.modalTitle, { color: theme.dominant, textAlign: 'left' }]}>
                  {job.title}
                </Text>

                {/* Other Job Details with bold labels */}
                <Text style={[styles.modalText, { color: theme.text, textAlign: 'left' }]}>
                  <Text style={{ fontWeight: 'bold' }}>Category: </Text>{job.mainCategory}
                </Text>
                <Text style={[styles.modalText, { color: theme.text, textAlign: 'left' }]}>
                  <Text style={{ fontWeight: 'bold' }}>Job Type: </Text>{job.jobType}
                </Text>
                <Text style={[styles.modalText, { color: theme.text, textAlign: 'left' }]}>
                  <Text style={{ fontWeight: 'bold' }}>Work Model: </Text>{job.workModel}
                </Text>
                <Text style={[styles.modalText, { color: theme.text, textAlign: 'left' }]}>
                  <Text style={{ fontWeight: 'bold' }}>Seniority: </Text>{job.seniorityLevel}
                </Text>
                <Text style={[styles.modalText, { color: theme.text, textAlign: 'left' }]}>
                  <Text style={{ fontWeight: 'bold' }}>Salary: </Text>
                  {formatMoney(job.minSalary)} - {formatMoney(job.maxSalary)}
                </Text>
                <Text style={[styles.modalText, { color: theme.text, textAlign: 'left' }]}>
                  <Text style={{ fontWeight: 'bold' }}>Published: </Text>{job.pubDate}
                </Text>
                <Text style={[styles.modalText, { color: theme.text, textAlign: 'left' }]}>
                  <Text style={{ fontWeight: 'bold' }}>Expires: </Text>{job.expiryDate}
                </Text>
                <Text style={[styles.modalText, { color: theme.text, textAlign: 'left' }]}>
                  <Text style={{ fontWeight: 'bold' }}>Application Link: </Text>{job.applicationLink}
                </Text>

                {/* Locations as badges */}
                <Text style={[styles.modalText, { color: theme.text, textAlign: 'left' }]}>
                  <Text style={{ fontWeight: 'bold' }}>Locations: </Text>
                </Text>
                <View style={styles.badgesContainer}>
                  {job.locations.map((loc: string, index: number) => (
                    <View key={index} style={[styles.badge, { backgroundColor: badgeBackground }]}>
                      <Text style={[styles.badgeText, { color: theme.text }]}>{loc}</Text>
                    </View>
                  ))}
                </View>

                {/* Tags as badges */}
                <Text style={[styles.modalText, { color: theme.text, textAlign: 'left' }]}>
                  <Text style={{ fontWeight: 'bold' }}>Tags: </Text>
                </Text>
                <View style={styles.badgesContainer}>
                  {job.tags.map((tag: string, index: number) => (
                    <View key={index} style={[styles.badge, { backgroundColor: badgeBackground }]}>
                      <Text style={[styles.badgeText, { color: theme.text }]}>{tag}</Text>
                    </View>
                  ))}
                </View>

                {/* Description placed at the very bottom */}
                <Text style={[styles.modalText, { color: theme.text, textAlign: 'left', marginTop: 16 }]}>
                  <Text style={{ fontWeight: 'bold' }}>Description: </Text>
                </Text>
                {job.description ? (
                  <RenderHTML
                    contentWidth={width * 0.9}
                    source={{ html: job.description }}
                    baseStyle={{ color: theme.text, fontSize: 16, textAlign: 'left' }}
                  />
                ) : (
                  <Text style={[styles.modalText, { color: theme.text, textAlign: 'left' }]}>
                    No description available.
                  </Text>
                )}
              </>
            )}
          </ScrollView>
          <Pressable
            onPress={onClose}
            style={({ pressed }) => [
              styles.closeButton,
              { transform: [{ scale: pressed ? 0.97 : 1 }], opacity: pressed ? 0.9 : 1 },
            ]}
          >
            <Text style={[styles.closeButtonText, { color: theme.text, textAlign: 'left' }]}>Close</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
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
    textAlign: 'left',
  },
  badgesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginVertical: 4,
  },
  badge: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 12,
    marginRight: 6,
    marginBottom: 6,
  },
  badgeText: {
    fontSize: 14,
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
    textAlign: 'left',
  },
});

export default JobDetailsModal;
