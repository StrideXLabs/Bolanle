import React from 'react';
import {Image, ImageSourcePropType, Text, ScrollView, View} from 'react-native';
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
  onEditPress: (info: ICardData['personalInfo']) => void;
};

const PersonalInfo = ({personalInfo, onEditPress, editable}: Props) => {
  return (
    <View
      style={{
        paddingHorizontal: responsiveHeight(20 / percentToPx),
        paddingVertical: responsiveHeight(14 / percentToPx),
      }}>
      <Text className="font-2 text-black text-2xl">Personal Details</Text>

      <View
        className="bg-secondary-blue p-4 rounded-2xl"
        style={{
          marginTop: responsiveHeight(14 / percentToPx),
        }}>
        <TextField
          placeholder=""
          value={personalInfo.name}
          bottomBorder
          label="Name"
          editable={false}
        />
        <TextField
          placeholder=""
          value={personalInfo.designation}
          bottomBorder
          label="Job Title"
          editable={false}
        />
        <TextField
          placeholder=""
          value={personalInfo.department}
          bottomBorder
          label="Department"
          editable={false}
        />
        <TextField
          placeholder=""
          value={personalInfo.companyName}
          bottomBorder
          label="Company"
          editable={false}
        />

        <View className="px-2">
          {editable && (
            <Button
              text="Edit Details"
              callback={() => onEditPress(personalInfo)}
            />
          )}
        </View>
      </View>
    </View>
  );
};

export default PersonalInfo;
