import React, { useEffect, useState } from 'react';
import { RouteProp } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';
import { RFValue } from 'react-native-responsive-fontsize';
import { useTheme } from 'styled-components';
import { useNetInfo } from '@react-native-community/netinfo';

import { BackButton } from '../../components/BackButton';
import { ImageSlider } from '../../components/ImageSlider';
import { Accessory } from '../../components/Accessory';
import { Button } from '../../components/Button';
import { StackNavigationProp } from '@react-navigation/stack';
import { CarDTO } from '../../dtos/CarDTO';

import { getAccessoryIcon } from '../../utils/getAccessoryIcon';
import { format } from 'date-fns';
import { getPlatformDate } from '../../utils/getPlatformDate';
import api from '../../services/api';
import { Alert } from 'react-native';
import { RootStackParamList } from '../../routes';

type NextScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'SchedulingDetails'
>;
type NextScreenRouteProp = RouteProp<
  RootStackParamList, 
  'SchedulingDetails'
>;

type NextScreenProps = {
  navigation: NextScreenNavigationProp;
  route: NextScreenRouteProp;
}

interface Params {
  car: CarDTO;
  dates: string[];
}

interface RentalPeriod {
  start: string;
  end: string
}

interface UnavailableDatesProps {
  unavailable_dates: string[];
}

import {
  Container,
  Header,
  CarImages,
  Content,
  Details,
  Description,
  Brand,
  Name,
  Rent,
  Period,
  Price,
  Accessories,
  Footer,
  RentalPeriod,
  CalendarIcon,
  DateInfo,
  DateTitle,
  DateValue,
  RentalPrice,
  RentalPriceLabel,
  RentalPriceDetails,
  RentalPriceQuota,
  RentalPriceTotal,
} from './styles';

interface ImgProps {
  id: string;
  photo: string;

}[];

export function SchedulingDetails({ navigation, route }: NextScreenProps){
 
  const [carUpdate, setCarUpdate] = useState<CarDTO>({} as CarDTO);
  const [loading, setLoading] = useState(false);
  const [rentalPeriod, setRentalPeriod] = useState<RentalPeriod>({} as RentalPeriod)
  
  const netInfo = useNetInfo();
  const theme = useTheme();
  const { car, dates } = route.params as Params
  const totalRent = Number(dates.length * car.price);

  async function handleConfirmation() {
    // const schedulesByCar = await api.get(`/schedules_bycars/${car.id}`);
    // const dataUnavailableDates = schedulesByCar.data as UnavailableDatesProps;
    // const unavailableDates = dataUnavailableDates.unavailable_dates

    // const unavailable_dates = [
    //   ...unavailableDates,
    //   ...dates,
    // ];

    await api.post('rentals', {
      user_id: 2,
      car_id: car.id,
      start_date: (new Date(dates[0])),
      end_date: (new Date(dates[dates.length -1])),
      total: totalRent
    })
    .then(() => navigation.navigate('Confirmation', {
      nextScreenRoute: 'Home',
      title: 'Carro alugado!',
      message: `Agora você só precisa ir\naté a concessionária da RENTX\npegar o seu automóvel.`
    }))
    .catch((error) => {
      console.log("ERRO DO ALUGUEL =>", error)
      setLoading(false);
      Alert.alert('Não foi possível confirmar o agendamento.')
    })

  }

  function handleBack() {
    navigation.goBack();
  };

  useEffect(() => {
    setRentalPeriod({
      start: format(getPlatformDate(new Date(dates[0])), 'dd/MM/yyyy'),
      end: format(getPlatformDate(new Date(dates[dates.length -1])), 'dd/MM/yyyy')
    })

  },[]);

  useEffect(() => {
    async function fetchOnlineData() {
      const response = await api.get(`cars/${car.id}`);
      setCarUpdate(response.data);
    }

    if(netInfo.isConnected === true){
      fetchOnlineData();
    }
  },[netInfo.isConnected])

  return (
    <Container >
      <Header>
        <BackButton onPress={handleBack}/>
      </Header>

      <CarImages>
          <ImageSlider 
              imagesUrl={
                !!carUpdate.photos ? 
                carUpdate.photos : [{ id: car.thumbnail, photo: car.thumbnail }]
              } 
            />
      </CarImages>
      
      <Content>
        <Details>
          <Description>
            <Brand>{car.brand}</Brand>
            <Name>{car.name}</Name>
          </Description>

          <Rent>
            <Period>{car.period}</Period>
            <Price>{`R$ ${car.price}`}</Price>
          </Rent>
        </Details>

      
        {
          carUpdate.accessories &&
          <Accessories>
            {
              carUpdate.accessories.map(accessory => (
                <Accessory 
                  key={accessory.type}
                  name={accessory.name}
                  icon={getAccessoryIcon(accessory.type)}
                />
              ))
            }
          </Accessories>
        }

        <RentalPeriod>
          <CalendarIcon>
            <Feather 
              name="calendar"
              size={RFValue(24)}
              color={theme.colors.shape}
            />
          </CalendarIcon>

          <DateInfo>
            <DateTitle>DE</DateTitle>
            <DateValue>{rentalPeriod.start}</DateValue>
          </DateInfo>

          <Feather 
            name="chevron-right"
            size={RFValue(10)}
            color={theme.colors.text}
          />

          <DateInfo>
            <DateTitle>ATÉ</DateTitle>
            <DateValue>{rentalPeriod.end}</DateValue>
          </DateInfo>
        </RentalPeriod>

        <RentalPrice>
          <RentalPriceLabel>TOTAL</RentalPriceLabel>
          <RentalPriceDetails>
            <RentalPriceQuota>{`£ ${car.price} x${dates.length} diárias`}</RentalPriceQuota>
            <RentalPriceTotal>{`£ ${totalRent}`}</RentalPriceTotal>
          </RentalPriceDetails>
        </RentalPrice>
      </Content>

      <Footer>
        <Button 
          title="Alugar agora"
          color={theme.colors.success}
          onPress={handleConfirmation}
          enabled={!loading}
          loading={!!loading}
        />
      </Footer>
    </Container>
  )
} 