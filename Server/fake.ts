import faker from '@faker-js/faker';
import path from 'path';
import { Post } from './database/models/Post';
import { User } from './database/models/User';
import bcrypt from 'bcrypt';
import fetch from 'node-fetch';
import fs from 'fs';
import { nanoid } from 'nanoid';

const imgPath = path.resolve(__dirname, 'images');

const generateFake = async (num: number) => {
  let firstId = 0;

  for (let i = 0; i < num; i++) {
    if (i === 0) {
      firstId = await generateUser();
    } else await generateUser();
  }

  for (let i = firstId; i < firstId + num; i++) {
    await generatePost(i, 8, false);
    await generatePost(i, 0, true);
    await generatePost(i, 1, false);
    await generatePost(i, 0, true);
    await generatePost(i, 1, true);
  }

  console.log('-----Add fake data compleate-----');
};

const downloadFile = async (url: string) => {
  const arr = url.split('/');
  const fileName = arr[arr.length - 1];
  await fetch(url).then((res: any) => {
    if (res.body) res.body.pipe(fs.createWriteStream(`${imgPath}/${fileName}`));
  });
  return fileName;
};

const generateUser = async () => {
  const fileName = await downloadFile(faker.image.avatar());

  const user = await User.create({
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    phone: faker.phone.phoneNumber(),
    email: faker.internet.email(),
    photo: fileName,
    password: bcrypt.hashSync(faker.internet.password(), 7),
  });

  return user.id;
};

const generatePost = async (
  userId: number,
  photoNumber: number,
  text: boolean
) => {
  if (photoNumber === 0 && text === false) {
    return null;
  }

  const arrFile = [];

  for (let i = 0; i < photoNumber; i++) {
    const fileName = await downloadFile(
      `${faker.image.image()}-${nanoid()}.jpg`
    );
    arrFile.push(fileName);
  }

  const post = await Post.create({
    text: text ? faker.lorem.paragraph() : '',
    photo: arrFile.join(' '),
    user_id: userId,
  });

  return post.id;
};

export default generateFake;
