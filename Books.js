import client from "./db.js";

class Book {
  findAll() {
    return client.execute("SELECT name, author, price FROM books ORDER BY id LIMIT 10");
  }

  create({ name, author, price }) {
    return client.execute(
      `INSERT INTO books (name, author, price) VALUES (${name}, ${author}, ${price})`
    )
  }
}

const bookModel = new Book();

export const BookAll = async () => {
  return await bookModel.findAll();
}

