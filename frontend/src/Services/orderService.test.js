import axios from 'axios';
import {
  trackOrder,
  trackOrderById,
  approveOrder,
  serveItem,
  getAll,
  createOrder,
} from './orderService';

jest.mock('axios');

describe('Order Service API Functions', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('Track should return data', async () => {
    const mockData = {
        "_id": "662c8f86679028145ea5cf00",
        "name": "Shafin",
        "totalPrice": 1150,
        "items": [
            {
                "food": {
                    "name": "Beef Bhuna",
                    "price": 550,
                    "description": "Tender beef pieces cooked with onions, tomatoes, and spices.",
                    "tags": [
                        "Beef",
                        "Curry"
                    ],
                    "image": "/foods/beef_bhuna.jpg",
                    "_id": "6612d73b4ae662746f69ff4b",
                    "createdAt": "2024-04-07T17:26:19.133Z",
                    "updatedAt": "2024-04-07T17:26:19.133Z",
                    "__v": 0,
                    "id": "6612d73b4ae662746f69ff4b"
                },
                "price": 550,
                "quantity": 1,
                "status": "NEW"
            },
            {
                "food": {
                    "name": "Bengali Fish Curry",
                    "price": 600,
                    "description": "Traditional Bengali fish curry cooked with spices and herbs.",
                    "tags": [
                        "Fish",
                        "Curry"
                    ],
                    "image": "/foods/bengali_fish_curry.jpg",
                    "_id": "6612d73b4ae662746f69ff49",
                    "createdAt": "2024-04-07T17:26:19.131Z",
                    "updatedAt": "2024-04-07T17:26:19.131Z",
                    "__v": 0,
                    "id": "6612d73b4ae662746f69ff49"
                },
                "price": 600,
                "quantity": 1,
                "status": "NEW"
            }
        ],
        "status": "NEW",
        "user": "6612d73b4ae662746f69ff46",
        "createdAt": "2024-04-27T05:39:18.568Z",
        "updatedAt": "2024-04-27T05:39:18.568Z",
        "__v": 0,
        "id": "662c8f86679028145ea5cf00"
    };
    axios.get.mockResolvedValueOnce({ data: mockData });

    const result = await trackOrder();

    expect(result).toEqual(mockData);
    expect(axios.get).toHaveBeenCalledWith('/api/orders/track');
  });

  it('TrackByID should return data', async () => {
    const orderId = "662c8f86679028145ea5cf00";
    const mockData = {
        "_id": "662c8f86679028145ea5cf00",
        "name": "Shafin",
        "totalPrice": 1150,
        "items": [
            {
                "food": {
                    "name": "Beef Bhuna",
                    "price": 550,
                    "description": "Tender beef pieces cooked with onions, tomatoes, and spices.",
                    "tags": [
                        "Beef",
                        "Curry"
                    ],
                    "image": "/foods/beef_bhuna.jpg",
                    "_id": "6612d73b4ae662746f69ff4b",
                    "createdAt": "2024-04-07T17:26:19.133Z",
                    "updatedAt": "2024-04-07T17:26:19.133Z",
                    "__v": 0,
                    "id": "6612d73b4ae662746f69ff4b"
                },
                "price": 550,
                "quantity": 1,
                "status": "NEW"
            },
            {
                "food": {
                    "name": "Bengali Fish Curry",
                    "price": 600,
                    "description": "Traditional Bengali fish curry cooked with spices and herbs.",
                    "tags": [
                        "Fish",
                        "Curry"
                    ],
                    "image": "/foods/bengali_fish_curry.jpg",
                    "_id": "6612d73b4ae662746f69ff49",
                    "createdAt": "2024-04-07T17:26:19.131Z",
                    "updatedAt": "2024-04-07T17:26:19.131Z",
                    "__v": 0,
                    "id": "6612d73b4ae662746f69ff49"
                },
                "price": 600,
                "quantity": 1,
                "status": "NEW"
            }
        ],
        "status": "NEW",
        "user": "6612d73b4ae662746f69ff46",
        "createdAt": "2024-04-27T05:39:18.568Z",
        "updatedAt": "2024-04-27T05:39:18.568Z",
        "__v": 0,
        "id": "662c8f86679028145ea5cf00"
    };
    axios.get.mockResolvedValueOnce({ data: mockData });

    const result = await trackOrderById(orderId);

    expect(result).toEqual(mockData);
    expect(axios.get).toHaveBeenCalledWith('/api/orders/trackbyid/' + orderId);
  });

  it('getAll should return data', async () => {
    const mockData = [{
      "_id": {
        "$oid": "662c8f86679028145ea5cf00"
      },
      "name": "Shafin",
      "totalPrice": 1150,
      "items": [
        {
          "food": {
            "name": "Beef Bhuna",
            "price": 550,
            "description": "Tender beef pieces cooked with onions, tomatoes, and spices.",
            "tags": [
              "Beef",
              "Curry"
            ],
            "image": "/foods/beef_bhuna.jpg",
            "_id": {
              "$oid": "6612d73b4ae662746f69ff4b"
            },
            "createdAt": {
              "$date": "2024-04-07T17:26:19.133Z"
            },
            "updatedAt": {
              "$date": "2024-04-07T17:26:19.133Z"
            },
            "__v": 0
          },
          "price": 550,
          "quantity": 1,
          "status": "NEW"
        },
        {
          "food": {
            "name": "Bengali Fish Curry",
            "price": 600,
            "description": "Traditional Bengali fish curry cooked with spices and herbs.",
            "tags": [
              "Fish",
              "Curry"
            ],
            "image": "/foods/bengali_fish_curry.jpg",
            "_id": {
              "$oid": "6612d73b4ae662746f69ff49"
            },
            "createdAt": {
              "$date": "2024-04-07T17:26:19.131Z"
            },
            "updatedAt": {
              "$date": "2024-04-07T17:26:19.131Z"
            },
            "__v": 0
          },
          "price": 600,
          "quantity": 1,
          "status": "NEW"
        }
      ],
      "status": "NEW",
      "user": {
        "$oid": "6612d73b4ae662746f69ff46"
      },
      "createdAt": {
        "$date": "2024-04-27T05:39:18.568Z"
      },
      "updatedAt": {
        "$date": "2024-04-27T05:39:18.568Z"
      },
      "__v": 0
    }];
    axios.get.mockResolvedValueOnce({ data: mockData });

    const result = await getAll();

    expect(result).toEqual(mockData);
    expect(axios.get).toHaveBeenCalledWith('/api/orders/');
  });

  it('Approve Order should be called with correct data', async () => {
    const orderId = "662c8c26679028145ea346ea";

    await approveOrder(orderId);

    expect(axios.put).toHaveBeenCalledWith('/api/orders/approveorder/' + orderId);
  });

  it('ServeItem should call axios.put with correct orderid and itemid', async () => {
    const orderId = "662c8c26679028145ea346ea";
    const itemFoodId = "6612d73b4ae662746f69ff4b";

    await serveItem(orderId, itemFoodId);

    expect(axios.put).toHaveBeenCalledWith('/api/orders/serveitem/' + orderId + '/' + itemFoodId);
  });

});