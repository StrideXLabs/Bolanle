import {View, Text, TouchableOpacity, Image} from 'react-native';
import React, {useCallback, useState} from 'react';
import {responsiveHeight} from 'react-native-responsive-dimensions';
import {BASE_URL, percentToPx} from '../../constants';
import {
  AddButtonIcon,
  CloseIcon,
  ShareIcon,
  XIcon,
  saveIcon,
  sendIcon,
} from '../../constants/icons';
import GenericTextField from '../../components/TextField/GenericTextField/GenericTextField';

const ScannedCard = ({cardData, Tag, setTag}) => {
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
      setTag([...Tag, {name: newTag, color: selectedColor}]);
      setNewTag('');
    }
  };

  const handleColorSelect = (color: string) => {
    setSelectedColor(color);
  };

  const handleRemove = (index: number) => () => {
    setTags(prevTags => prevTags.filter((_, i) => i !== index));
    setTagColors(prevColors => prevColors.filter((_, i) => i !== index));
    setTag(prevTags => prevTags.filter((_, i) => i !== index));
  };

  return (
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
            className="rounded-2xl h-48 w-44"
            source={{
              uri:
                BASE_URL +
                `/${cardData.data._id}/${cardData?.data?.contactDetails?.profileImage}` +
                `?time=${Date.now()}`,
              cache: 'reload',
            }}
          />
          <View className="flex-1 justify-center space-y-1">
            <View className="flex flex-col mb-4">
              <Text className="font-4 text-xl text-black">
                {cardData?.data?.personalInfo?.name}
              </Text>
              <Text className="font-2 text-md text-black">
                {cardData?.data?.personalInfo?.companyName}
              </Text>
              <Text className="font-1">
                {cardData?.data?.personalInfo?.designation}
              </Text>
            </View>
            {/* <View className="flex flex-row gap-1">
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
            </View> */}
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
                <View className="flex flex-row justify-between items-center space-x-2">
                  <Text className="text-white font-2">{tag}</Text>
                  <TouchableOpacity
                    className="bg-white rounded-full p-2"
                    onPress={handleRemove(index)}>
                    <Image
                      source={XIcon as any}
                      className={`h-2 w-2`}
                      resizeMode="contain"
                    />
                  </TouchableOpacity>
                </View>
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
            <Text className="font-2 text-black text-md">Select a Color</Text>

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
  );
};

export default ScannedCard;
