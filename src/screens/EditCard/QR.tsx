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
    <View style={{paddingBottom: responsiveHeight(5)}}>
      <View className="flex flex-row items-center justify-between mt-[21px] mb-[10px]">
        <Text
          style={[
            textStyles.robotoBold,
            {fontSize: responsiveFontSize(18 / percentToPx)},
          ]}
          className="text-accent">
          QR Code
        </Text>
      </View>
      <View className="mt-2 mx-auto flex justify-center items-center">
        <Image
          className="w-[130px] h-[130px] rounded-lg"
          source={{uri: `${BASE_URL}/${cardId}/${qr}`}}
        />
        {editable && (
          <Button
            text="Delete Card"
            className="mt-[20px]"
            callback={onDeleteCard}
            style={{width: responsiveWidth(60)}}
          />
        )}
      </View>
    </View>
  );
};

export default QR;
