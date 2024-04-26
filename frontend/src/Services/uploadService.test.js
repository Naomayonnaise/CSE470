import axios from 'axios';
import { uploadImage, getImage } from './uploadService';

// Mock axios to simulate API calls
jest.mock('axios');

describe('Image Upload Function', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should upload image successfully', async () => {
    const mockEvent = {
      target: {
        files: [
          {
            name: 'test.jpg',
            type: 'image/jpeg',
          }
        ]
      }
    };
    const mockImageData = { image: 'uploaded-image-url.jpg' };
    axios.post.mockResolvedValueOnce({ data: mockImageData });

    const result = await uploadImage(mockEvent);

    expect(result).toEqual('uploaded-image-url.jpg');
    expect(axios.post).toHaveBeenCalledWith('/api/upload', expect.any(FormData));
  });

  it('should return null if no image is provided', async () => {
    const mockEvent = {
      target: {
        files: []
      }
    };

    const result = await uploadImage(mockEvent);

    expect(result).toBeNull();
    expect(axios.post).not.toHaveBeenCalled();
  });

  it('should return null if non-image file is provided', async () => {
    const mockEvent = {
      target: {
        files: [
          {
            name: 'test.txt',
            type: 'text/plain',
          }
        ]
      }
    };

    const result = await uploadImage(mockEvent);

    expect(result).toBeNull();
    expect(axios.post).not.toHaveBeenCalled();
  });

  it('should return null if no files are provided in getImage', async () => {
    const mockEvent = {
      target: {
        files: []
      }
    };

    const result = await getImage(mockEvent);

    expect(result).toBeNull();
  });

  it('should return null if non-image file is provided in getImage', async () => {
    const mockEvent = {
      target: {
        files: [
          {
            name: 'test.txt',
            type: 'text/plain',
          }
        ]
      }
    };

    const result = await getImage(mockEvent);

    expect(result).toBeNull();
  });

  it('should return null if image retrieval failed', async () => {
    const mockEvent = {
      target: {
        files: [
          {
            name: 'test.jpg',
            type: 'text/jpeg',
          }
        ]
      }
    };

    const result = await getImage(mockEvent);

    expect(result).toBeNull();
  });

});