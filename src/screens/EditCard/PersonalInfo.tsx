import React from 'react';
import {
  Image,
  ImageSourcePropType,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import editIcon from '../../assets/images/edit.png';
import textStyles from '../../constants/fonts';
import {ICardData} from '../../services/dashboard.service';

type Props = {
  personalInfo: ICardData['personalInfo'];
  onEditPress: (info: ICardData['personalInfo']) => void;
};

const PersonalInfo = ({personalInfo, onEditPress}: Props) => {
  return (
    <>
      <View className="flex flex-row items-center justify-between mt-[21px] mb-[10px]">
        <Text style={textStyles.robotoBold} className="text-accent text-[20px]">
          Personal Information
        </Text>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => onEditPress(personalInfo)}>
          <Image
            resizeMode="contain"
            className="w-[16.5px] h-[16.5px]"
            source={editIcon as ImageSourcePropType}
          />
        </TouchableOpacity>
      </View>
      <View className="flex">
        <View className="flex flex-row gap-2 mb-[5px]">
          <Text
            style={textStyles.robotoBold}
            className="text-dark-blue font-bold">
            Name
          </Text>
          <Text style={textStyles.robotoRegular} className="text-dark-blue">
            {personalInfo.name}
          </Text>
        </View>
        <View className="flex flex-row gap-2 mb-[5px]">
          <Text
            style={textStyles.robotoBold}
            className="text-dark-blue font-bold">
            Designation
          </Text>
          <Text style={textStyles.robotoRegular} className="text-dark-blue">
            {personalInfo.designation}
          </Text>
        </View>
        <View className="flex flex-row gap-2 mb-[5px]">
          <Text
            style={textStyles.robotoBold}
            className="text-dark-blue font-bold">
            Department
          </Text>
          <Text style={textStyles.robotoRegular} className="text-dark-blue">
            {personalInfo.department}
          </Text>
        </View>
        <View className="flex flex-row gap-2">
          <Text
            style={textStyles.robotoBold}
            className="text-dark-blue font-bold">
            Company
          </Text>
          <Text style={textStyles.robotoRegular} className="text-dark-blue">
            {personalInfo.companyName}
          </Text>
        </View>
      </View>
    </>
  );
};

export default PersonalInfo;
