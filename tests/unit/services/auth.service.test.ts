import AuthService from "../../services/auth.service";

describe('AuthService', () => {
  let authService: AuthService;
  let mockUserRepository: any;
  let mockSqs: any;
  let mockTokenService: any;

  beforeEach(() => {
    mockUserRepository = {
      finduserByPhone: jest.fn(),
      findOrCreateSocialUser: jest.fn(),
      create: jest.fn(),
    };

    mockSqs = { add: jest.fn() };
    mockTokenService = {
      generateAccessToken: jest.fn(),
      generateRefreshToken: jest.fn(),
    };

    authService = new AuthService(mockUserRepository, mockSqs, mockTokenService);
  });

  it('should call finduserByPhone and return null if user is not found', async () => {
    mockUserRepository.finduserByPhone.mockResolvedValueOnce(null);
    
    await authService.signin(1234567890, 'IN');
    
    expect(mockUserRepository.finduserByPhone).toHaveBeenCalledWith(1234567890);
    expect(mockSqs.add).toHaveBeenCalledWith({ message: "SendPhoneOtp", phoneNo: 1234567890 });
  });

  it('should call finduserByPhone and return a user if found', async () => {
    const mockUser = { id: 1, phoneNo: 1234567890 };
    mockUserRepository.finduserByPhone.mockResolvedValueOnce(mockUser);
    
    await authService.signin(1234567890, 'IN');
    
    expect(mockUserRepository.finduserByPhone).toHaveBeenCalledWith(1234567890);
    expect(mockSqs.add).toHaveBeenCalledWith({ message: "SendPhoneOtp", phoneNo: 1234567890 });
  });
});
