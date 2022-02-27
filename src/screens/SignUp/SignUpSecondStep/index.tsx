import React, { useState } from 'react';
import { 
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Alert
} from 'react-native';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { useTheme } from 'styled-components';

import { BackButton } from '../../../components/BackButton';
import { Bullet } from '../../../components/Bullet';
import { PasswordInput } from '../../../components/PasswordInput';
import { Button } from '../../../components/Button';

import {
  Container,
  Header,
  Steps,
  Title,
  Subtitle,
  Form,
  FormTitle
} from './styles';
import { RootStackParamList } from '../../../routes';
import { StackNavigationProp } from '@react-navigation/stack';

type NextScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'SignUpSecondStep'
>;

type NextScreenRouteProp = RouteProp<
  RootStackParamList, 
  'SignUpSecondStep'
>;

type NextScreenProps = {
  navigation: NextScreenNavigationProp;
  route: NextScreenRouteProp;
}

interface Params {
  user: {
    name: string;
    email: string;
    driverLicense: string;
  }
}

export function SignUpSecondStep({ navigation, route }: NextScreenProps){
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');

  const theme = useTheme();

  const { user } = route.params as Params;

  function handleBack() {
    navigation.goBack();    
  }

  async function handleRegister() {
    if(!password || !passwordConfirm){
      return Alert.alert('Informe a palavra-passe e a confirmação');
    }

    if(password != passwordConfirm){
      return Alert.alert('As palavra-passes não são iguais');
    }

    navigation.navigate('Confirmation', {
        nextScreenRoute: 'SignIn',
        title: 'Conta criada!',
        message: `Agora é só fazer o login\n e aproveitar.`
      })

  }

  return (
    <KeyboardAvoidingView behavior="position" enabled>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Container>
          <Header>
            <BackButton onPress={handleBack} />
            <Steps>
              <Bullet  />
              <Bullet active />
            </Steps>
          </Header>

          <Title>
            Crie sua{'\n'}conta
          </Title>
          <Subtitle>
            Faça seu cadastro de{'\n'}
            forma rápida e fácil
          </Subtitle>

          <Form>
            <FormTitle>2. Palavra-passe</FormTitle>
            <PasswordInput 
              iconName="lock"
              placeholder="Palavra-passe"
              onChangeText={setPassword}
              value={password}
            />
            <PasswordInput 
              iconName="lock"
              placeholder="Repetir Palavra-passe"
              onChangeText={setPasswordConfirm}
              value={passwordConfirm}
            />
          </Form>

          <Button 
            color={theme.colors.success}
            title="Registar"     
            onPress={handleRegister}   
          />
        </Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}