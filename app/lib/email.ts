import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

type SendRsvpEmailArgs = {
  to: string;
  guests?: string[];
  willBeAttending: boolean;
  numberOfGuests?: number;
  adults?: number;
  kids?: number;
  note?: string;
};

export async function sendRsvpConfirmationEmail(args: SendRsvpEmailArgs) {
  const { to, willBeAttending, adults, kids, note } = args;

  const subject = 'Carla e Luís - Confirmação presença';

  const html = `
    <div style="font-family: Arial, sans-serif; line-height: 1.5">
        <h2>Olá!</h2>
        <p>
            Recebemos a tua confirmação para o nosso casamento.
        </p>
        <p>
            Estado: <strong>${willBeAttending ? 'Vou estar presente ✅' : 'Não vou estar presente ❌'}</strong>
        </p>
        ${
          willBeAttending
            ? `
               <p>
                ${adults != null ? `• Adultos: <strong>${adults}</strong>` : ''}
               </p>
               <p>
                ${kids != null ? `• Crianças: <strong>${kids}</strong>` : ''}
               </p>`
            : ''
        }

        ${note ? `<p><em>Nota:</em> ${escapeHtml(note)}</p>` : ''}
        <p>
            Para mais detalhes sobre o casamento, ou até para algumas alterações de última hora, visitar o <a href="https://www.carlaeluis.com" target="_blank" rel="noopener noreferrer">nosso website</a>.
        </p>
        <p style="margin-top: 24px">
            Até breve, <br />
            <strong>Carla & Luís</strong>
        </p>
    </div>
    `;

  return resend.emails.send({
    from: process.env.EMAIL_FROM!,
    to,
    subject,
    html,
  });
}

function escapeHtml(input: string) {
  return input
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}
