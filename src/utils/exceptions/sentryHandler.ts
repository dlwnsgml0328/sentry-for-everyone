import * as Sentry from '@sentry/nextjs';
import { ApiError } from './apiError';
import { dateToLocalDateString } from '../dateToLocaleDateString';

const api = (error: ApiError) => {
  Sentry.withScope((scope) => {
    scope.setLevel('fatal');

    Sentry.setContext('🔥 API Request Detail 🔥', {
      name: error.name,
      statusCode: error.statusCode,
      responseData: error.responseData,
      url: error.url,
      method: error.method,
      params: error.params,
    });

    Sentry.captureException(error);
  });
};

const global = (error: Error) => {
  const time = new Date();

  Sentry.withScope((scope) => {
    scope.setLevel('info');

    Sentry.setContext('🔥 Global Error Detail 🔥', {
      ...error,
      time: dateToLocalDateString(time),
    });

    Sentry.captureException(error);
  });
};

export const sentryHandler = {
  api,
  global,
};
