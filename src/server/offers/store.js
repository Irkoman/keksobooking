const database = require(`../../database/database`);

const setupCollection = async () => {
  const db = await database;

  const collection = db.collection(`offers`);
  collection.createIndex({date: -1}, {unique: true});
  return collection;
};

class OfferStore {
  constructor(collection) {
    this.collection = collection;
  }

  async getOffer(date) {
    return (await this.collection).findOne({date});
  }

  async getAllOffers() {
    return (await this.collection).find();
  }

  async save(offerData) {
    return (await this.collection).insertOne(offerData);
  }

}

const offersCollection = setupCollection()
    .catch((error) => console.error(`Не удалось создать коллекцию.`, error));

module.exports = new OfferStore(offersCollection);
