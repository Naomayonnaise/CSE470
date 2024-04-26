import axios from 'axios';
import {
  getUser,
  login,
  register,
  logout,
  callwaiter,
  answerCaller,
  getPendingCallers,
  getAllUser,
  updateAdmin
} from './userService';

jest.mock('axios');

const localStorageMock = (() => {
    let store = {};
    return {
      getItem: key => store[key],
      setItem: (key, value) => (store[key] = value.toString()),
      removeItem: key => delete store[key],
      clear: () => (store = {})
    };
  })();
  Object.defineProperty(window, 'localStorage', { value: localStorageMock });
  
  describe('User Service Functions', () => {
    afterEach(() => {
      jest.clearAllMocks();
      localStorage.clear();
    });

  it('getUser should return user from localStorage', () => {
    const mockUser = { id: 1, name: 'John Doe', email: 'john@example.com' };
    localStorage.setItem('user', JSON.stringify(mockUser));

    const result = getUser();

    expect(result).toEqual(mockUser);
  });

  it('getUser should return null if no user in localStorage', () => {
    localStorage.removeItem('user');

    const result = getUser();

    expect(result).toBeNull();
  });

  it('login should login user and save to localStorage', async () => {
    const mockUser = { id: 1, name: 'John Doe', email: 'john@example.com' };
    axios.post.mockResolvedValueOnce({ data: mockUser });

    const result = await login('john', 'password');

    expect(result).toEqual(mockUser);
  });

  it('register should register user and save to localStorage', async () => {
    const mockUserData = { name: 'John Doe', email: 'john@example.com', password: 'password' };
    const mockUser = { id: 1, ...mockUserData };
    axios.post.mockResolvedValueOnce({ data: mockUser });

    const result = await register(mockUserData);

    expect(result).toEqual(mockUser);
  });

  it('logout should remove user from localStorage', () => {
    logout();

  });

  it('callwaiter should call waiter', async () => {
    const mockUser = { id: 1, name: 'John Doe', tableNumber: 5 };
    axios.put.mockResolvedValueOnce({ response: 'Waiter called' });

    const result = await callwaiter(mockUser);

    expect(result).toEqual('Waiter called');
  });

  it('answerCaller should answer caller', async () => {
    const mockUser = { id: 1, name: 'John Doe' };
    axios.put.mockResolvedValueOnce({ response: 'Caller answered' });

    const result = await answerCaller(mockUser);

    expect(result).toEqual('Caller answered');
  });

  it('getPendingCallers should get pending callers', async () => {
    const mockCallers = [{ id: 1, name: 'Caller 1' }, { id: 2, name: 'Caller 2' }];
    axios.get.mockResolvedValueOnce({ data: mockCallers });

    const result = await getPendingCallers();

    expect(result).toEqual(mockCallers);
  });

  it('getAllUser should get all users', async () => {
    const mockUsers = [{ id: 1, name: 'User 1' }, { id: 2, name: 'User 2' }];
    axios.get.mockResolvedValueOnce({ data: mockUsers });

    const result = await getAllUser();

    expect(result).toEqual(mockUsers);
  });

  it('updateAdmin should update user admin status', async () => {
    const userId = 1;
    const isAdmin = true;
    const mockResponse = { id: userId, name: 'User 1', isAdmin: isAdmin };
    axios.put.mockResolvedValueOnce({ data: mockResponse });

    const result = await updateAdmin(userId, isAdmin);

    expect(result).toEqual(mockResponse);
  });
});