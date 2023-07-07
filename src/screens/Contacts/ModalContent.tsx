import React from 'react';
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {
  responsiveFontSize,
  responsiveHeight,
} from 'react-native-responsive-dimensions';
import {accentColor, percentToPx} from '../../constants';
import textStyles from '../../constants/fonts';

export interface IModalContentProps {
  deleting: boolean;
  onCancel: () => void;
  onViewCard: () => void;
  onShareCard: () => void;
  onDeleteContact: () => void;
}

const ModalContent = ({
  deleting,
  onCancel,
  onViewCard,
  onShareCard,
  onDeleteContact,
}: IModalContentProps) => {
  return (
    <View style={styles.modalContent}>
      <View style={styles.center}>
        <View className="w-full">
          <View className="bg-white rounded-md">
            <Pressable
              disabled={deleting}
              onPress={onViewCard}
              className="flex justify-center items-center"
              style={{height: responsiveHeight(5.7)}}>
              <Text
                className="text-center"
                style={[
                  textStyles.robotoMedium,
                  {fontSize: responsiveFontSize(15 / percentToPx)},
                ]}>
                View Card
              </Text>
            </Pressable>
            <View className="h-[1px] bg-off-white-4 w-full" />
            <Pressable
              disabled={deleting}
              onPress={onShareCard}
              className="flex justify-center items-center"
              style={{height: responsiveHeight(5.7)}}>
              <Text
                className="text-center"
                style={[
                  textStyles.robotoMedium,
                  {fontSize: responsiveFontSize(15 / percentToPx)},
                ]}>
                Share Card
              </Text>
            </Pressable>
            <View className="h-[1px] bg-off-white-4 w-full" />
            <Pressable
              disabled={deleting}
              onPress={onDeleteContact}
              className="flex justify-center items-center"
              style={{height: responsiveHeight(5.7)}}>
              {deleting ? (
                <ActivityIndicator color={accentColor} />
              ) : (
                <Text
                  className="text-center"
                  style={[
                    textStyles.robotoMedium,
                    {fontSize: responsiveFontSize(15 / percentToPx)},
                  ]}>
                  Delete Contact
                </Text>
              )}
            </Pressable>
          </View>
          <Pressable
            disabled={deleting}
            onPress={onCancel}
            className="bg-white rounded-md flex justify-center items-center"
            style={{
              height: responsiveHeight(5.7),
              marginTop: responsiveHeight(10 / percentToPx),
            }}>
            <Text
              className="text-center"
              style={[
                textStyles.robotoBold,
                {fontSize: responsiveFontSize(15 / percentToPx)},
              ]}>
              Cancel
            </Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  modalContent: {
    minHeight: 150,
    paddingBottom: 20,
    paddingHorizontal: 1,
  },
  center: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default ModalContent;
