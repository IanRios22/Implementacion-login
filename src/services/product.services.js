import { ProductModel } from '../daos/mongodb/models/product.model.js';
export default class ProductServices {
  async getAll(page = 1, limit = 10, sortOrder = 'desc', query = null) {
    try {
      let queryObject = query ? JSON.parse(query) : {};

      let filter = {};
      for (const [key, value] of Object.entries(queryObject)) {
        if (key === 'category') {
          filter.category = value;
        } else if (key === 'disponibility') {
          filter.stock = value ? { $gt: 0 } : { $lt: 1 };
        }
      }

      const options = {
        page: page,
        limit: limit,
        sort: { price: sortOrder },
      };

      return await ProductModel.paginate(filter, options);
    } catch (error) {
      console.log(error);
    }
  }

  async getById(id) {
    try {
      return await ProductModel.findById(id);
    } catch (error) {
      console.log(error);
    }
  };

  async create(obj) {
    try {
      return await ProductModel.create(obj);
    } catch (error) {
      console.log(error);
    }
  };

  async update(id, obj) {
    try {
      return await ProductModel.findByIdAndUpdate(
        { _id: id },
        obj,
        { new: true }
      );
    } catch (error) {
      console.log(error);
    }
  };

  async delete(id) {
    try {
      return await ProductModel.findByIdAndDelete(id);
    } catch (error) {
      console.log(error);
    }
  };
};
