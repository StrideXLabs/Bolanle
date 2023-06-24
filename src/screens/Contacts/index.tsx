import React from 'react';
import {View, Text} from 'react-native';
import {useAuth} from '../../hooks/useAuth';

const ContactsScreen = () => {
  const {user, token, authed} = useAuth();
  console.log({user, token, authed});

  return (
    <View>
      <Text>{JSON.stringify({user, token, authed}, null, 2)}</Text>
    </View>
  );
};

export default ContactsScreen;
