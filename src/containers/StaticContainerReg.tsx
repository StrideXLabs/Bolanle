import {View} from 'react-native';

import React from 'react';

import GenericHeader from '../components/Header/GenericHeader/GenericHeader';
import RegistrationHeader from '../components/Header/GenericHeader/RegistrationHeader';

type StaticContainerProps = {
  isHeader: boolean;
  isBack: boolean;
  title: string;
  children: React.ReactNode;
  onBackPress?: () => void;
};

const StaticContainerReg: React.FC<StaticContainerProps> = ({
  isBack,
  title,
  children,
  isHeader,
  onBackPress,
}) => {
  return isHeader ? (
    <View className={`flex-1 p-4 bg-white items-center`}>
      <RegistrationHeader
        isBack={isBack}
        title={title}
        onBackPress={onBackPress}
      />
      {children}
    </View>
  ) : null;
};

export default StaticContainerReg;
