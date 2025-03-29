import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import uuid from 'react-native-uuid';

interface Theme {
  background: string;
  cardBackground: string;
  text: string;
  dominant: string;
  accent: string;
}

interface Job {
  id: string;
  title: string;
  description?: string;
  mainCategory: string;
  applicationLink: string;
  pubDate: string;
  expiryDate: string;
  companyName: string;
  companyLogo: string;
  jobType: string;
  workModel: string;
  seniorityLevel: string;
  minSalary: number;
  maxSalary: number;
  locations: string[];
  tags: string[];
}

interface GlobalContextProps {
  isDarkMode: boolean;
  theme: Theme;
  toggleDarkMode: () => void;
  jobs: Job[];
  fetchJobs: () => void;
  loading: boolean;
  savedJobs: string[];
  toggleSaveJob: (id: string) => void;
}

const lightTheme: Theme = {
  background: '#fff',
  cardBackground: '#d1d8bf',
  text: '#000',
  dominant: '#3971ef',
  accent: '#f86870',
};

const darkTheme: Theme = {
  background: '#121212',
  cardBackground: '#1c1c1c',
  text: '#e0e0e0',
  dominant: '#3971ef',
  accent: '#f86870',
};

const GlobalContext = createContext<GlobalContextProps | undefined>(undefined);

export const GlobalProvider = ({ children }: { children: ReactNode }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const toggleDarkMode = () => setIsDarkMode(prev => !prev);
  const theme = isDarkMode ? darkTheme : lightTheme;

  // Job state and fetching
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [savedJobs, setSavedJobs] = useState<string[]>([]);

  const STORAGE_KEY = 'SAVED_JOBS';

  // Load saved jobs from AsyncStorage on mount
  useEffect(() => {
    const loadSavedJobs = async () => {
      try {
        const savedData = await AsyncStorage.getItem(STORAGE_KEY);
        if (savedData) {
          setSavedJobs(JSON.parse(savedData));
        }
      } catch (error) {
        console.error('Error loading saved jobs:', error);
      }
    };
    loadSavedJobs();
  }, []);

  // Save savedJobs to AsyncStorage whenever it changes
  useEffect(() => {
    const storeSavedJobs = async () => {
      try {
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(savedJobs));
      } catch (error) {
        console.error('Error saving saved jobs:', error);
      }
    };
    storeSavedJobs();
  }, [savedJobs]);

  const fetchJobs = async () => {
    try {
      const response = await fetch('https://empllo.com/api/v1');
      const data = await response.json();
      const jobsArray = Array.isArray(data) ? data : data.jobs;
      if (!jobsArray) {
        throw new Error("No jobs array found in the response");
      }
      const jobsWithId = jobsArray.map((job: any) => ({
        id: job.id ? job.id.toString() : uuid.v4(),
        title: job.title || "",
        description: job.description || "",
        mainCategory: job.mainCategory || "",
        applicationLink: job.applicationLink || "",
        pubDate: job.pubDate || "",
        expiryDate: job.expiryDate || "",
        companyName: job.companyName || "",
        companyLogo: job.companyLogo || "",
        jobType: job.jobType || "",
        workModel: job.workModel || "",
        seniorityLevel: job.seniorityLevel || "",
        minSalary: Number(job.minSalary) || 0,
        maxSalary: Number(job.maxSalary) || 0,
        locations: Array.isArray(job.locations) ? job.locations : [],
        tags: Array.isArray(job.tags) ? job.tags : [],
      }));
      setJobs(jobsWithId);
    } catch (error) {
      console.error('Error fetching jobs:', error);
    } finally {
      setLoading(false);
    }
  };

  const toggleSaveJob = (id: string) => {
    setSavedJobs((prevSavedJobs) =>
      prevSavedJobs.includes(id)
        ? prevSavedJobs.filter((jobId) => jobId !== id)
        : [...prevSavedJobs, id]
    );
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  return (
    <GlobalContext.Provider
      value={{
        isDarkMode,
        theme,
        toggleDarkMode,
        jobs,
        fetchJobs,
        loading,
        savedJobs,
        toggleSaveJob,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error('useGlobalContext must be used within a GlobalProvider');
  }
  return context;
};
