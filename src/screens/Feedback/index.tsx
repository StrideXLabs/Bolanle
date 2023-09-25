import {View, Text} from 'react-native';
import React from 'react';
import Layout from '../../components/Layout';
import StaticContainer from '../../containers/StaticContainer';
import {
  responsiveFontSize,
  responsiveHeight,
} from 'react-native-responsive-dimensions';
import {emailRegex, percentToPx} from '../../constants';
import GenericTextField from '../../components/TextField/GenericTextField/GenericTextField';
import GenericButton from '../../components/Button/GenericButton/GenericButton';
import Toast from '../../lib/toast';
import feedbackService from '../../services/feedback.service';

const Feedback = () => {
  const [email, setEmail] = React.useState('');
  const [feedback, setFeedback] = React.useState('');
  const [loading, setLoading] = React.useState(false);

  const handleFeedbackSubmit = async (email: string, feedback: string) => {
    try {
      setLoading(true);
      if (!email && !feedback) {
        return (
          setLoading(false),
          Toast.error({primaryText: 'Please fill all fields'})
        );
      }

      if (emailRegex.test(email) === false) {
        return (
          setLoading(false),
          Toast.error({primaryText: 'Please enter a valid email address'})
        );
      }

      const response = await feedbackService.createFeedback(email, feedback);

      if (!response.success) {
        setLoading(false);
        return Toast.error({primaryText: response.message});
      }

      Toast.success({primaryText: response.message});
      setEmail('');
      setFeedback('');
      setLoading(false);
    } catch (error) {
      setLoading(false);
      Toast.error({primaryText: 'Error while submitting feedback'});
    }
  };

  return (
    <Layout>
      <StaticContainer isBack isHeader title="Feedback">
        <View
          className="flex justify-start items-center"
          style={{
            paddingVertical: responsiveHeight(17 / percentToPx),
            paddingHorizontal: responsiveHeight(4 / percentToPx),
          }}>
          <View className="bg-secondary-blue rounded-3xl p-4">
            <Text
              className="text-black font-2"
              style={{
                fontSize: responsiveFontSize(1.8),
                marginVertical: responsiveHeight(12 / percentToPx),
              }}>
              Provide your feedback to help us improve
            </Text>

            <View
              style={{
                gap: responsiveHeight(12 / percentToPx),
              }}>
              <GenericTextField
                value={email}
                keyboardType="email-address"
                placeholder="Email Address"
                autoCapitalize="none"
                onChangeText={email => setEmail(email)}
              />
              <GenericTextField
                value={feedback}
                keyboardType="default"
                placeholder="What do you think about the app?"
                textAlignVertical="top"
                autoCapitalize="none"
                onChangeText={text => setFeedback(text)}
                multiline
                numberOfLines={6}
              />

              <View
                style={{
                  marginTop: responsiveHeight(8 / percentToPx),
                }}>
                <GenericButton
                  title="Submit"
                  handlePress={() => handleFeedbackSubmit(email, feedback)}
                  loading={loading}
                />
              </View>
            </View>
          </View>
        </View>
      </StaticContainer>
    </Layout>
  );
};

export default Feedback;
