import {View, Image, Text} from 'react-native';
import React from 'react';
import Layout from '../../components/Layout';
import {responsiveHeight} from 'react-native-responsive-dimensions';
import {percentToPx} from '../../constants';
import TextField from '../../components/TextField/TextFieldLight';
import {SearchIcon} from '../../constants/icons';
import StaticContainer from '../../containers/StaticContainer';
import ContactCard from './testCard';

const ContactsScreen = () => {
  const [searchText, setSearchText] = React.useState('');
  return (
    <Layout>
      <StaticContainer isBack isHeader title="Contacts">
        <View
          className="w-full"
          style={{
            paddingVertical: responsiveHeight(17 / percentToPx),
            paddingHorizontal: responsiveHeight(4 / percentToPx),
          }}>
          <TextField
            placeholder="Search contact, tag ..."
            onChangeText={text => {
              setSearchText(text);
            }}
            value={searchText}
            gradient={true}
            icon={
              <Image
                source={SearchIcon as any}
                className={`h-5 w-5`}
                style={{tintColor: '#8a8a8f'}}
              />
            }
          />

          {/* Cards */}
          <View
            style={{
              marginTop: responsiveHeight(10 / percentToPx),
            }}>
            <ContactCard />
          </View>
        </View>
      </StaticContainer>
    </Layout>
  );
};

export default ContactsScreen;
