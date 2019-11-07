import { ClientResponse } from "../global"

function getServerApiUrl() {
  return process.env.SERVER_API_URL
}

const uploadPhotoAsync = async <T>(
  apiUrl: string,
  filename: string,
  blob: Blob
): Promise<ClientResponse<T>> => {
  const formData = new FormData()
  formData.append("filepond", blob, filename)

  const options = {
    method: "POST",
    body: formData
  }

  const response = await fetch(`${getServerApiUrl()}${apiUrl}`, {
    credentials: "same-origin",
    ...options
  })

  if (response.status !== 200) {
    return <any>{
      success: false,
      data: `Request failed with status code ${response.status}.  ${await response.text()}`
    }
  }

  return await response.json()
}

const callFetchAsync = async <T>(
  url: string,
  method: "GET" | "PUT" | "POST" | "DELETE",
  body: BodyInit = undefined,
  headers = {}
): Promise<ClientResponse<T>> => {
  try {
    const options = {
      headers: new Headers({
        "Content-Type": "application/json",
        ...headers
      }),
      body
    }

    if (body) {
      options.body = JSON.stringify(body)
    }

    const response = await fetch(`${getServerApiUrl()}${url}`, {
      method,
      credentials: "same-origin",
      ...options
    })

    return await response.json()
  } catch (err) {
    return {
      success: false,
      data: err
    }
  }
}

const getAsync = <T>(url: string): Promise<ClientResponse<T>> => {
  return callFetchAsync<T>(url, "GET")
}

const postAsync = <T>(url: string, body: any): Promise<ClientResponse<T>> => {
  return callFetchAsync<T>(url, "POST", body)
}

const putAsync = <T>(url: string, body: any): Promise<ClientResponse<T>> => {
  return callFetchAsync<T>(url, "PUT", body)
}

const deleteAsync = <T>(url: string, body: any): Promise<ClientResponse<T>> => {
  return callFetchAsync<T>(url, "DELETE", body)
}

export { getAsync, postAsync, putAsync, deleteAsync, uploadPhotoAsync, getServerApiUrl }
