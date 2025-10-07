import { Resend } from "resend";

const resend = new Resend(process.env.RESENDREMERA_API_KEY);

export async function POST(req: Request) {
  try {
    const { name, surname, email, model, size, amount } = await req.json();

    const subject = "Confirmación de tu pedido de remera 💚";

    const html = `
      <h2>¡Hola ${name} ${surname}!</h2>
      <p>Gracias por tu compra 💚</p>
      <p>Recibimos tu pedido de una <strong>remera modelo ${model}</strong> en talle <strong>${size}</strong>.</p>
      <p>Monto abonado: <strong>$${amount}</strong>.</p>
      <p>La retiras el dia del festival con tu nombre y apellido.</p>
      <p>Gracias por apoyar el Festival del Bosque 🌿</p>
      <hr/>
      <p style="font-size:12px;color:#777;">Si este mail llegó por error, podés ignorarlo.</p>
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
