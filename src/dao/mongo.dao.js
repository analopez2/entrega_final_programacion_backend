import mongoose, { mongo } from 'mongoose';

export default class MongoDao {
  constructor(collection, schema) {
    this.model = mongoose.model(collection, schema);
  }

  async getAll() {
    try {
      const file = await this.model.find({}).lean().exec();
      return file;
    } catch (error) {
      throw error;
    }
  }

  async save(element) {
    try {
      element.timestamp = Date.now();
      const newElement = new this.model({ ...element });
      await newElement.save();
      return newElement;
    } catch (error) {
      throw error;
    }
  }

  async getById(id) {
    try {
      if (!mongoose.isValidObjectId(id)) throw { status: 400, error: 'El id indicado no es válido' };

      const file = await this.model.findById(id).lean().exec();
      return file;
    } catch (error) {
      throw error;
    }
  }

  async updateById(id, newData) {
    try {
      if (!mongoose.isValidObjectId(id)) throw { status: 400, error: 'El id indicado no es válido' };

      newData.timestamp = Date.now();
      let updatedElement = await this.model
        .findOneAndUpdate({ _id: id }, { ...newData }, { new: true })
        .lean()
        .exec();
      return updatedElement;
    } catch (error) {
      throw error;
    }
  }

  async deleteById(id) {
    try {
      if (!mongoose.isValidObjectId(id)) throw { status: 400, error: 'El id indicado no es válido' };

      await this.model.findByIdAndDelete(id);
    } catch (error) {
      throw error;
    }
  }

  async getByEntity(options) {
    try {
      const file = this.model.findOne(options).lean().exec();
      return file;
    } catch (error) {
      throw error;
    }
  }
}
