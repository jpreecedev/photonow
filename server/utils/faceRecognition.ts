import AWS from "aws-sdk"
import { Types } from "mongoose"
import { getMoment, getMoments } from "../database/moments"

const rekognition = new AWS.Rekognition({ region: process.env.AWS_REGION })
AWS.config.region = process.env.AWS_REGION

const collectionName = process.env.FACE_RECOGNITION_COLLECTION_NAME || ""

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

async function recogniseFromBuffer(image: Buffer) {
  return new Promise((resolve, reject) => {
    rekognition.searchFacesByImage(
      {
        CollectionId: collectionName,
        FaceMatchThreshold: 95,
        Image: { Bytes: image },
        MaxFaces: 5
      },
      async (err, data) => {
        if (err) {
          return reject(err)
        }

        if (data.FaceMatches && data.FaceMatches.length > 0 && data.FaceMatches[0].Face) {
          const sorted = data.FaceMatches.sort(
            (a, b) => b.Face.Confidence - a.Face.Confidence
          )

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
            moments.map(moment => ({
              momentId: moment._id,
              label: moment.filename,
              url: moment.resizedLocation,
              price: moment.amount
            }))
          )
        }
        return reject("Not recognized")
      }
    )
  })
}

async function recognise(bucket: string, filename: string) {
  return new Promise((resolve, reject) => {
    rekognition.searchFacesByImage(
      {
        CollectionId: collectionName,
        FaceMatchThreshold: 95,
        Image: {
          S3Object: {
            Bucket: bucket,
            Name: filename
          }
        },
        MaxFaces: 1
      },
      (err, data) => {
        if (err) {
          return reject(err)
        }
        if (data.FaceMatches && data.FaceMatches.length > 0 && data.FaceMatches[0].Face) {
          return resolve(data.FaceMatches[0].Face)
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

      resolve(response.FaceDetails.length === 1)
    })
  })
}

async function addImageToCollection(
  bucket: string,
  momentId: string,
  s3Filename: string
) {
  return new Promise((resolve, reject) => {
    const collectionName = process.env.FACE_RECOGNITION_COLLECTION_NAME || ""

    rekognition.indexFaces(
      {
        CollectionId: collectionName,
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

;(async () => {
  const collectionName = process.env.FACE_RECOGNITION_COLLECTION_NAME
  const collections = await listCollections()
  const hasCollections =
    collections && collections.CollectionIds && collections.CollectionIds.length
  const collectionIds = hasCollections ? collections.CollectionIds : []
  const hasCollection = collectionIds.find(c => c === collectionName)

  // rekognition.deleteCollection(
  //   { CollectionId: process.env.FACE_RECOGNITION_COLLECTION_NAME },
  //   () => {}
  // )

  if (!hasCollection) {
    await createCollection(collectionName)
  }
})()

export default { addImageToCollection, recognise, recogniseFromBuffer, verifyFace }
