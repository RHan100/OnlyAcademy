import React, {useState} from 'react';
import {
  Button as PaperButton,
  Card,
  Paragraph,
  TextInput,
  Title,
} from 'react-native-paper';
import axios from 'axios';
import {StyleSheet} from 'react-native';

const PremiumAnnualPayment = () => {
  const [value, setValue] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = () => {
    const data = {
      amount: {currency: 'BRL', value: value},
      interval: {unit: 'YEAR', length: 1},
      trial: {enabled: false, hold_setup_fee: false},
      payment_method: ['CREDIT_CARD'],
      name: name,
      description: description,
    };
    const token = process.env.PAGSEGURO_TOKEN;
    console.log(data, token);

    axios
      .post('https://sandbox.api.assinaturas.pagseguro.com/plans', data, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.PAGSEGURO_TOKEN}`,
        },
      })
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        if (error.response) {
          console.error('Erro de resposta do servidor:', error.response.data);
          // console.error('Ocorreu um erro:', error.message);
          // console.error('Detalhes do erro:', error.stack);
          // console.error('Resposta HTTP:', error.response);
          // console.error('Configuração da requisição:', error.config);
        } else if (error.request) {
          console.error('Sem resposta do servidor:', error.request);
        } else {
          console.error('Erro ao configurar a requisição:', error.message);
        }
      });
  };

  return (
    <Card style={styles.card}>
      <Card.Content style={styles.cardContent}>
        <Title style={styles.title}>Assine o Plano Anual por R$16,99</Title>
        <Paragraph style={styles.paragraph}>
          Preencha os campos abaixo para criar sua assinatura.
        </Paragraph>
        <TextInput
          style={styles.input}
          label="Valor"
          value={value}
          onChangeText={setValue}
          mode="outlined"
        />
        <TextInput
          style={styles.input}
          label="Nome"
          value={name}
          onChangeText={setName}
          mode="outlined"
        />
        <TextInput
          style={styles.input}
          label="Descrição"
          value={description}
          onChangeText={setDescription}
          mode="outlined"
        />
        <PaperButton
          style={styles.button}
          onPress={handleSubmit}
          mode="contained">
          Assinar
        </PaperButton>
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 16,
  },
  cardContent: {
    padding: 16,
  },
  title: {
    fontSize: 20,
    marginBottom: 10,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  paragraph: {
    marginBottom: 10,
  },
  input: {
    marginBottom: 10,
  },
  button: {
    marginTop: 10,
    // backgroundColor: '#6A5ACD',
  },
});

export default PremiumAnnualPayment;
