import nextConnect from 'next-connect';
import { getSession } from 'next-auth/client';

const handler = nextConnect();

handler.use()