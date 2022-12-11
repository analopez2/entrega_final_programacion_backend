import mongoose from 'mongoose';

export default class MongoDao {
  constructor(collection, schema) {
    this.model = mongoose.model(collection, schema);
  }

  async getAll() {
    try {
      const file = await this.model.find({});
      return file;
    } catch (error) {
      return error;
    }
  }

  async save(element) {
    try {
      element.timestamp = Date.now();
      const newElement = new this.model({ ...element });
      await newElement.save();
      return newElement;
    } catch (error) {
      return error;
    }
  }

  async getById(id) {
    try {
      const file = await this.model.findById(id);
      return file;
    } catch (error) {
      return error;
    }
  }

  async updateById(id, newData) {
    try {
      newData.timestamp = Date.now();
      let updatedElement = await this.model.findOneAndUpdate({ _id: id }, { ...newData }, { new: true });
      return updatedElement;
    } catch (error) {
      return error;
    }
  }

  async deleteById(id) {
    try {
      await this.model.findByIdAndDelete(id);
    } catch (error) {
      return error;
    }
  }
}
