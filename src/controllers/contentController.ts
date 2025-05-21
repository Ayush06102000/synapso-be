import { Request, Response } from "express";
import { prisma } from "./authController";
import { authMidlleware } from "../middleware/auth";
// interface Content{
//     link?:string;
//     title:string;
//     content?:string;
//     type:string;
// }

export const addContent = async (req: Request, res: Response) => {
  const { link, title, content, type } = req.body;

  try {
    let metadata = "";

    if (link) {
      if (link.match(/youtube\.com|youtu\.be/i)) {
        metadata = "youtube";
      } else if (link.match(/twitter\.com|x\.com/i)) {
        metadata = "twitter";
      } else {
        metadata = "image";
      }
    }

    const contentcreation =await prisma.content.create({
      data: {
        content: content,
        title: title,
        type: type,
        link: link,
        urlType: metadata,
        //@ts-ignore
        userId: req.userId
      },
    }
);
res.send(contentcreation)
  } catch (e) {
    res.send("Something occur in adding content" + e);
  }
};
