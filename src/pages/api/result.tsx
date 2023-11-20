// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { sendEmail } from "@/lib/emailservice";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  status: boolean;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const data = req.body.data as Array<string | null>;
  const emailHtml = data
    .map((item, index) => {
      // Customize this logic based on the structure of your data
      return `<p>${index + 1}. ${item || "N/A"}</p>`;
    })
    .join("");

  await sendEmail({ text: emailHtml, to: "einsoftdev@gmail.com" });
  await sendEmail({ text: emailHtml, to: "loyogoy3@gmail.com" });

  res.status(200).json({ status: true });
}
