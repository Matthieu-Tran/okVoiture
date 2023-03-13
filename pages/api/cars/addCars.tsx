// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
import prisma from "../../../prisma/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const session = await getServerSession(req, res, authOptions);
    if (!session)
      return res
        .status(401)
        .json({ message: "Please sign in to create a form" });
    const title: string = req.body.title;
    const name: string = req.body.firstNameRenter;
    const firstName: string = req.body.nameRenter;
    const email: string = req.body.emailRenter;
    const descriptionCar: string = req.body.descriptionCar;
    //Get User
    console.log(req.body);
    const prismaUser = await prisma.user.findUnique({
      where: { email: session?.user?.email },
    });
    //Check title
    if (descriptionCar.length > 300) {
      return res.status(403).json({ message: "Please write a shorter title" });
    }
    if (!descriptionCar.length) {
      return res
        .status(403)
        .json({ message: "Please do not leave this empty" });
    }
    // creating the car
    try {
      const result = await prisma.Advert.create({
        data: {
          nameAdvert: title,
          nameRenter: name,
          firstNameRenter: firstName,
          emailRenter: email,
          descriptionCar: descriptionCar,
          userId: prismaUser.id,
        },
      });
      res.status(200).json(result);
    } catch (err) {
      res.status(403).json({ err: "Error has occured when making the post" });
    }
  }
}
