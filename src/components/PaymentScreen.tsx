import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const PaymentScreen: React.FC = () => {
  const navigation = useNavigation();

  const handlePlanSelection = (plan: string) => {
    if (plan === 'free') {
    } else if (plan === 'premium-month') {
      navigation.navigate('PremiumMonthPayment');
    } else if (plan === 'premium-annual') {
      navigation.navigate('PremiumAnnualPayment');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Escolha seu plano</Text>

      <TouchableOpacity
        style={styles.planButton}
        onPress={() => handlePlanSelection('free')}>
        <Text style={styles.planTitle}>FREE</Text>
        <Text style={styles.planDescription}>
          Continue utilizando o aplicativo
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.planButton}
        onPress={() => handlePlanSelection('premium-month')}>
        <Text style={styles.planTitle}>PREMIUM MENSAL</Text>
        <Text style={styles.planDescription}>Valor: R$ 1,99 por mês</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.planButton}
        onPress={() => handlePlanSelection('premium-annual')}>
        <Text style={styles.planTitle}>PREMIUM ANUAL</Text>
        <Text style={styles.planDescription}>Valor: R$ 15,00</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#6A5ACD',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#F5F5DC',
  },
  planButton: {
    backgroundColor: '#F5F5DC',
    padding: 20,
    borderRadius: 20,
    marginVertical: 20,
    width: '80%',
    alignItems: 'center',
  },
  planTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    color: 'black',
  },
  planDescription: {
    fontSize: 14,
    color: '#666',
  },
});

export default PaymentScreen;
