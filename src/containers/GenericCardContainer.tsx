import {View} from 'react-native';
import React from 'react';

type GenericCardContainer = {
  children: React.ReactNode;
};

const GenericCardContainer: React.FC<GenericCardContainer> = ({children}) => {
  return (
    <View
      className={`bg-secondary-blue w-full  py-[20px] px-[17px] rounded-3xl items-center justify-center `}>
      {children}
    </View>
  );
};

export default GenericCardContainer;
