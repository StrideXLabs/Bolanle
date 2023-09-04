import {View, Text, TouchableOpacity, Image} from 'react-native';
import React, {useCallback, useState} from 'react';
import Layout from '../../components/Layout';
import {responsiveHeight} from 'react-native-responsive-dimensions';
import {percentToPx} from '../../constants';
import {
  AddButtonIcon,
  ShareIcon,
  saveIcon,
  sendIcon,
} from '../../constants/icons';
import GenericTextField from '../../components/TextField/GenericTextField/GenericTextField';
import StaticContainer from '../../containers/StaticContainer';

const ScannedCard = () => {
  const colors = ['#F9AAAA', '#FFA500', '#62A82A', '#C0C0C0'];

  const [addTag, setAddTag] = useState(false);
  const [newTag, setNewTag] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [tagColors, setTagColors] = useState<string[]>([]);
  const [selectedColor, setSelectedColor] = useState(colors[0]);

  const handleTagShow = useCallback(() => {
    setAddTag(!addTag);
  }, [addTag]);

  const handleTag = () => {
    if (newTag.trim() !== '') {
      setTags(prevTags => [...prevTags, newTag]);
      setTagColors(prevColors => [...prevColors, selectedColor]);
      setNewTag('');
    }
  };

  const handleColorSelect = (color: string) => {
    setSelectedColor(color);
  };

  return (
    <Layout>
      <StaticContainer isBack isHeader title="Contacts">
        <View
          style={{
            paddingVertical: responsiveHeight(17 / percentToPx),
            paddingHorizontal: responsiveHeight(4 / percentToPx),
          }}>
          <View className="bg-secondary-blue flex w-full rounded-3xl p-4 space-y-5">
            {/* Card */}
            <View className="w-full bg-white rounded-3xl flex flex-row space-x-3">
              <Image
                resizeMode="contain"
                className="rounded-2xl h-48 w-40"
                source={{
                  uri: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
                  cache: 'reload',
                }}
              />
              <View className="flex-1 justify-center space-y-1">
                <View className="flex flex-col mb-4">
                  <Text className="font-4 text-xl text-black">
                    Emily{'\n'}Watson
                  </Text>
                  <Text className="font-1">Project Manager</Text>
                </View>
                <View className="flex flex-row gap-1">
                  <TouchableOpacity>
                    <Image
                      source={ShareIcon as any}
                      className={`h-8 w-8`}
                      resizeMode="contain"
                    />
                  </TouchableOpacity>
                  <TouchableOpacity>
                    <Image
                      source={saveIcon as any}
                      className={`h-8 w-8`}
                      resizeMode="contain"
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </View>

            {/* Tags */}

            <View>
              <Text className="font-2 text-black text-xl">Tags</Text>

              <View className="flex flex-row gap-2 mt-2 items-center flex-wrap">
                {tags.map((tag, index) => (
                  <TouchableOpacity
                    key={index}
                    className={`px-3 py-2 rounded-full`}
                    style={{backgroundColor: tagColors[index]}}>
                    <Text className="text-white font-2">{tag}</Text>
                  </TouchableOpacity>
                ))}
                <TouchableOpacity onPress={handleTagShow}>
                  <Image
                    source={AddButtonIcon as any}
                    className={`h-10 w-10 ${addTag ? 'rotate-45' : ''}`}
                    resizeMode="contain"
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>

          {/* Add Tag */}

          {addTag && (
            <View
              className="bg-secondary-blue flex rounded-3xl p-4 space-y-5"
              style={{
                marginTop: responsiveHeight(20 / percentToPx),
              }}>
              <View className="flex flex-row items-center gap-3">
                <View style={{flex: 2}}>
                  <GenericTextField
                    keyboardType="default"
                    placeholder="Add a new tag"
                    autoCapitalize="none"
                    value={newTag}
                    onChangeText={text => setNewTag(text)}
                  />
                </View>
                <TouchableOpacity onPress={handleTag}>
                  <Image
                    source={sendIcon as any}
                    className={`h-8 w-8`}
                    resizeMode="contain"
                  />
                </TouchableOpacity>
              </View>

              <View>
                <Text className="font-2 text-black text-md">
                  Select a Color
                </Text>

                {/* Color Picker */}
                <View className="flex flex-row gap-2 mt-2 items-center">
                  {colors.map((color, index) => (
                    <TouchableOpacity
                      key={index}
                      style={{
                        backgroundColor: color,
                        borderColor:
                          selectedColor === color ? 'black' : 'transparent',
                        borderWidth: 2,
                        borderRadius: 20,
                      }}
                      className={`rounded-full h-8 w-8`}
                      onPress={() => handleColorSelect(color)}
                    />
                  ))}
                </View>
              </View>
            </View>
          )}
        </View>
      </StaticContainer>
    </Layout>
  );
};

export default ScannedCard;
