export type ErrorableResponse<T, E = Error> =
  | {
      type: 'success';
      data: T;
    }
  | {
      type: 'error';
      error: E;
    };

export type error = {
  code: string;
  message: string;
};
