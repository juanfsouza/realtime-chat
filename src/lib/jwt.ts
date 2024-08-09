import jwt from 'jsonwebtoken';

const secret = process.env.JWT_SECRET;

console.log('JWT_SECRET:', process.env.JWT_SECRET);

if (!secret) {
  throw new Error('JWT_SECRET não está definido no arquivo .env');
}

export const generateToken = (userId: string) => {
  return jwt.sign({ userId }, secret, { expiresIn: '1h' });
};

export const verifyToken = (token: string) => {
  try {
    return jwt.verify(token, secret);
  } catch (err) {
    throw new Error('Token inválido');
  }
};
