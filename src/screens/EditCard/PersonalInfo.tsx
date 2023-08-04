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
import { percentToPx } from '../../constants';
import textStyles from '../../constants/fonts';
import { ICardData } from '../../services/dashboard.service';

type Props = {
  editable: boolean;
  personalInfo: ICardData['personalInfo'];
  onEditPress: (info: ICardData['personalInfo']) => void;
};

const PersonalInfo = ({ personalInfo, onEditPress, editable }: Props) => {
  return (
    <>
      <View
        className="flex flex-row items-center justify-between"
        style={{
          marginTop: responsiveHeight(17 / percentToPx),
          marginBottom: responsiveHeight(13 / percentToPx),
        }}>
        <Text
          style={[
            textStyles.robotoBold,
            { fontSize: responsiveFontSize(18 / percentToPx) },
          ]}
          className="text-accent">
          Personal Information
        </Text>
        {editable && (
          <TouchableOpacity
            className="p-1"
            activeOpacity={0.8}
            onPress={() => onEditPress(personalInfo)}>
            <Image
              resizeMode="contain"
              className="w-[16.5px] h-[16.5px]"
              source={editIcon as ImageSourcePropType}
            />
          </TouchableOpacity>
        )}
      </View>
      <View className="flex">
        <View
          className="flex flex-row gap-2"
          style={{ marginBottom: responsiveHeight(8 / percentToPx) }}>
          <Text
            style={[
              textStyles.robotoBold,
              { fontSize: responsiveFontSize(13 / percentToPx) },
            ]}
            className="text-dark-blue font-bold">
            Name
          </Text>
          <Text
            style={[
              textStyles.robotoRegular,
              { fontSize: responsiveFontSize(13 / percentToPx) },
            ]}
            className="text-dark-blue">
            {personalInfo.name}
          </Text>
        </View>
        <View
          className="flex flex-row gap-2"
          style={{ marginBottom: responsiveHeight(8 / percentToPx) }}>
          <Text
            style={[
              textStyles.robotoBold,
              { fontSize: responsiveFontSize(13 / percentToPx) },
            ]}
            className="text-dark-blue font-bold">
            Job Title
          </Text>
          <Text
            style={[
              textStyles.robotoRegular,
              { fontSize: responsiveFontSize(13 / percentToPx) },
            ]}
            className="text-dark-blue">
            {personalInfo.designation}
          </Text>
        </View>
        <View
          className="flex flex-row gap-2"
          style={{ marginBottom: responsiveHeight(8 / percentToPx) }}>
          <Text
            style={[
              textStyles.robotoBold,
              { fontSize: responsiveFontSize(13 / percentToPx) },
            ]}
            className="text-dark-blue font-bold">
            Department
          </Text>
          <Text
            style={[
              textStyles.robotoRegular,
              { fontSize: responsiveFontSize(13 / percentToPx) },
            ]}
            className="text-dark-blue">
            {personalInfo.department}
          </Text>
        </View>
        <View className="flex flex-row gap-2 flex-wrap">
          <Text
            style={[
              textStyles.robotoBold,
              { fontSize: responsiveFontSize(13 / percentToPx) },
            ]}
            className="text-dark-blue font-bold">
            Company
          </Text>
          <Text
            style={[
              textStyles.robotoRegular,
              { fontSize: responsiveFontSize(13 / percentToPx) },
            ]}
            className="text-dark-blue">
            {personalInfo.companyName}
          </Text>
        </View>
      </View>
    </>
  );
};

export default PersonalInfo;
