// src/components/ApplicationForm.tsx
import React from 'react';
import { View, TextInput, Button, Alert, StyleSheet, ScrollView, Text } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useNavigation } from '@react-navigation/native';

interface ApplicationFormProps {
  job?: { title: string };
  onClose: () => void;
}

type FormData = {
  name: string;
  email: string;
  contactNumber: string;
  reason: string;
};

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  email: Yup.string().email('Invalid email address').required('Email is required'),
  contactNumber: Yup.string()
    .matches(/^[0-9]{10}$/, 'Contact number must be exactly 10 digits')
    .required('Contact number is required'),
  reason: Yup.string().required('Please tell us why we should hire you'),
});

const ApplicationForm: React.FC<ApplicationFormProps> = ({ job, onClose }) => {
  const navigation = useNavigation();
  const state = navigation.getState();
  const currentRoute = state.routes[state.routes.length - 1].name;

  
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Formik
        initialValues={{ name: '', email: '', contactNumber: '', reason: '' }}
        validationSchema={validationSchema}
        onSubmit={(values, { resetForm }) => {
          // Process form submission here (e.g., send to an API)
          Alert.alert('Application Submitted', 'Thank you for applying!', [
            {
              text: 'Okay',
              onPress: () => {
                resetForm();
                onClose();
                if (currentRoute !== 'JobFinder') {
                  navigation.popToTop();
                }
              },
            },
          ]);
        }}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
          <View>
            <TextInput
              style={styles.input}
              placeholder="Name"
              onChangeText={handleChange('name')}
              onBlur={handleBlur('name')}
              value={values.name}
            />
            {errors.name && touched.name && <Text style={styles.errorText}>{errors.name}</Text>}
            <TextInput
              style={styles.input}
              placeholder="Email"
              keyboardType="email-address"
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              value={values.email}
            />
            {errors.email && touched.email && <Text style={styles.errorText}>{errors.email}</Text>}
            <TextInput
              style={styles.input}
              placeholder="Contact Number"
              keyboardType="phone-pad"
              onChangeText={handleChange('contactNumber')}
              onBlur={handleBlur('contactNumber')}
              value={values.contactNumber}
            />
            {errors.contactNumber && touched.contactNumber && (
              <Text style={styles.errorText}>{errors.contactNumber}</Text>
            )}
            <TextInput
              style={[styles.input, styles.multilineInput]}
              placeholder="Why should we hire you?"
              onChangeText={handleChange('reason')}
              onBlur={handleBlur('reason')}
              value={values.reason}
              multiline
              numberOfLines={4}
            />
            {errors.reason && touched.reason && <Text style={styles.errorText}>{errors.reason}</Text>}
            <Button title="Submit Application" onPress={handleSubmit as any} />
            <View style={{ marginTop: 10 }}>
              <Button title="Cancel" onPress={onClose} color="#ccc" />
            </View>
          </View>
        )}
      </Formik>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    flexGrow: 1,
    justifyContent: 'center',
  },
  input: {
    backgroundColor: '#f1f1f1',
    marginVertical: 8,
    borderRadius: 8,
    padding: 10,
  },
  multilineInput: {
    height: 100,
    textAlignVertical: 'top',
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginLeft: 4,
  },
});

export default ApplicationForm;
