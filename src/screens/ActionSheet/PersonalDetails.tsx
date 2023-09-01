import {View, Text} from 'react-native';
import React, {useState} from 'react';
import TextField from '../../components/TextField/TextFieldDark';
import Button from '../../components/Button';

const PersonalDetails = () => {
  const [name, setName] = useState('');
  const [designation, setDesignation] = useState('');
  const [company, setCompany] = useState('');
  const [department, setDepartment] = useState('');
  return (
    <>
      <Text className="font-3 text-black text-2xl my-5">Personal Details</Text>
      <View className="bg-secondary-blue p-4 rounded-3xl">
        <TextField
          placeholder=""
          onChangeText={text => setName(text)}
          value={name}
          bottomBorder
          label="Name"
        />
        <TextField
          placeholder=""
          onChangeText={text => setDesignation(text)}
          value={designation}
          bottomBorder
          label="Designation"
        />
        <TextField
          placeholder=""
          onChangeText={text => setCompany(text)}
          value={company}
          bottomBorder
          label="Company"
        />
        <TextField
          placeholder=""
          onChangeText={text => setDepartment(text)}
          value={department}
          bottomBorder
          label="Department"
        />

        <View className="px-2">
          <Button text="Save Details" callback={() => {}} />
        </View>
      </View>
    </>
  );
};

export default PersonalDetails;
