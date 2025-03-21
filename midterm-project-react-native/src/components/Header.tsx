import React from 'react';
import { View, Text, StyleSheet, Switch, Pressable } from 'react-native';
import { useGlobalContext } from '../context/globalContext';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

const Header = () => {
  const { isDarkMode, theme, toggleDarkMode } = useGlobalContext();
  const navigation = useNavigation();
  const canGoBack = navigation.canGoBack();

  return (
    <View style={[styles.header, { backgroundColor: theme.cardBackground }]}>
      <View style={styles.leftContainer}>
        {canGoBack && (
          <Pressable onPress={() => navigation.goBack()} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color={theme.dominant} />
          </Pressable>
        )}
        <Text style={[styles.title, { color: theme.dominant }]}>
          Job Finder App
        </Text>
      </View>
      <Switch
        value={isDarkMode}
        onValueChange={toggleDarkMode}
        thumbColor={theme.accent}
        trackColor={{ false: '#767577', true: '#81b0ff' }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    width: '100%',
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  leftContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    marginRight: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default Header;
