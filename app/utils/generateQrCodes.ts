import { Guest } from '@/public/guestList';
import fs from 'fs';
import path from 'path';
import QRCode from 'qrcode';

export async function generateQrCodes(guests: Guest[]) {
  const outputDir = path.join(process.cwd(), 'public/qrcodes');

  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  for (const guest of guests) {
    const qrData = `https://carlaeluis.pt/guest/${guest.id}`;
    const svgString = await QRCode.toString(qrData, { type: 'svg' });

    guest.qrCodeString = svgString;

    const filePath = path.join(
      outputDir,
      `${guest.name.replace(/\s+/g, '_')}.svg`
    );
    fs.writeFileSync(filePath, svgString);
  }

  return guests;
}
