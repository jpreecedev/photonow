import { Request, NextFunction, Express } from "express"
import { Profile } from "passport-google-oauth"
import { Document, Types } from "mongoose"
import { Reducer, AnyAction } from "redux"
import { FormStateMap } from "redux-form"
import { ReactStripeElements } from "react-stripe-elements"

declare module "multer-s3-transform"

export interface Moment extends Document {
  photographerId: Types.ObjectId
  collectionId: Types.ObjectId
  filename: string
  mimeType: string
  bucket: string
  contentType: string
  location: string
  originalEtag: string
  resizedLocation: string
  resizedEtag: string
}

export interface User extends Document {
  email?: string
  password?: string
  businessName?: string
  firstName?: string
  lastName?: string
  displayName?: string
  providerId?: string
  provider?: string
  role: string
  stripeData?: StripeExpressConnect
}

export interface DatabaseUser {
  _id: string
  name: string
  role: string
}

export interface Order extends Document {
  moments: Type.ObjectId[]
  customerId?: string
  paymentIntentId: string
  fulfilled: boolean
}

export interface Collection extends Document {
  moments: Types.ObjectId[]
  userId: Types.ObjectId
  coverPhoto?: Types.ObjectId
  name: string
  price: number
}

export interface CollectionWithMoments extends Collection {
  moments: Moment[]
}

export interface StripeCsrfToken extends Document {
  state: string
}

export interface StripeExpressConnect {
  authCode?: string
  accessToken: string
  refreshToken: string
  tokenType: "bearer" | string
  publishableKey: string
  userId: string
  scope: "express" | string
}

export interface CollectionWithCoverPhoto extends Collection {
  coverPhoto?: Moment
}

export interface UserRequest extends Request {
  user: User
}

export interface UpdateRoleRequest extends Request {
  id: string
  role: string
}

export interface FileRequest extends Request {
  file: UploadedFile
  user: User
  collectionName: string
}

export interface OrderRequest extends Request {
  user: User
  file: UploadedFile
  params: OrderParams
}

export interface DeleteFaceRequest extends Request {
  collectionId: string
}

export interface BillingDetails {
  name: string
  email: string
  addressLine1: string
  addressLine2: string
  city: string
  postalCode: string
  state: string
  country: string
}

export interface CreateCollectionRequest extends UserRequest {
  id: string
  name: string
}

export interface UploadedFile {
  originalname: string
  mimetype: string
  transforms: TransformedFile[]
  buffer: Buffer
}

export interface MulterFile {
  mimetype: string
}

export interface TransformedFile {
  id: string
  bucket: string
  contentType: string
  location: string
  etag: string
  key: string
}

export interface LogInRequest extends Request {
  logIn(user: User, callback: (err: any, user: User, info: any) => void): void
}

export interface LogInRequestCallback {
  err: any
  user: User
  info: any
}

export interface RegisterRequest extends Request {}

export interface JWTPayload {
  data: User
  iat: number
  exp: number
}

export interface PictureItem {
  momentId: string
  collectionId: string
  label: string
  url: string
  price: number
  addedToBasket: boolean
  price: number
  matched: boolean
}

export type AppState = ReturnType<
  Reducer<
    {
      pictures: PictureItem[]
      form: FormStateMap
    },
    AnyAction
  >
>

export interface Country {
  label: string
  value: string
}

export interface ClientResponse<T> {
  success: boolean
  data: T
}

export interface GoogleProfile extends Profile {
  id: string
  displayName: string
  name: { familyName: string; givenName: string }
  emails: [{ value: string; verified: boolean }]
  photos: [{ value: string }]
}

export interface NewCollection {
  _id?: string
  name: string
}

export interface Email {
  to: string
  from: string
  cc?: string
  bcc?: string
  subject: string
  message: string
  altText?: string
}

declare module "*.gif" {
  const src: string
  export default src
}

declare module "*.jpg" {
  const src: string
  export default src
}

declare module "*.jpeg" {
  const src: string
  export default src
}

declare module "*.png" {
  const src: string
  export default src
}

declare module "*.svg" {
  import * as React from "react"

  export const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>

  const src: string
  export default src
}
