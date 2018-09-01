import { IError, IErrorResponse } from './apiRequest';

export default function handleError(error: IError | IErrorResponse) {
  console.error(error);
}
