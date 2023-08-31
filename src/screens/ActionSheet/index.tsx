import {Image, View, Text} from 'react-native';
import React, {useCallback, useMemo, useRef, useState} from 'react';
import Layout from '../../components/Layout';
import BottomSheet from '@gorhom/bottom-sheet';

const ActionSheet = () => {
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
          <View className="w-24 h-28 relative">
            <Image
              resizeMode="contain"
              className="w-full h-full absolute left-0"
              source={{
                uri: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
                cache: 'reload',
              }}
            />
          </View>
        </BottomSheet>
      </View>
    </Layout>
  );
};

export default ActionSheet;
