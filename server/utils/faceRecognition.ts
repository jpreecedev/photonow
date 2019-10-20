import AWS from "aws-sdk"
import { Types } from "mongoose"
import { getMoments } from "../database/moments"
import { PictureItem } from "../../global"

const rekognition = new AWS.Rekognition({ region: process.env.AWS_REGION })
AWS.config.region = process.env.AWS_REGION

async function deleteCollection(name: string) {
  return new Promise((resolve, reject) => {
    rekognition.deleteCollection({ CollectionId: name }, err => {
      if (err) return reject(err)

      return resolve()
    })
  })
}

async function listCollections(): Promise<AWS.Rekognition.ListCollectionsResponse> {
  return new Promise((resolve, reject) => {
    rekognition.listCollections((err, collections) => {
      if (err) {
        return reject(err)
      }

      return resolve(collections)
    })
  })
}

async function createCollection(collectionName: string) {
  return new Promise((resolve, reject) => {
    rekognition.createCollection({ CollectionId: collectionName }, (err, data) => {
      if (err) {
        return reject(err)
      }

      return resolve(data)
    })
  })
}

async function recogniseFromBuffer(name: string, image: Buffer): Promise<PictureItem[]> {
  return new Promise((resolve, reject) => {
    rekognition.searchFacesByImage(
      {
        CollectionId: name,
        FaceMatchThreshold: 95,
        Image: { Bytes: image },
        MaxFaces: 5
      },
      async (err, data) => {
        if (err) {
          return reject(err)
        }

        if (data.FaceMatches && data.FaceMatches.length > 0 && data.FaceMatches[0].Face) {
          const sorted = data.FaceMatches.sort((a, b) => b.Face.Confidence - a.Face.Confidence)

          const matchSet = new Set()
          sorted.forEach(match => {
            matchSet.add(Types.ObjectId(match.Face.ExternalImageId.toString()))
          })

          const moments = await getMoments(
            Array.from(matchSet).map((c: string) => Types.ObjectId(c))
          )

          moments.forEach(
            moment => (moment.amount = Number.parseInt(process.env.DEFAULT_MOMENT_PRICE))
          )

          return resolve(
            moments.map(
              moment =>
                <PictureItem>{
                  momentId: moment._id,
                  label: moment.filename,
                  url: moment.resizedLocation,
                  price: moment.amount,
                  addedToBasket: false
                }
            )
          )
        }
        return reject("Not recognized")
      }
    )
  })
}

async function verifyFace(image: Buffer) {
  return new Promise((resolve, reject) => {
    rekognition.detectFaces({ Image: { Bytes: image } }, (err, response) => {
      if (err) {
        return reject(err)
      }

      return resolve(response.FaceDetails.length === 1)
    })
  })
}

async function addImageToCollection(
  name: string,
  bucket: string,
  momentId: string,
  s3Filename: string
) {
  return new Promise((resolve, reject) => {
    rekognition.indexFaces(
      {
        CollectionId: name,
        ExternalImageId: momentId,
        Image: {
          S3Object: {
            Bucket: bucket,
            Name: s3Filename
          }
        }
      },
      err => {
        if (err) {
          return reject(err)
        }
        return resolve()
      }
    )
  })
}

async function isCollectionNameAvailable(name: string) {
  const collections = await listCollections()
  const hasCollections =
    collections && collections.CollectionIds && collections.CollectionIds.length
  const collectionIds = hasCollections ? collections.CollectionIds : []
  const hasCollection = collectionIds.find(c => c === name)

  return !hasCollection
}

export default {
  createCollection,
  addImageToCollection,
  recogniseFromBuffer,
  verifyFace,
  listCollections,
  deleteCollection,
  isCollectionNameAvailable
}
