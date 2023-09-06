import {Image, View, TouchableOpacity} from 'react-native';
import React, {useCallback, useMemo, useRef, useState} from 'react';
import Layout from '../../components/Layout';
import BottomSheet, {BottomSheetScrollView} from '@gorhom/bottom-sheet';
import EditProfileDetails from './EditProfileDetails';
import StaticContainer from '../../containers/StaticContainer';
import {AppStackParams} from '../../navigation/AppNavigation';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {BottomTabNavigatorParams} from '../../navigation/BottomNavigation';

type ActionSheetProps = NativeStackScreenProps<
  BottomTabNavigatorParams & AppStackParams,
  'ActionSheetScreen'
>;

const ActionSheet = ({navigation}: ActionSheetProps) => {
  // ref
  const bottomSheetRef = useRef<BottomSheet>(null);

  // variables
  const snapPoints = useMemo(() => ['70%', '100%'], []);

  // callbacks
  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index);
  }, []);

  return (
    <Layout>
      {/* <StaticContainer isBack isHeader title="Dashboard"> */}
      <View className="flex-1">
        <View className="h-[38%] w-full">
          <Image
            resizeMode="cover"
            className="h-full w-full opacity-70 bg-black"
            source={{
              uri: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80',
            }}
          />
        </View>
        <BottomSheet
          ref={bottomSheetRef}
          index={1}
          snapPoints={snapPoints}
          onChange={handleSheetChanges}
          backgroundStyle={{
            borderRadius: 40,
          }}
          handleIndicatorStyle={{backgroundColor: 'blue'}}>
          <BottomSheetScrollView>
            <EditProfileDetails navigation={navigation} />
          </BottomSheetScrollView>
        </BottomSheet>
      </View>
      {/* </StaticContainer> */}
    </Layout>
  );
};

export default ActionSheet;
