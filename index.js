import axios from 'axios';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { TITLE, DESCRIPTION, RESPONSIBLE_ID, DEADLINE } = req.body;

  if (!TITLE || !RESPONSIBLE_ID) {
    return res.status(400).json({ error: 'TITLE и RESPONSIBLE_ID обязательны' });
  }

  try {
    const payload = [
      {
        TITLE,
        DESCRIPTION,
        RESPONSIBLE_ID,
        DEADLINE
      },
      {}
    ];

    const response = await axios.post(
      'https://tdroks.bitrix24.ru/rest/1/6nvy08tlwxfiuj9g/task.item.add',
      payload
    );

    res.status(200).json(response.data);
  } catch (error) {
    console.error(error.response?.data || error.message);
    res.status(500).json({ error: 'Ошибка при обращении к Bitrix24' });
  }
}
