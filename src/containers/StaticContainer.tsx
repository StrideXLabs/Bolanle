import {View} from 'react-native';

import React from 'react';

import GenericHeader from '../components/Header/GenericHeader/GenericHeader';

type StaticContainerProps = {
  isHeader: boolean;
  isBack: boolean;
  title?: string;
  children: React.ReactNode;
  callback?: () => void;
};

const StaticContainer: React.FC<StaticContainerProps> = ({
  isBack,
  title,
  children,
  isHeader,
  callback,
}) => {
  return isHeader ? (
    <View className={'flex-1 p-4  bg-white items-center'}>
      <GenericHeader isBack={isBack} title={title} callback={callback} />
      <View className="flex-1 w-full mt-[15px]">{children}</View>
    </View>
  ) : null;
};

export default StaticContainer;
