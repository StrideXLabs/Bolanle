import {HttpError} from 'http-errors';
import fetcher from '../lib/fetcher';

class FeedbackService {
  async createFeedback(email: string, message: string) {
    try {
      const response = await fetcher(`feedback/create`, {
        body: {email, message},
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
      });

      return {success: true, data: response, message: 'Feedback Submitted!'};
    } catch (error) {
      return {
        data: null,
        success: false,
        message: (error as HttpError).message,
      };
    }
  }
}

export default new FeedbackService();
