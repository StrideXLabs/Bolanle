import React from 'react';
import {
  Image,
  ImageSourcePropType,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  responsiveFontSize,
  responsiveHeight,
} from 'react-native-responsive-dimensions';
import editIcon from '../../assets/images/edit.png';
import {percentToPx} from '../../constants';
import textStyles from '../../constants/fonts';
import {ICardData} from '../../services/dashboard.service';
import {PencilIcon} from '../../constants/icons';
import TextField from '../../components/TextField/TextFieldDark';
import Button from '../../components/Button';

type Props = {
  editable: boolean;
  personalInfo: ICardData['personalInfo'];
  contactDetails: ICardData['contactDetails'];
  onEditPress: (info: ICardData['personalInfo']) => void;
};

const LocationDetails = ({
  personalInfo,
  contactDetails,
  onEditPress,
  editable,
}: Props) => {
  console.log('contact', contactDetails);

  return (
    <View
      style={{
        paddingHorizontal: responsiveHeight(20 / percentToPx),
        paddingVertical: responsiveHeight(14 / percentToPx),
      }}>
      <Text className="font-2 text-black text-2xl">Location Details</Text>

      <View
        className="bg-secondary-blue p-4 rounded-2xl"
        style={{
          marginTop: responsiveHeight(14 / percentToPx),
        }}>
        <TextField
          placeholder=""
          value={contactDetails.companyAddress}
          bottomBorder
          label="City"
          editable={false}
        />
        <TextField
          placeholder=""
          value={contactDetails.companyAddress}
          bottomBorder
          label="Address"
          editable={false}
        />
        <TextField
          placeholder=""
          value={contactDetails.companyAddress}
          bottomBorder
          label="Country"
          editable={false}
        />
        <Image
          resizeMode="contain"
          className={'h-44 w-full mb-8'}
          source={{
            uri: 'https://geology.com/world/the-united-states-of-america-map.gif',
          }}
        />

        <View className="px-2">
          {editable && <Button text="Edit Details" callback={() => {}} />}
        </View>
      </View>
    </View>
  );
};

export default LocationDetails;
