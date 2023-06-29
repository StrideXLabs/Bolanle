import React from 'react';
import {Text, View, Image} from 'react-native';
import textStyles from '../../constants/fonts';
import {ICardData} from '../../services/dashboard.service';
import {BASE_URL} from '../../constants';
import Button from '../../components/Button';
import {responsiveWidth} from 'react-native-responsive-dimensions';

type Props = {
  editable: boolean;
  qr: ICardData['qr'];
  onDeleteCard: () => void;
};

const QR = ({onDeleteCard, qr, editable}: Props) => {
  return (
    <View className="pb-[50px]">
      <View className="flex flex-row items-center justify-between mt-[21px] mb-[10px]">
        <Text style={textStyles.robotoBold} className="text-accent text-[20px]">
          QR Code
        </Text>
      </View>
      <View className="mt-2 mx-auto flex justify-center items-center">
        <Image
          className="w-[130px] h-[130px] rounded-lg"
          source={{uri: `${BASE_URL}/${qr}`}}
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
