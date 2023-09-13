import React from 'react';
import {
  Image,
  ImageSourcePropType,
  Pressable,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import addButton from '../../../assets/images/AddButton.png';
import arrowLeft from '../../../assets/images/arrow-left.png';
import shareIcon from '../../../assets/images/share.png';
import {percentToPx} from '../../../constants';
import textStyles from '../../../constants/fonts';
import {BurgerMenuIcon} from '../../../constants/icons';
import {flushStorage} from '../../../lib/storage';
import {useAuth, initialAuthState} from '../../../hooks/useAuth';
import userImg from '../../../assets/images/user-db.png';

interface IDashboardHeaderAddTypeProps {
  heading: string;
  type: 'ADD_NEW_VIEW';
  onAddNewBtnPress: () => void;
  userDetails?: {
    name: string;
    designation: string;
  };
}

interface IDashboardHeaderEditTypeProps {
  heading?: string;
  subheading?: string;
  type: 'VIEW_OR_EDIT';
  onBackBtnPress: () => void;
  onShareBtnPress: () => void;
}

interface IDashboardHeaderShareTypeProps
  extends Omit<Omit<IDashboardHeaderEditTypeProps, 'onShareBtnPress'>, 'type'> {
  type: 'SHARE_VIEW';
}

export type DashboardHeaderProps = {
  options:
    | IDashboardHeaderAddTypeProps
    | IDashboardHeaderEditTypeProps
    | IDashboardHeaderShareTypeProps;
};

const DashboardHeader = ({options}: DashboardHeaderProps) => {
  const {setAuthState} = useAuth();

  const handleLogout = async () => {
    await flushStorage();
    setAuthState({...initialAuthState, redirectToLogin: true});
  };

  return (
    <View
      className="bg-white"
      style={{
        paddingTop: responsiveHeight(24 / percentToPx),
        paddingBottom: responsiveHeight(10 / percentToPx),
        paddingHorizontal: responsiveHeight(22 / percentToPx),
      }}>
      {options.type === 'ADD_NEW_VIEW' && (
        <View className="flex flex-row items-center justify-between">
          <View className="flex flex-row gap-2 items-center">
            <Image
              resizeMode="contain"
              className={'h-11 w-11 rounded-lg'}
              source={userImg as ImageSourcePropType}
            />
            <View className="flex flex-col">
              <Text className="text-md font-3 -mb-1 text-black">
                {options.userDetails?.name}
              </Text>
              <Text className="text-xs font-1">
                {options.userDetails?.designation}
              </Text>
            </View>
          </View>
          <View className="flex flex-row gap-3">
            <TouchableOpacity onPress={options.onAddNewBtnPress}>
              <Image
                resizeMode="contain"
                className={`h-9 w-9`}
                source={addButton as ImageSourcePropType}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                handleLogout();
              }}>
              <Image
                source={BurgerMenuIcon as ImageSourcePropType}
                className={`h-9 w-9`}
              />
            </TouchableOpacity>
          </View>
        </View>
      )}
      {(options.type === 'VIEW_OR_EDIT' || options.type === 'SHARE_VIEW') && (
        <View>
          <View className="flex flex-row justify-between">
            <View>
              <TouchableOpacity onPress={options.onBackBtnPress}>
                <Image
                  style={{
                    width: responsiveWidth(35 / percentToPx),
                    height: responsiveHeight(25 / percentToPx),
                  }}
                  resizeMode="contain"
                  source={arrowLeft as ImageSourcePropType}
                />
              </TouchableOpacity>
              <Text
                style={[
                  {
                    fontSize: responsiveFontSize(28 / percentToPx),
                    marginTop: responsiveHeight(10 / percentToPx),
                  },
                ]}
                className="text-black font-3">
                {options.heading}
              </Text>
            </View>
            {options.type !== 'SHARE_VIEW' && (
              <Pressable
                className="flex flex-row"
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: responsiveHeight(25 / percentToPx),
                }}
                onPress={options.onShareBtnPress}>
                <Image
                  resizeMode="contain"
                  className="w-[30px] h-[30px] mt-1 mr-1"
                  source={shareIcon as ImageSourcePropType}
                />
                <Text className="text-black text-base font-2">Share</Text>
              </Pressable>
            )}
          </View>
          <View
            className="w-full h-[2px] bg-accent rounded-sm"
            style={{marginTop: responsiveHeight(10 / percentToPx)}}
          />
          <Text
            style={[
              {
                marginTop: responsiveHeight(4 / percentToPx),
                fontSize: responsiveFontSize(13 / percentToPx),
              },
            ]}
            className="text-black font-1">
            {options.subheading}
          </Text>
        </View>
      )}
    </View>
  );
};

export default DashboardHeader;
