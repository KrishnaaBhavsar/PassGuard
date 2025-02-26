"use server"

import { YourPasswords } from '@/components/YourPasswords'
import { clerkClient } from '@clerk/nextjs/server'

interface Card{
    cardNo:string,
    cardName:string,
    expiry:string,
    cvv:number
}

interface Passwords{
  website:string,
  username: string,
  password:string
}

export async function addCardServer(cardNo: string, cardName: string, expiry: string, cvv: number, userId: string) {
  const client = await clerkClient();
  const user = await client.users.getUser(userId);
  let cards: Card[] = [];

  if (Array.isArray(user.privateMetadata.cards)) {
    cards = user.privateMetadata.cards;
  }

  cards.push({ cardNo, cardName, expiry, cvv });

  await client.users.updateUserMetadata(userId, {
    privateMetadata: {
      cards: cards,
    },
  });

  console.log("Updated cards:", cards);
}

export async function addPasswordServer(website: string, username: string, password: string, userId: string) {
  const client = await clerkClient();
  const user = await client.users.getUser(userId);

  let passwords: Passwords[] = [];
  if (Array.isArray(user.privateMetadata.passwords)) {
    passwords = user.privateMetadata.passwords;
  }

  passwords.push({ website, username, password });

  await client.users.updateUserMetadata(userId, {
    privateMetadata: {
      passwords: passwords,
    },
  });

  console.log("Updated passwords:", passwords);
}