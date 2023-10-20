import axios from 'axios';
import { ApiError } from './apiError';
import { sentryHandler } from './sentryHandler';

export const checkAxiosError = (e: unknown) => {
  if (axios.isAxiosError(e)) {
    const apiError = ApiError.abstractAxiosError(e);
    sentryHandler.api(apiError);
  } else {
    const error = e as Error;
    sentryHandler.global(error);
  }
};
