import React, {useEffect, useRef, useState} from 'react';
import {
  Animated,
  Image,
  ImageSourcePropType,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {percentToPx} from '../../constants';
import closeIcon from '../../assets/images/close.png';
import textStyles from '../../constants/fonts';
import {TouchableOpacity} from '@gorhom/bottom-sheet';
import Button from '../../components/Button';

type DeleteCardModalProps = {
  visible: boolean;
  deleting: boolean;
  onClose: () => void;
  onDelete: () => void;
};

const ModalPopup = ({
  onClose,
  visible,
  children,
}: {
  visible: boolean;
  onClose: () => void;
  children: React.ReactNode;
}) => {
  const timeIdRef = useRef<number | null>(null);
  const scaleValue = useRef(new Animated.Value(0)).current;

  const toggleModal = () => {
    if (visible) {
      Animated.spring(scaleValue, {
        toValue: 1,
        useNativeDriver: true,
      }).start();
      return;
    }

    timeIdRef.current = setTimeout(onClose, 200);
    Animated.timing(scaleValue, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  useEffect(() => {
    toggleModal();

    return () => {
      timeIdRef.current && clearTimeout(timeIdRef.current!);
    };
  }, [visible]);

  return (
    <Modal transparent visible={visible}>
      <Pressable
        style={styles.modalBackGround}
        onPress={e => {
          e.stopPropagation();
          onClose();
        }}>
        <Animated.View
          style={[styles.modalContainer, {transform: [{scale: scaleValue}]}]}>
          {children}
        </Animated.View>
      </Pressable>
    </Modal>
  );
};

const DeleteCardModal = ({
  visible,
  onClose,
  deleting,
  onDelete,
}: DeleteCardModalProps) => {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <ModalPopup visible={visible} onClose={onClose}>
        <View className="flex flex-row justify-between items-center">
          <Text
            className="text-dark-blue"
            style={[
              textStyles.robotoRegular,
              {fontSize: responsiveFontSize(20 / percentToPx)},
            ]}>
            Delete Card
          </Text>
          <TouchableOpacity>
            <Image
              source={closeIcon as ImageSourcePropType}
              className="h-[12px] w-[12px]"
            />
          </TouchableOpacity>
        </View>
        <View
          className="h-[1px] w-full my-2"
          style={{backgroundColor: '#D9D9D9'}}
        />
        <Text
          className="text-dark-blue"
          style={[
            textStyles.robotoRegular,
            {fontSize: responsiveFontSize(16 / percentToPx)},
          ]}>
          Do you really wish to continue?
        </Text>
        <View className="flex flex-row items-center justify-center mt-3">
          <Button
            text="Delete"
            callback={onDelete}
            showLoading={deleting}
            className="py-3 text-sm"
            style={{
              width: responsiveWidth(30),
              marginRight: responsiveHeight(1.3),
            }}
          />
          <Pressable onPress={onClose}>
            <View
              className="border-[1px] border-accent rounded-lg"
              style={{
                width: responsiveWidth(30),
                paddingVertical: responsiveHeight(8.5 / percentToPx),
              }}>
              <Text
                className="text-accent text-center"
                style={
                  (textStyles.robotoMedium,
                  {fontSize: responsiveFontSize(16 / percentToPx)})
                }>
                Cancel
              </Text>
            </View>
          </Pressable>
        </View>
      </ModalPopup>
    </View>
  );
};

const styles = StyleSheet.create({
  modalBackGround: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(41, 44, 51, 0.4)',
  },
  modalContainer: {
    zIndex: 100,
    elevation: 20,
    backgroundColor: 'white',
    width: responsiveWidth(70),
    borderRadius: responsiveHeight(1),
    paddingVertical: responsiveHeight(13 / percentToPx),
    paddingHorizontal: responsiveHeight(15 / percentToPx),
  },
  header: {
    height: 40,
    width: '100%',
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
});

export default DeleteCardModal;
