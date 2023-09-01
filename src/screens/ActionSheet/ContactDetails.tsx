import {View, Text} from 'react-native';
import React from 'react';
import {useState} from 'react';
import TextField from '../../components/TextField/TextFieldDark';
import Button from '../../components/Button';

const ContactDetails = () => {
  const [email, setEmail] = useState('');
  const [contact, setContact] = useState('');
  const [link, setLink] = useState('');
  const [address, setAddress] = useState('');
  return (
    <>
      <Text className="font-3 text-black text-2xl my-5">Contact Details</Text>
      <TextField
        placeholder=""
        onChangeText={text => setEmail(text)}
        value={email}
        bottomBorder
        label="Email"
      />
      <TextField
        placeholder=""
        onChangeText={text => setContact(text)}
        value={contact}
        bottomBorder
        label="Contact"
      />
      <TextField
        placeholder=""
        onChangeText={text => setLink(text)}
        value={link}
        bottomBorder
        label="Link"
      />
      <TextField
        placeholder=""
        onChangeText={text => setAddress(text)}
        value={address}
        bottomBorder
        label="Address"
      />
      <View className="px-2">
        <Button text="Save Details" callback={() => {}} />
      </View>
    </>
  );
};

export default ContactDetails;
