import React, { useEffect, useState } from 'react';
import { Image } from 'react-native';

import api from '../../services/api';
import formatValue from '../../utils/formatValue';

import {
  Container,
  Header,
  HeaderTitle,
  FoodsContainer,
  FoodList,
  Food,
  FoodImageContainer,
  FoodContent,
  FoodTitle,
  FoodDescription,
  FoodPricing,
} from './styles';

interface IFood {
  id: number;
  name: string;
  description: string;
  price: number;
  formattedValue: string;
  thumbnail_url: string;
}

const Orders: React.FC = () => {
  const [orders, setOrders] = useState<IFood[]>([]);

  useEffect(() => {
    async function loadOrders(): Promise<void> {
      let newOrders: IFood[];

      const response = await api.get('/orders');

      // eslint-disable-next-line prefer-const
      newOrders = response.data;

      function f_formatValue(item: IFood): IFood {
        // eslint-disable-next-line no-param-reassign
        item.formattedValue = formatValue(item.price);
        return item;
      }

      newOrders = newOrders.map(f_formatValue);

      setOrders(newOrders);
    }

    loadOrders();
  }, []);

  return (
    <Container>
      <Header>
        <HeaderTitle>Meus pedidos</HeaderTitle>
      </Header>

      <FoodsContainer>
        <FoodList
          data={orders}
          keyExtractor={item => String(item.id)}
          renderItem={({ item }) => (
            <Food key={item.id} activeOpacity={0.6}>
              <FoodImageContainer>
                <Image
                  style={{ width: 88, height: 88 }}
                  source={{ uri: item.thumbnail_url }}
                />
              </FoodImageContainer>
              <FoodContent>
                <FoodTitle>{item.name}</FoodTitle>
                <FoodDescription>{item.description}</FoodDescription>
                <FoodPricing>{item.formattedValue}</FoodPricing>
              </FoodContent>
            </Food>
          )}
        />
      </FoodsContainer>
    </Container>
  );
};

export default Orders;
