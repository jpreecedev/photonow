import aws from "aws-sdk"
import multer from "multer"
import multerS3 from "multer-s3-transform"
import sharp, { Sharp } from "sharp"
import { Request, Response, NextFunction } from "express"
import { MulterFile } from "../../global"

const BUCKET = process.env.AWS_BUCKET

const s3 = new aws.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION
})

const upload = (
  resize: boolean,
  setMetadata: any,
  setKey: (file: { originalname: string }) => string
) => {
  const multerMetadata = {
    metadata: (
      _req: Request,
      file: { originalname: string },
      cb: (error: any, callback: (file: { originalname: string }) => { filename: string }) => any
    ) => {
      cb(null, setMetadata(file))
    },
    key: (
      _req: Request,
      file: { originalname: string },
      cb: (error: any, callback: string) => void
    ) => {
      cb(null, setKey(file))
    },
    transform: (
      _req: Request,
      _file: { originalname: string },
      cb: (error: any, callback: Sharp) => void
    ) => cb(null, sharp())
  }

  const transforms = [
    {
      id: "original",
      ...multerMetadata
    }
  ]

  if (resize) {
    transforms.push({
      id: "resized",
      ...multerMetadata,
      transform: (_req, _file, cb) => {
        cb(null, sharp().resize(250))
      }
    })
  }

  return multer({
    storage: multerS3({
      s3,
      bucket: BUCKET,
      acl: "public-read",
      shouldTransform: (
        _req: Request,
        file: MulterFile,
        cb: (error: any, match: boolean) => void
      ) => {
        cb(null, /^image/i.test(file.mimetype))
      },
      transforms
    })
  })
}

const uploadFromClient = (
  resize: boolean,
  setMetadata: (file: { originalname: string }) => { filename: string },
  setKey: (file: { originalname: string }) => string
) => (req: Request, res: Response, next: NextFunction) =>
  upload(resize, setMetadata, setKey).single("filepond")(req, res, next)

export default { uploadFromClient }
