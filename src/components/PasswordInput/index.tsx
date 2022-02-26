import React, { useState } from 'react';
import { TextInputProps } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useTheme } from 'styled-components';

import { BorderlessButton } from 'react-native-gesture-handler';
import { Container, IconContainer, InputText } from './styles';

interface Props extends TextInputProps{
  iconName: React.ComponentProps<typeof Feather>['name'];
  value?: string;
}

export function PasswordInput({
  iconName,
  value,
  ...rest
} : Props){
  const [isPasswordVisible, setIsPasswordVisible] = useState(true);
  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);

  const theme = useTheme();

  const handleInputFocus = () => {
    setIsFocused(true);
  }

  const handleInputBlur = () => {
    setIsFocused(false);
    setIsFilled(!!value)
  }

  const handlePasswordVisibilityChange = () => {
    setIsPasswordVisible(prevState => !prevState);
  }

  return (
    <Container >
      <IconContainer isFocused={isFocused} >
          <Feather 
            name={iconName}
            size={22}
            color={(isFocused || isFilled) ? theme.colors.main : theme.colors.text_detail}
          />
      </IconContainer>
      <InputText 
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        isFocused={isFocused}
        secureTextEntry={isPasswordVisible}
        autoCorrect={false}
        {...rest}
      />

      <BorderlessButton onPress={handlePasswordVisibilityChange}>
        <IconContainer isFocused={isFocused}>
          <Feather 
            name={isPasswordVisible ? 'eye' : 'eye-off'}
            size={22}
            color={theme.colors.text_detail}
          />
        </IconContainer>
      </BorderlessButton>


    </Container>
  )
}