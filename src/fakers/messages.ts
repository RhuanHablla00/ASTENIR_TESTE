import dayjs from "dayjs";
import users, { type User } from "./users";
import random from "lodash/random";
import shuffle from "lodash/shuffle";

export interface Message {
  id: string;
  sender: User;
  content: string;
  date: string;
  time: string;
}

const fakers = {
  fakeMessages() {
    const messages: Array<Message> = [
      {
        id: "1",
        sender: users.fakeUsers()[0],
        content: "Hello there!",
        date: dayjs
          .unix(random(1586584776897, 1672333200000) / 1000)
          .format("DD MMMM YYYY"),
        time: "09:00 AM",
      },
      {
        id: "2",
        sender: users.fakeUsers()[0],
        content: "Hi, how are you?",
        date: dayjs
          .unix(random(1586584776897, 1672333200000) / 1000)
          .format("DD MMMM YYYY"),
        time: "02:30 PM",
      },
      {
        id: "3",
        sender: users.fakeUsers()[0],
        content: "Good morning!",
        date: dayjs
          .unix(random(1586584776897, 1672333200000) / 1000)
          .format("DD MMMM YYYY"),
        time: "10:00 AM",
      },
      {
        id: "4",
        sender: users.fakeUsers()[0],
        content: "What's up?",
        date: dayjs
          .unix(random(1586584776897, 1672333200000) / 1000)
          .format("DD MMMM YYYY"),
        time: "11:15 AM",
      },
      {
        id: "5",
        sender: users.fakeUsers()[0],
        content: "I'm doing well, thanks!",
        date: dayjs
          .unix(random(1586584776897, 1672333200000) / 1000)
          .format("DD MMMM YYYY"),
        time: "09:00 AM",
      },
      {
        id: "6",
        sender: users.fakeUsers()[0],
        content: "Any plans for the weekend?",
        date: dayjs
          .unix(random(1586584776897, 1672333200000) / 1000)
          .format("DD MMMM YYYY"),
        time: "03:00 PM",
      },
      {
        id: "7",
        sender: users.fakeUsers()[0],
        content: "Not yet, but I'm thinking of going hiking.",
        date: dayjs
          .unix(random(1586584776897, 1672333200000) / 1000)
          .format("DD MMMM YYYY"),
        time: "07:30 PM",
      },
      {
        id: "8",
        sender: users.fakeUsers()[0],
        content: "That sounds fun!",
        date: dayjs
          .unix(random(1586584776897, 1672333200000) / 1000)
          .format("DD MMMM YYYY"),
        time: "10:30 AM",
      },
      {
        id: "9",
        sender: users.fakeUsers()[0],
        content: "Hello, everyone!",
        date: dayjs
          .unix(random(1586584776897, 1672333200000) / 1000)
          .format("DD MMMM YYYY"),
        time: "08:00 PM",
      },
      {
        id: "10",
        sender: users.fakeUsers()[0],
        content: "Hi James!",
        date: dayjs
          .unix(random(1586584776897, 1672333200000) / 1000)
          .format("DD MMMM YYYY"),
        time: "03:00 PM",
      },
    ];

    return shuffle(messages);
  },
};

export default fakers;
