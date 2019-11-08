import AWS from "aws-sdk"
import { PictureItem, CollectionWithMoments, Moment } from "../../global"
import { formatCollectionName } from "./collection"
import { FaceMatch } from "aws-sdk/clients/rekognition"

const rekognition = new AWS.Rekognition({ region: process.env.AWS_REGION })
AWS.config.region = process.env.AWS_REGION

function getUniqueMoments(moments: Moment[], faces: FaceMatch[]) {
  const matchSet = new Set<string>()

  faces.forEach(match => {
    matchSet.add(match.Face.ExternalImageId)
  })

  const matches = moments.filter(moment => matchSet.has(moment._id.toString()))
  const unmatched = moments.filter(moment => !matchSet.has(moment._id.toString()))

  return { matches, unmatched }
}

function mapMoments(moments: Moment[], matched: boolean, price: number) {
  return moments.map(
    moment =>
      <PictureItem>{
        momentId: moment._id,
        label: moment.filename,
        url: moment.resizedLocation,
        price: price || Number.parseInt(process.env.DEFAULT_MOMENT_PRICE, 10),
        addedToBasket: false,
        matched
      }
  )
}

async function deleteCollection(name: string) {
  return new Promise((resolve, reject) => {
    rekognition.deleteCollection({ CollectionId: formatCollectionName(name) }, err => {
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
    rekognition.createCollection(
      { CollectionId: formatCollectionName(collectionName) },
      (err, data) => {
        if (err) {
          return reject(err)
        }

        return resolve(data)
      }
    )
  })
}

async function recogniseFromBuffer(
  collection: CollectionWithMoments,
  image: Buffer
): Promise<PictureItem[]> {
  return new Promise((resolve, reject) => {
    rekognition.searchFacesByImage(
      {
        CollectionId: formatCollectionName(collection.name),
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
          const { matches, unmatched } = getUniqueMoments(collection.moments, sorted)

          const matchesMapped = mapMoments(matches, true, collection.price)
          const unmatchedMapped = mapMoments(unmatched, false, collection.price)

          return resolve(matchesMapped.concat(unmatchedMapped))
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
        CollectionId: formatCollectionName(name),
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
  const hasCollection = collectionIds.find(c => c === formatCollectionName(name))

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
