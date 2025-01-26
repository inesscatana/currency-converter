import { getCurrencies } from '../upholdService';
import SDK from '@uphold/uphold-sdk-javascript';

jest.mock('@uphold/uphold-sdk-javascript', () => {
  return {
    __esModule: true,
    default: jest.fn(() => ({
      get: jest.fn(),
    })),
  };
});

describe('getCurrencies', () => {
  let sdkMock: any;

  beforeEach(() => {
    sdkMock = {
      get: jest.fn(),
    };
    (SDK as jest.Mock).mockImplementation(() => sdkMock);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return a list of currencies', async () => {
    const mockResponse = [
      { currency: 'USD', bid: '1.0' },
      { currency: 'EUR', bid: '0.85' },
    ];

    sdkMock.get.mockResolvedValue(mockResponse);

    const currencies = await getCurrencies();
    console.log('Test - Currencies:', currencies);

    expect(currencies).toEqual([
      { code: 'USD', rate: 1.0 },
      { code: 'EUR', rate: 0.85 },
    ]);
  });

  it('should handle an empty array response gracefully', async () => {
    sdkMock.get.mockResolvedValue([]);

    const currencies = await getCurrencies();
    console.log('Test - Empty Currencies:', currencies);

    expect(currencies).toEqual([]);
  });

  it('should throw an error if the request fails', async () => {
    sdkMock.get.mockRejectedValue(new Error('API Error'));

    await expect(getCurrencies()).rejects.toThrow(
      'Failed to fetch currencies. Please try again later.'
    );
  });

  it('should throw an error if API returns an invalid response (not an array)', async () => {
    sdkMock.get.mockResolvedValue({ some: 'invalid data' });

    await expect(getCurrencies()).rejects.toThrow(
      'Invalid response format from API'
    );
  });
});
