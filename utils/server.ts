function getServerApiUrl() {
  return process.env.SERVER_API_URL
}

const callFetchAsync = async (
  url: string,
  method: "GET" | "PUT" | "POST" | "DELETE",
  body: object = {},
  headers = {}
) => {
  try {
    const options = {
      headers: new Headers({
        "Content-Type": "application/json",
        ...headers
      }),
      body: ""
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
      message: err
    }
  }
}

const getAsync = (url: string) => {
  return callFetchAsync(url, "GET")
}

const postAsync = (url: string, body: any) => {
  return callFetchAsync(url, "POST", body)
}

const putAsync = (url: string, body: any) => {
  return callFetchAsync(url, "PUT", body)
}

const deleteAsync = (url: string, body: any) => {
  return callFetchAsync(url, "DELETE", body)
}

const uploadPhotoAsync = async <T>(
  apiUrl: string,
  filename: string,
  blob: Blob
): Promise<{ success: boolean; data: T }> => {
  const formData = new FormData()
  formData.append("photo", blob, filename)

  const options = {
    method: "POST",
    body: formData
  }

  const response = await fetch(`${getServerApiUrl()}${apiUrl}`, options)

  if (response.status !== 200) {
    throw new Error(
      `Request failed with status code ${response.status}.  ${await response.text()}`
    )
  }

  const { success, data } = await response.json()
  return { success, data }
}

export { getAsync, postAsync, putAsync, deleteAsync, uploadPhotoAsync, getServerApiUrl }
