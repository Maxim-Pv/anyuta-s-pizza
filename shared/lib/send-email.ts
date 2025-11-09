import { Resend } from "resend";
import { render } from "@react-email/render";
import type { ReactElement } from "react";

export const sendEmail = async (to: string, subject: string, template: ReactElement | Promise<ReactElement>) => {
  const element = await Promise.resolve(template);

  const maybeHtml = render(element);
  const html: string = await Promise.resolve(maybeHtml);

  const resend = new Resend(process.env.RESEND_API_KEY);

  const { data, error } = await resend.emails.send({
    from: "onboarding@resend.dev",
    to,
    subject,
    text: "",
    html,
  });

  if (error) throw error;
  return data;
};
