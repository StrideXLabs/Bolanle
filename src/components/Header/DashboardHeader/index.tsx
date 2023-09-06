import React from 'react';
import {
  Image,
  ImageSourcePropType,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {responsiveHeight} from 'react-native-responsive-dimensions';
import {percentToPx} from '../../../constants';
import {NotificationsIcon, BurgerMenuIcon} from '../../../constants/icons';
import {flushStorage} from '../../../lib/storage';
import {initialAuthState, useAuth} from '../../../hooks/useAuth';

const DashboardHeader = () => {
  const {setAuthState} = useAuth();

  const handleLogout = async () => {
    await flushStorage();
    setAuthState({...initialAuthState, redirectToLogin: true});
  };

  return (
    <View
      className="bg-white"
      style={{
        paddingVertical: responsiveHeight(17 / percentToPx),
        paddingHorizontal: responsiveHeight(20 / percentToPx),
      }}>
      <View className="flex flex-row items-center justify-between">
        <View className="flex flex-row gap-2 items-center">
          <Image
            resizeMode="contain"
            className={'h-12 w-12 rounded-md'}
            // source={{
            //   uri: BASE_URL + `/${rest._id}/${contactDetails?.profileImage}`,
            //   cache: 'reload',
            // }}
            source={{
              uri: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
              cache: 'reload',
            }}
          />
          <View className="flex flex-col">
            <Text className="text-md font-3 -mb-1">Anne Jackson</Text>
            <Text className="text-sm font-0">Free Tier</Text>
          </View>
        </View>
        <View className="flex flex-row gap-3">
          <TouchableOpacity>
            <Image
              source={NotificationsIcon as ImageSourcePropType}
              className={`h-9 w-9`}
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
      {/* {options.type === 'ADD_NEW_VIEW' && (
        <View className="flex flex-row items-center justify-between">
          <Text
            style={[
              textStyles.bebasNeueBold,
              { fontSize: responsiveFontSize(28 / percentToPx) },
            ]}
            className="text-dark-blue">
            {options.heading}
          </Text>
          <TouchableOpacity
            onPress={options.onAddNewBtnPress}
            className="flex flex-row items-center">
            <Image
              resizeMode="contain"
              style={{
                width: responsiveWidth(7),
                aspectRatio: 1
              }}
              source={addNewIcon as ImageSourcePropType}
            />
            <Text
              style={[
                textStyles.robotoMedium,
                {
                  fontSize: responsiveFontSize(16 / percentToPx),
                  marginLeft: responsiveHeight(10 / percentToPx),
                },
              ]}
              className="text-dark-blue">
              Add New
            </Text>
          </TouchableOpacity>
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
                  textStyles.bebasNeueBold,
                  {
                    fontSize: responsiveFontSize(28 / percentToPx),
                    marginTop: responsiveHeight(10 / percentToPx),
                  },
                ]}
                className="text-dark-blue">
                {options.heading}
              </Text>
            </View>
            {options.type !== 'SHARE_VIEW' && (
              <Pressable
                className="flex flex-row"
                style={{
                  justifyContent: "center", alignItems: "center",
                  height: responsiveHeight(25 / percentToPx),
                }}
                onPress={options.onShareBtnPress}>
                <Image
                  resizeMode="contain"
                  className="w-[30px] h-[30px] mt-1 mr-1"
                  source={shareIcon as ImageSourcePropType}
                />
                <Text
                  style={textStyles.robotoMedium}
                  className="text-dark-blue text-base">
                  Share
                </Text>
              </Pressable>
            )}
          </View>
          <View
            className="w-full h-[2px] bg-dark-blue rounded-sm"
            style={{ marginTop: responsiveHeight(10 / percentToPx) }}
          />
          <Text
            style={[
              textStyles.robotoRegular,
              {
                marginTop: responsiveHeight(4 / percentToPx),
                fontSize: responsiveFontSize(13 / percentToPx),
              },
            ]}
            className="text-dark-blue">
            {options.subheading}
          </Text>
        </View>
      )} */}
    </View>
  );
};

export default DashboardHeader;
