import React, {useState} from 'react';
import { StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { useTheme } from 'styled-components';

import { BackButton } from '../../components/BackButton';
import { Button } from '../../components/Button';
import ArrowSvg from '../../assets/arrow.svg';
import { Container, Content, DateInfo, DateTitle, DateValue, Footer, Header, RentalPeriod, Title } from './styles';
import { Calendar,   MarkedDateProps, DayProps } from '../../components/Calendar';



interface RentalPeriod {
  start: string;
  end: string
}

export function Scheduling(){
  const theme = useTheme();

  const [markedDates, setMarkedDates] = useState<MarkedDateProps>({} as MarkedDateProps);
  const [rentalPeriod, setRentalPeriod] = useState<RentalPeriod>({} as RentalPeriod);

  function handleChangeDate(date: DayProps) {

  }
  const navigation = useNavigation()

  function handleSchedulingDetails() {
    navigation.navigate('SchedulingDetails' as never)
  }
  return (
    <Container >
        <StatusBar
          barStyle="light-content"
          translucent
          backgroundColor="transparent"
        />
      <Header>
        <BackButton onPress={() => {}}/>
        <Title>
          Escolha uma {'\n'}
          data de início e {'\n'}
          fim do aluguel
        </Title>

        <RentalPeriod>
          <DateInfo>
            <DateTitle>DE</DateTitle>
            <DateValue selected={true}>
               09/12/2021
            </DateValue>
          </DateInfo>

          <ArrowSvg />

          <DateInfo>
            <DateTitle>ATÉ</DateTitle>
            <DateValue selected={true}>

            </DateValue>
          </DateInfo>
        </RentalPeriod>
      </Header>

      <Content>
        <Calendar 
          markedDates={markedDates}
          onDayPress={markedDates}
        />
      </Content>


      <Footer>
        <Button 
          title="Confirmar"
          onPress={handleSchedulingDetails}
        />
      </Footer>
    </Container>
  )
} 