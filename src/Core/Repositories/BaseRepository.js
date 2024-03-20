class BaseRepository {
  constructor(model) {
    if (!model || typeof model.model !== 'function') {
      throw new Error('Invalid model provided');
    }
    this.modelPromise = this.initializeModel(model);
  }

  async initializeModel(model) {
    const mongoModel = await model.model();
    this.model = mongoModel;
    this.requiredFields = this.getRequiredFields(mongoModel);
  }

  async getModel() {
    if (!this.model) {
      await this.modelPromise;
    }

    return this.model;
  }

  getRequiredFields(model) {
    return Object.entries(model.schema.paths)
      .filter(([fieldName, path]) => path.isRequired)
      .map(([fieldName, path]) => fieldName);
  }

  validateItem(item) {
    for (let field of this.requiredFields) {
      if (!item[field]) {
        return {
          isValid: false, message: `The ${field} field is required.`
        };
      }
    }
    return {
      isValid: true, message: ''
    };
  }

  async index(res, per_page, userId) {
    try {
      const model = await this.getModel();
      const items = await model.find({ user_id: userId }).limit(per_page);

      return res.status(200).send({ items });
    } catch (error) {
      return res.status(500).send({
        error: 'Error: ' + error
      });
    }
  }

  async show(res, itemId, userId) {
    try {
      if (!itemId) {
        return res.status(404).send({
          error: 'Item id is required.'
        });
      }

      const model = await this.getModel();
      const item = await model.findOne({ _id: itemId, user_id: userId.toHexString() });
      if (!item) {
        return res.status(404).send({
          error: 'Item not found.'
        });
      }
      return res.status(200).send({ item });
    } catch (error) {
      return res.status(500).send({
        error: 'Error: ' + error
      });
    }
  }

  async store(res, userId, item) {
    try {
      const validation = this.validateItem(item);
      if (!validation.isValid) {
        return res.status(422).send({
          error: validation.message
        });
      }
      const model = await this.getModel();

      const itemName = item.name;
      if (itemName !== undefined && itemName !== null) {
        const existingItem = await model.findOne({ name: itemName });

        if (existingItem) {
          return res.status(400).send({
            error: 'The item has already been created.'
          });
        }
      }

      item.user_id = userId;
      return res.status(201).send(await model.create(item));
    } catch (error) {
      return res.status(500).send({
        error: 'Error: ' + error
      });
    }
  }

  async update(res, itemId, userId, data) {
    try {
      if (!itemId) {
        return res.status(404).send({
          error: 'Item id is required.'
        });
      }

      const validation = this.validateItem(data);
      if (!validation.isValid) {
        return res.status(422).send({
          error: validation.message
        });
      }

      const model = await this.getModel();
      const updated = await model.findOneAndUpdate(
        { user_id: userId.toHexString(), _id: itemId },
        data,
        { new: true, useFindAndModify: false }
      );

      if (!updated) {
        return res.status(404).send({
          error: 'Not found'
        });
      }

      return res.status(204).send();
    } catch (error) {
      return res.status(500).send({
        error: 'Error: ' + error
      });
    }
  }

  async delete(res, itemId, userId) {
    try {
      if (!itemId) {
        return res.status(404).send({
          error: 'Item id is required.'
        });
      }
      const model = await this.getModel();
      const deleted = await model.findOneAndDelete({ _id: itemId }, userId);

      if (!deleted) {
        return res.status(404).send({
          error: 'Not found'
        });
      }

      return res.status(204).send();
    } catch (error) {
      return res.status(500).send({
        error: 'Error: ' + error
      });
    }
  }
}

module.exports = BaseRepository;
