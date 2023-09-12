import React from 'react';
import {Image, Text, View} from 'react-native';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import Button from '../../components/Button';
import {BASE_URL, percentToPx} from '../../constants';
import textStyles from '../../constants/fonts';
import {ICardData} from '../../services/dashboard.service';

type Props = {
  cardId: string;
  editable: boolean;
  qr: ICardData['qr'];
  onDeleteCard: () => void;
};

const QR = ({onDeleteCard, qr, editable, cardId}: Props) => {
  return (
    <View
      style={{
        paddingHorizontal: responsiveHeight(20 / percentToPx),
        paddingVertical: responsiveHeight(14 / percentToPx),
      }}>
      <Text className="font-2 text-black text-2xl">QR Code</Text>
      <View className="mt-4 mx-auto flex justify-center items-center">
        <Image
          className="w-[130px] h-[130px] rounded-lg"
          source={{uri: `${BASE_URL}/${cardId}/${qr}`}}
        />
        {editable && (
          <Button
            text="Delete Card"
            className="mt-10"
            callback={onDeleteCard}
            style={{
              width: responsiveWidth(60),
            }}
            deleteButton
          />
        )}
      </View>
    </View>
  );
};

export default QR;
