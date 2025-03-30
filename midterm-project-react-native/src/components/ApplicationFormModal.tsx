import React from 'react';
import { View, Modal, StyleSheet } from 'react-native';
import ApplicationForm from './ApplicationForm';

interface ApplicationFormModalProps {
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

const ApplicationFormModal: React.FC<ApplicationFormModalProps> = ({
  visible,
  job,
  onClose,
  theme,
}) => {
  return (
    <Modal visible={visible} animationType="slide" transparent onRequestClose={onClose}>
      <View style={styles.modalContainer}>
        <View style={[styles.modalContent, { backgroundColor: theme.cardBackground }]}>
          <ApplicationForm job={job} onClose={onClose} />
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
});

export default ApplicationFormModal;
