import {View, Text} from 'react-native';
import React from 'react';
import {useState} from 'react';
import TextField from '../../components/TextField/TextFieldDark';
import Button from '../../components/Button';

const LocationDetails = () => {
  const [street, setStreet] = useState('');
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');
  return (
    <>
      <Text className="font-3 text-black text-2xl my-5">Location Details</Text>
      <View className="bg-secondary-blue p-4 rounded-3xl">
        <TextField
          placeholder=""
          onChangeText={text => setStreet(text)}
          value={street}
          bottomBorder
          label="Street"
        />
        <TextField
          placeholder=""
          onChangeText={text => setCity(text)}
          value={city}
          bottomBorder
          label="City"
        />
        <TextField
          placeholder=""
          onChangeText={text => setCountry(text)}
          value={country}
          bottomBorder
          label="Country"
        />
        <View className="px-2">
          <Button text="Add Live Location" callback={() => {}} />
        </View>

        {/* Map here */}
      </View>
    </>
  );
};

export default LocationDetails;
