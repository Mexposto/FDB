import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const { name, surname, email, amount } = await req.json();

    // Podés personalizar el contenido del mail
    const subject =
      amount > 0
        ? "¡Gracias por tu aporte a la gorra virtual!"
        : "Confirmación de asistencia";

    const html = `
      <h2>¡Hola ${name} ${surname}!</h2>
      <p>Gracias por tu apoyo 💛</p>
      <p>${
        amount > 0
          ? `Recibimos tu aporte de <strong>$${amount}</strong>.`
          : "Registramos tu confirmación de asistencia."
      }</p>
      <p>La direccion del Festival es: Iguazú 4590, B1655 Cdad. Jardín El Libertador, Provincia de Buenos Aires</p>
    <p>
  Te dejamos link a la ubicación en Google Maps: 
  <a href="https://maps.app.goo.gl/kHpoaYMYS4ime9ag9" target="_blank" rel="noopener noreferrer">
    Ver ubicación
  </a>
</p>
      <p>Nos vemos el 15 de noviembre a partir de las 20hs!</p>
      
    `;

    const { data, error } = await resend.emails.send({
      from: "Festival del Bosque <no-reply@resend.dev>",
      to: email,
      subject,
      html,
    });

    if (error) return Response.json({ error }, { status: 500 });

    return Response.json({ success: true, data });
  } catch (err) {
    console.error(err);
    return Response.json(
      { error: "Error enviando el correo" },
      { status: 500 }
    );
  }
}
