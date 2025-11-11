export interface IApiOutputModel {
  success: boolean;
  message?: string | undefined;
  data?: any;
  error?: any;

}

export class ApiOutputModel implements IApiOutputModel {
  success!: boolean;
  message?: string | undefined;
  data?: any;
  error?: any;

  constructor(data?: Partial<IApiOutputModel>) {
    this.success = data?.success ?? false;
    this.message = data?.message;
    this.data = data?.data;
    this.error = data?.error;
  }

  static fromJS(data: any): ApiOutputModel {
    // Ensure data is an object and extract relevant properties
    const parsedData = typeof data === 'object' && Object.prototype.hasOwnProperty.call(data, 'data') && typeof data['data'] === 'object'
      ? data['data']
      : data;

    return new ApiOutputModel({
      success: parsedData?.success ?? false,
      message: parsedData?.message,
      data: parsedData?.data,
      error: parsedData?.error
    });
  }
}
