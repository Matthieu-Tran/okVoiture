// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
import prisma from "../../../prisma/client";
import { Description } from "@headlessui/react/dist/components/description/description";

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
    const brand: string = req.body.brandcar;
    const model: string = req.body.modelcar;
    const year: string = req.body.yearcar;
    const city: string = req.body.citycar;
    const price: number = req.body.priceperdaycar;

    //Get User
    console.log(req.body);
    const prismaUser = await prisma.user.findUnique({
      where: { email: session?.user?.email },
    });

    if (!title.length) {
      return res
        .status(403)
        .json({ message: "S'il vous plaît, ne laissez pas le titre vide." });
    }
    if (!name.length) {
      return res
        .status(403)
        .json({ message: "S'il vous plaît, mettez votre prénom" });
    }
    if (!firstName.length) {
      return res
        .status(403)
        .json({ message: "S'il vous plaît, mettez votre nom de famille" });
    }
    //Check description length
    if (descriptionCar.length > 300) {
      return res
        .status(403)
        .json({ message: "Écrivez une description plus courte" });
    }
    if (!descriptionCar.length) {
      return res.status(403).json({
        message: "S'il vous plaît, ne laissez pas la description vide.",
      });
    }
    if (!brand.length) {
      return res.status(403).json({
        message: "S'il vous plaît, choisissez une marque de voiture.",
      });
    }
    if (!model.length || model === "« Choisissez »") {
      return res.status(403).json({
        message: "S'il vous plaît, séléctionnez un modèle de voiture.",
      });
    }
    if (!year.length || year === "« Choisissez »") {
      return res.status(403).json({
        message:
          "S'il vous plaît, choisissez une année de fabrication de votre voiture.",
      });
    }
    if (price === 0) {
      return res
        .status(403)
        .json({ message: "Êtes-vous sur de vouloir mettre comme prix 0 F ?" });
    }

    //creating the car
    try {
      const result = await prisma.Advert.create({
        data: {
          nameAdvert: title,
          nameRenter: name,
          firstNameRenter: firstName,
          emailRenter: email,
          brandcar: brand,
          modelcar: model,
          yearcar: year,
          citycar: city,
          priceperdaycar: price,
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
