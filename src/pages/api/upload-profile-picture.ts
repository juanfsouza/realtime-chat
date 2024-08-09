import { IncomingForm } from 'formidable';
import { NextApiRequest, NextApiResponse } from 'next';
import cloudinary from 'cloudinary';
import prisma from '../../lib/prisma'; // Ajuste o caminho conforme necessário

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const config = {
  api: {
    bodyParser: false,
  },
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const form = new IncomingForm();

    form.parse(req, async (err, fields, files) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Erro ao processar o formulário.' });
      }

      // Verifique se 'fields.email' e 'files.file' estão definidos
      const email = Array.isArray(fields.email) ? fields.email[0] : undefined;
      const file = Array.isArray(files.file) ? files.file[0] : undefined;

      if (!email) {
        return res.status(400).json({ error: 'Email não fornecido.' });
      }

      if (!file) {
        return res.status(400).json({ error: 'Nenhum arquivo enviado.' });
      }

      try {
        // Fazendo upload da imagem no Cloudinary
        const uploadResponse = await cloudinary.v2.uploader.upload(file.filepath);
        const imageUrl = uploadResponse.secure_url;

        // Salvando a URL da imagem no banco de dados (relacionando com o usuário)
        await prisma.user.update({
          where: { email },
          data: { profilePicture: imageUrl },
        });

        return res.status(200).json({ imageUrl });
      } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Erro no upload da imagem.' });
      }
    });
  } else {
    return res.status(405).json({ error: 'Método não permitido.' });
  }
};

export default handler;
