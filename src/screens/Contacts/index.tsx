import React, {useState} from 'react';
import {Image, ImageSourcePropType, Text, View} from 'react-native';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {percentToPx} from '../../constants';
import textStyles from '../../constants/fonts';
import TextField from '../../components/TextField/TextFieldDark';
import searchIcon from '../../assets/images/search.png';

const ContactsScreen = () => {
  const [search, setSearch] = useState('');
  const [contacts, setContacts] = useState([]);

  const filteredContacts = search ? contacts : contacts;

  return (
    <View
      className="bg-white"
      style={{
        height: '100%',
        paddingLeft: responsiveHeight(36 / percentToPx),
        paddingRight: responsiveHeight(40 / percentToPx),
        paddingVertical: responsiveHeight(20 / percentToPx),
      }}>
      <Text
        style={textStyles.bebasNeueBold}
        className="text-dark-blue text-4xl">
        Contacts
      </Text>
      <View style={{marginTop: responsiveHeight(46 / percentToPx)}}>
        <TextField
          label=""
          value={search}
          placeholder="Search contacts"
          className="border-dark-blue border-[2px]"
          style={{paddingLeft: responsiveHeight(5)}}
          onChangeText={text => setSearch(text)}
        />
        <Image
          className="absolute"
          resizeMode="contain"
          source={searchIcon as ImageSourcePropType}
          style={{
            top: responsiveHeight(12.7 / percentToPx),
            left: responsiveHeight(13 / percentToPx),
            width: responsiveWidth(30.46 / percentToPx),
            height: responsiveWidth(30.46 / percentToPx),
          }}
        />
      </View>
    </View>
  );
};

export default ContactsScreen;
