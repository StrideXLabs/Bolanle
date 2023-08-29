import {View} from 'react-native';

import React from 'react';

import GenericHeader from '../components/Header/GenericHeader/GenericHeader';

type StaticContainerProps = {
  isHeader: boolean;
  isBack: boolean;
  title?: string;
  children: React.ReactNode;
};

const StaticContainer: React.FC<StaticContainerProps> = ({
  isBack,
  title,
  children,
  isHeader,
}) => {
  return isHeader ? (
    <View className={`flex-1 p-4  bg-white items-center`}>
      <GenericHeader isBack={isBack} title={title} />
      {children}
    </View>
  ) : null;
};

export default StaticContainer;
