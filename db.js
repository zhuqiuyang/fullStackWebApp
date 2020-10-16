import { Client } from "https://deno.land/x/mysql/mod.ts";

const client = await new Client().connect({
  hostname: "127.0.0.1",
  username: "root",
  db: "deno",
  password: "123",
  poolSize: 3, // connection limit
});

const DATABASE="deno"
const TABLE= {
  BOOK: "books"
}

const run = async () => {
  // 创建一个数据库 (前提是之前没有创建过)
  await client.execute(`CREATE DATABASE IF NOT EXISTS ${DATABASE}`);
  // 选择我们的数据库
  await client.execute(`USE ${DATABASE}`);
  // 如果已经创建过名为 Todo 的数据表，将其删除
  await client.execute(`DROP TABLE IF EXISTS ${TABLE.BOOK}`);
  // 创建 Todo 数据表
  await client.execute(`CREATE TABLE ${TABLE.BOOK} (
        id int(11) NOT NULL AUTO_INCREMENT,
        name varchar(100) NOT NULL,
        author varchar(100) NOT NULL,
        price INTEGER NOT NULL,
        PRIMARY KEY (id)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8;`);
  await client.execute(`INSERT IGNORE INTO ${TABLE.BOOK} VALUES(1, "Harry Potter", "JK Rowling", 50);`)
  await client.execute(`INSERT IGNORE INTO ${TABLE.BOOK} VALUES(2, "Spring", "laoshe", 30);`)
  await client.execute(`INSERT IGNORE INTO ${TABLE.BOOK} VALUES(3, "XiaoWangzi", "X", 60);`)
};

await run();

export default client;
