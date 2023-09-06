import {View, Text, TouchableOpacity, ActivityIndicator} from 'react-native';
import React from 'react';
import {useAccount} from '../../../hooks/useAccount';
import StaticContainer from '../../../containers/StaticContainer';
import GenericCardContainer from '../../../containers/GenericCardContainer';
import GenericButton from '../../../components/Button/GenericButton/GenericButton';
import {responsiveHeight} from 'react-native-responsive-dimensions';
import {TokenKey, percentToPx} from '../../../constants';
import ImagePicker from '../../../components/ImagePicker/ImagePicker';
import Steps from '../../../components/Steps/Steps';
import {Image, openPicker} from 'react-native-image-crop-picker';
import Toast from '../../../lib/toast';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {OnboardingStackParams} from '../../../navigation/AuthNavigation';
import authService from '../../../services/auth.service';
import {setDataToAsyncStorage} from '../../../lib/storage';
import cardService from '../../../services/card.service';

type ExtraInfoProps = NativeStackScreenProps<
  OnboardingStackParams,
  'ExtraInfoScreen'
>;

const ExtraInformation: React.FC<ExtraInfoProps> = () => {
  const [loading, setLoading] = React.useState<{
    finalize: boolean;
    skip: boolean;
  }>({finalize: false, skip: false});

  const {
    accountPhotos,
    setAccountPhotos,
    step,
    setStep,
    accountDetails,
    personalDetails,
    setAccountDetails,
    setPersonalDetails,
  } = useAccount();

  const handleSkip = async () => {
    setLoading((prevState: {finalize: boolean; skip: boolean}) => {
      return {...prevState, skip: true};
    });
    try {
      const {email, password} = accountDetails;

      const {name, phone, websiteUrl} = personalDetails;

      const registerRes = await authService.register({
        email,
        password,
      });

      const {
        data: registerResData,
        success: registerSuccess,
        message: registerMessage,
      } = registerRes;

      if (!registerSuccess) {
        Toast.error({primaryText: registerMessage});
        return;
      }

      if (!registerResData) {
        Toast.error({primaryText: 'Something went wrong. Please try again.'});
        return;
      }

      const {token} = registerResData;

      await setDataToAsyncStorage(TokenKey, token);

      Toast.success({primaryText: 'Account created successfully.'});

      const cDetails = {
        email: email,
        // mobile: contactDetails.mobile,
        websiteUrl: websiteUrl,
        // companyAddress: contactDetails.companyAddress,
      };

      const createCardRes = await cardService.create({
        personalInformation: {
          name,
          phone,
        },
        contactDetails: cDetails,
      });

      const {success: createCardSuccess, message: createCardMessage} =
        createCardRes;

      if (!createCardSuccess) {
        Toast.error({primaryText: createCardMessage});
        return;
      }

      Toast.success({primaryText: 'Business card created successfully.'});

      await Promise.all([
        setStep(0),
        setAccountPhotos({companyLogo: null, profilePicture: null}),
        setAccountDetails({email: '', password: '', confirmPassword: ''}),
        setPersonalDetails({name: '', phone: '', websiteUrl: ''}),
      ]);
    } catch (err: unknown) {
      console.error(err);
      Toast.error({
        primaryText: 'Something went wrong.',
        secondaryText: 'Please close and reopen the app.',
      });
    } finally {
      setLoading((prevState: {finalize: boolean; skip: boolean}) => {
        return {...prevState, skip: false};
      });
    }
  };
  const handleFinalize = async () => {
    if (!accountPhotos.companyLogo || !accountPhotos.profilePicture) {
      Toast.error({
        primaryText: 'Please add a profile picture and company logo.',
      });
      return;
    }

    setLoading((prevState: {finalize: boolean; skip: boolean}) => {
      return {...prevState, finalize: true};
    });

    try {
      const {email, password} = accountDetails;

      const {name, phone, websiteUrl} = personalDetails;

      const {companyLogo, profilePicture} = accountPhotos;

      const registerRes = await authService.register({
        email,
        password,
      });

      const {
        data: registerResData,
        success: registerSuccess,
        message: registerMessage,
      } = registerRes;

      if (!registerSuccess) {
        Toast.error({primaryText: registerMessage});
        return;
      }

      if (!registerResData) {
        Toast.error({primaryText: 'Something went wrong. Please try again.'});
        return;
      }

      const {token} = registerResData;

      await setDataToAsyncStorage(TokenKey, token);

      Toast.success({primaryText: 'Account created successfully.'});

      const cDetails = {
        email: email,
        // mobile: contactDetails.mobile,
        websiteUrl: websiteUrl,
        // companyAddress: contactDetails.companyAddress,
      };

      const createCardRes = await cardService.create({
        companyLogo: companyLogo as Image,
        profileImage: profilePicture as Image,
        personalInformation: {
          name,
          phone,
        },
        contactDetails: cDetails,
      });

      const {success: createCardSuccess, message: createCardMessage} =
        createCardRes;

      if (!createCardSuccess) {
        Toast.error({primaryText: createCardMessage});
        return;
      }

      Toast.success({primaryText: 'Business card created successfully.'});

      await Promise.all([
        setStep(0),
        setAccountPhotos({companyLogo: null, profilePicture: null}),
        setAccountDetails({email: '', password: '', confirmPassword: ''}),
        setPersonalDetails({name: '', phone: '', websiteUrl: ''}),
      ]);
    } catch (err: unknown) {
      console.error(err);
      Toast.error({
        primaryText: 'Something went wrong.',
        secondaryText: 'Please close and reopen the app.',
      });
    } finally {
      setLoading((prevState: {finalize: boolean; skip: boolean}) => {
        return {...prevState, finalize: false};
      });
    }
  };

  const handleAddImage = async (type: 'Profile' | 'Logo') => {
    try {
      const result = await openPicker({
        maxFiles: 1,
        cropping: true,
        mediaType: 'photo',
        waitAnimationEnd: true,
        compressImageQuality: 0.7,
        freeStyleCropEnabled: true,
        enableRotationGesture: true,
        avoidEmptySpaceAroundImage: true,
      });

      if (type === 'Logo') {
        setAccountPhotos({...accountPhotos, companyLogo: result});
      } else {
        setAccountPhotos({...accountPhotos, profilePicture: result});
      }
    } catch (error) {
      if ((error as any)?.code === 'E_PICKER_CANCELLED') return;
      Toast.error({primaryText: 'Error selecting image. Please try again.'});
    }
  };

  const handleRemoveClick = (name: 'Profile' | 'Logo') => {
    if (name === 'Profile') {
      setAccountPhotos({...accountPhotos, profilePicture: null});
    } else {
      setAccountPhotos({...accountPhotos, companyLogo: null});
    }
  };

  const handleBackPress = () => {
    setStep(step - 1);
  };

  return (
    <StaticContainer
      isBack={true}
      isHeader={true}
      title="Extras"
      callback={handleBackPress}>
      <View className="w-full flex-1 items-center">
        <GenericCardContainer>
          <View className="w-full">
            <Text className="text-lg font-3 text-black">
              Step 3: Add pictures to stand out
            </Text>
          </View>
          <View className="w-full flex-row justify-around">
            <ImagePicker
              label="Profile Photo"
              handleButtonPress={handleAddImage}
              pickedImage={accountPhotos.profilePicture as Image}
              handleRemoveClick={handleRemoveClick}
            />
            <ImagePicker
              label="Company Logo"
              pickedImage={accountPhotos.companyLogo as Image}
              handleButtonPress={handleAddImage}
              handleRemoveClick={handleRemoveClick}
            />
          </View>
          <View
            className="w-full"
            style={{marginTop: responsiveHeight(10 / percentToPx)}}>
            <TouchableOpacity
              className="w-full justify-center items-center py-4"
              onPress={handleSkip}>
              {loading.skip ? (
                <ActivityIndicator color="black" />
              ) : (
                <Text className="text-center text-black text-lg font-3">
                  Skip
                </Text>
              )}
            </TouchableOpacity>
            <View
              className="w-full"
              style={{marginTop: responsiveHeight(10 / percentToPx)}}>
              <GenericButton
                handlePress={handleFinalize}
                title="Finalize"
                loading={loading.finalize}
              />
            </View>
          </View>
        </GenericCardContainer>
        <Steps />
      </View>
    </StaticContainer>
  );
};

export default ExtraInformation;
