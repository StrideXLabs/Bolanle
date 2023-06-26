import React from 'react';
import {View, Text} from 'react-native';
import {useAuth} from '../../hooks/useAuth';

const ContactsScreen = () => {
  const {user, token, authed} = useAuth();

  return (
    <View className="bg-white">
      <Text className="text-dark-blue">
        {JSON.stringify({user, token, authed}, null, 2)}
      </Text>
    </View>
  );
};

export default ContactsScreen;
