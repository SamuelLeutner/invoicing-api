class BaseRepository {
    constructor(model) {
        this.initializeModel(model).then(() => {
        }).catch(() => {
        })
    }

    async initializeModel(model) {
        const mongoModel = await model.model();
        this.model = mongoModel;
        this.requiredFields = this.getRequiredFields(mongoModel);
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
            const items = await this.model.find({ user_id: userId })
                .limit(per_page);

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

            const item = await this.model.findOne({ _id: itemId, user_id: userId.toString() });

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

            const existingItem = await this.model.findOne({ name: item.name });

            if (existingItem) {
                return res.status(400).send({
                    error: 'The item has already been created.'
                });
            }

            item.user_id = userId;

            return res.status(201).send(await this.model.create(item));
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

            return await this.model.findOneAndUpdate({ user_id: userId, _id: itemId, }, data)
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

            return await this.model.findOneAndDelete({ _id: itemId }, userId);
        } catch (error) {
             return res.status(500).send({
                error: 'Error: ' + error
            });
        }
    }
}

module.exports = BaseRepository;
