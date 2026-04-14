import React, { useState, useEffect } from 'react';
import {
  Modal,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const TermsModal = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    checkTerms();
  }, []);

  const checkTerms = async () => {
    try {
      const accepted = await AsyncStorage.getItem('elevium_terms_accepted');
      if (!accepted) {
        setVisible(true);
      }
    } catch (e) {
      console.error('Failed to load terms status', e);
      setVisible(true);
    }
  };

  const handleAccept = async () => {
    try {
      await AsyncStorage.getItem('elevium_terms_accepted');
      await AsyncStorage.setItem('elevium_terms_accepted', 'true');
      setVisible(false);
    } catch (e) {
      console.error('Failed to save terms status', e);
      setVisible(false);
    }
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={() => {}}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <SafeAreaView style={styles.safeArea}>
            <View style={styles.header}>
              <View style={styles.hackathonBadge}>
                <Text style={styles.badgeText}>HACKATHON PROTOTYPE</Text>
              </View>
              <Text style={styles.modalTitle}>Terms & Conditions</Text>
              <Text style={styles.modalSubtitle}>Please review the terms of use for Elevium.</Text>
            </View>

            <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>1. Prototype Disclaimer</Text>
                <Text style={styles.text}>
                  Elevium is an experimental prototype developed for a hackathon. It is intended for 
                  testing and demonstration only. Features are part of a conceptual framework.
                </Text>
              </View>

              <View style={styles.section}>
                <Text style={styles.sectionTitle}>2. Safety Warning</Text>
                <Text style={styles.text}>
                  This is a Driver Monitoring System (DMS) prototype. NEVER rely on this app 
                  to ensure safety while driving. Always keep your eyes on the road. The developers 
                  are not liable for any incidents during use.
                </Text>
              </View>

              <View style={styles.section}>
                <Text style={styles.sectionTitle}>3. Privacy & Data</Text>
                <Text style={styles.text}>
                  All video processing is done locally on your device. No biometric or video data 
                  is uploaded to our servers during standard operation.
                </Text>
              </View>

              <View style={styles.section}>
                <Text style={styles.sectionTitle}>4. Acceptance</Text>
                <Text style={styles.text}>
                  By continuing, you acknowledge that you understand the risks and that this software 
                  is provided "as is" without warranty of any kind.
                </Text>
              </View>
            </ScrollView>

            <View style={styles.footer}>
              <TouchableOpacity
                style={styles.button}
                onPress={handleAccept}
              >
                <Text style={styles.buttonText}>I Accept & Continue</Text>
              </TouchableOpacity>
            </View>
          </SafeAreaView>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
  },
  modalView: {
    width: '90%',
    height: '80%',
    backgroundColor: '#121212',
    borderRadius: 20,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#333',
  },
  safeArea: {
    flex: 1,
  },
  header: {
    padding: 24,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
    backgroundColor: '#1a1a1a',
  },
  hackathonBadge: {
    backgroundColor: '#3b82f6',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    alignSelf: 'flex-start',
    marginBottom: 8,
  },
  badgeText: {
    color: 'white',
    fontSize: 10,
    fontWeight: 'bold',
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  modalSubtitle: {
    fontSize: 14,
    color: '#999',
    marginTop: 4,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 24,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#3b82f6',
    marginBottom: 8,
  },
  text: {
    fontSize: 14,
    lineHeight: 20,
    color: '#ccc',
  },
  footer: {
    padding: 24,
    borderTopWidth: 1,
    borderTopColor: '#333',
    backgroundColor: '#1a1a1a',
  },
  button: {
    backgroundColor: '#3b82f6',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
