const baseUrl: string = 'https://api-m.sandbox.paypal.com';
import base64 from 'base-64';

const clientId: string = '';
const secretKey: string = '';

const generateToken = async (): Promise<string> => {
  const headers = new Headers();
  headers.append('Content-Type', 'application/x-www-form-urlencoded');
  headers.append('Authorization', 'Basic ' + base64.encode(`${clientId}:${secretKey}`));

  const requestOptions: RequestInit = {
    method: 'POST',
    headers: headers,
    body: 'grant_type=client_credentials',
  };

  try {
    const response = await fetch(baseUrl + '/v1/oauth2/token', requestOptions);
    const result = await response.json();
    console.log('result print', result);
    return result.access_token;
  } catch (error) {
    console.error('error raised', error);
    throw error;
  }
};

const createOrder = async (token: string = '', value: string): Promise<any> => {
  const orderDetail = {
    intent: 'CAPTURE',
    purchase_units: [
      {
        amount: {
          currency_code: 'USD',
          value: value,
          breakdown: {
            item_total: {
              currency_code: 'USD',
              value: value,
            },
          },
        },
      },
    ],
    application_context: {
      return_url: 'https://example.com/return',
      cancel_url: 'https://example.com/cancel',
    },
  };
  
  const requestOptions: RequestInit = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(orderDetail),
  };

  try {
    const response = await fetch(baseUrl + '/v2/checkout/orders', requestOptions);
    const result = await response.json();
    console.log('result print', result);
    return result;
  } catch (error) {
    console.error('error raised', error);
    throw error;
  }
};

const capturePayment = async (id: string, token: string = ''): Promise<any> => {
  const requestOptions: RequestInit = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const response = await fetch(`${baseUrl}/v2/checkout/orders/${id}/capture`, requestOptions);
    const result = await response.json();
    console.log('result print', result);
    return result;
  } catch (error) {
    console.error('error raised', error);
    throw error;
  }
};

export default {
  generateToken,
  createOrder,
  capturePayment,
};
