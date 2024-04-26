import axios from 'axios';
import {
  getAll,
  search,
  getById,
  deleteById,
  update,
  add
} from './foodService';

jest.mock('axios');

describe('API Functions', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('getAll should return data', async () => {
    const mockData = [{ id: 1, name: 'Food 1' }, { id: 2, name: 'Food 2' }];
    axios.get.mockResolvedValueOnce({ data: mockData });

    const result = await getAll();

    expect(result).toEqual(mockData);
    expect(axios.get).toHaveBeenCalledWith('/api/foods');
  });

  it('search should return data', async () => {
    const searchTerm = 'pizza';
    const mockData = [{ id: 1, name: 'Pizza' }];
    axios.get.mockResolvedValueOnce({ data: mockData });

    const result = await search(searchTerm);

    expect(result).toEqual(mockData);
    expect(axios.get).toHaveBeenCalledWith('/api/foods/search/' + searchTerm);
  });

  it('getById should return data', async () => {
    const foodId = 1;
    const mockData = { id: 1, name: 'Food 1' };
    axios.get.mockResolvedValueOnce({ data: mockData });

    return getById(foodId).then(result => {
        expect(result).toEqual(mockData);
        expect(axios.get).toHaveBeenCalledWith('/api/foods/' + foodId);
      });
  });

  it('deleteById should call axios.delete with correct foodId', async () => {
    const foodId = 1;

    await deleteById(foodId);

    expect(axios.delete).toHaveBeenCalledWith('/api/foods/' + foodId);
  });

  it('update should call axios.put with correct food data', async () => {
    const food = { id: 1, name: 'Updated Food' };

    await update(food);

    expect(axios.put).toHaveBeenCalledWith('/api/foods', food);
  });

  it('add should return data', async () => {
    const newFood = { name: 'New Food' };
    const mockData = { id: 3, name: 'New Food' };
    axios.post.mockResolvedValueOnce({ data: mockData });

    const result = await add(newFood);

    expect(result).toEqual(mockData);
    expect(axios.post).toHaveBeenCalledWith('/api/foods', newFood);
  });
});