import { nanoid } from "nanoid";

class Database {
    constructor(dbName) {
        this.dbName = dbName;
        this.db = { [dbName]: [] };
    }

    insertOne(item) {
        return new Promise((resolve, reject) => {
            try {
                let itemId = nanoid();

                const itemData = {
                    ...item,
                    id: itemId,
                };

                this.db[this.dbName].push(itemData);
                resolve({
                    message: `Item Saved Successfully ${itemId}`,
                    data: itemData,
                });
            } catch (error) {
                reject(error);
            }
        });
    }

    find(query) {
        return new Promise((resolve, reject) => {
            try {
                if (query["id"]) {
                    const item = this.db[this.dbName].find(
                        (item) => item.id === query.id
                    );
                    return resolve(item);
                }
                if (query["name"]) {
                    const item = this.db[this.dbName].find(
                        (item) => item.name === query.name
                    );
                    return resolve(item);
                }

                resolve(this.db[this.dbName]);
            } catch (error) {
                reject(error);
            }
        });
    }

    deleteItem(itemId) {
        return new Promise((resolve, reject) => {
            try {
                this.db[this.dbName] = this.db[this.dbName].filter(
                    (item) => item.id !== itemId
                );
                resolve(`Item Deleted... ${itemId}`);
            } catch (error) {
                reject(error);
            }
        });
    }

    updateOne(dataToUpdate) {
        return new Promise((resolve, reject) => {
            try {
                const { id, name, price, quantity } = dataToUpdate;

                this.db[this.dbName] = this.db[this.dbName].map((item) => {
                    if (item.id === id) {
                        return {
                            ...item,
                            name: name ?? item.name,
                            price: price ?? item.price,
                            quantity: quantity ?? item.quantity,
                        };
                    }
                });
                const updatedData = this.db[this.dbName].find(
                    (item) => item.id === id
                );
                resolve({
                    message: `Updated Successfully... ${id}`,
                    data: updatedData,
                });
            } catch (error) {
                reject(error);
            }
        });
    }
}

const db = new Database("inventory");
export default db;
