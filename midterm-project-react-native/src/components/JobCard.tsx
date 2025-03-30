import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';

export interface Job {
  id: string;
  title: string;
  companyName: string;
  minSalary: number;
  maxSalary: number;
  description?: string;
  mainCategory: string;
  jobType: string;
  workModel: string;
  seniorityLevel: string;
  pubDate: string;
  expiryDate: string;
  applicationLink: string;
  locations: string[];
  tags: string[];
}

interface JobCardProps {
  job: Job;
  theme: {
    background: string;
    cardBackground: string;
    text: string;
    dominant: string;
    accent: string;
  };
  isSaved: boolean;
  onOpenDetails: (job: Job) => void;
  onToggleSave: (id: string) => void;
  onOpenApply: (job: Job) => void;
  saveText?: string;  
  savedText?: string; 
}

const formatMoney = (value: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
  }).format(value);
};

const JobCard: React.FC<JobCardProps> = ({
  job,
  theme,
  isSaved,
  onOpenDetails,
  onToggleSave,
  onOpenApply,
  saveText = 'Save Job',
  savedText = 'Saved',
}) => {
  return (
    <Pressable
      onPress={() => onOpenDetails(job)}
      style={({ pressed }) => [
        styles.card,
        { backgroundColor: theme.cardBackground },
        {
          transform: [{ scale: pressed ? 0.97 : 1 }],
          opacity: pressed ? 0.9 : 1,
        },
      ]}
    >
      <Text style={[styles.jobTitle, { color: theme.dominant }]}>{job.title}</Text>
      <Text style={[styles.jobCompany, { color: theme.text }]}>
        <Text style={{ fontWeight: 'bold' }}>Company: </Text>
        {job.companyName}
      </Text>
      <Text style={[styles.jobSalary, { color: theme.text }]}>
        <Text style={{ fontWeight: 'bold' }}>Salary: </Text>
        {formatMoney(job.minSalary)} - {formatMoney(job.maxSalary)}
      </Text>
      <View style={styles.buttonsContainer}>

        <Pressable
          onPress={() => onToggleSave(job.id)}
          style={({ pressed }) => [
            styles.button,
            {
              backgroundColor: isSaved ? theme.background : theme.accent,
              borderWidth: 2,
              borderColor: isSaved ? theme.accent : 'transparent',
              transform: [{ scale: pressed ? 0.97 : 1 }],
              opacity: pressed ? 0.9 : 1,
            },
          ]}
        >
          {({ pressed }) => (
            <Text style={[styles.buttonText, { color: theme.text }]}>
              {pressed ? 'Processing...' : isSaved ? savedText : saveText}
            </Text>
          )}
        </Pressable>

        <Pressable
          onPress={() => onOpenApply(job)}
          style={({ pressed }) => [
            styles.button,
            {
              backgroundColor: theme.accent,
              transform: [{ scale: pressed ? 0.97 : 1 }],
              opacity: pressed ? 0.9 : 1,
            },
          ]}
        >
          {({ pressed }) => (
            <Text style={[styles.buttonText, { color: theme.text }]}>
              {pressed ? 'Applying...' : 'Apply'}
            </Text>
          )}
        </Pressable>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
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
});

export default JobCard;
