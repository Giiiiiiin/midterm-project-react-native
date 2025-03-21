
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useGlobalContext } from '../context/globalContext';

const Footer = () => {
  const { theme } = useGlobalContext();

  return (
    <View style={[styles.footer, { backgroundColor: theme.cardBackground }]}>
      <Text style={[styles.footerText, { color: theme.text }]}>
        © 2025 Job Finder App
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    width: '100%',
    padding: 16,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 14,
  },
});

export default Footer;
