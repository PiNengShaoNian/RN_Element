import qs from 'query-string'

const baseUrl = 'http://cangdu.org:8001'

const whitelist = ['/shopping/restaurant/']

const timeoutFetch = (p, timeout = 10000) => {
  let timeoutFn
  const timeoutPromise = new Promise((resolve, reject) => {
    timeoutFn = () => reject('timeout ')
  })

  const abortablePromise = Promise.race([p, timeoutPromise])

  setTimeout(() => {
    timeoutFn()
  }, timeout)

  return abortablePromise
}

const baseRequest = (method, url, params = '', isFormData = false) => {
  let header = !isFormData
    ? {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    : {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data'
      }

  let option =
    params === ''
      ? {
          method: method,
          headers: header
        }
      : {
          method: method,
          headers: header,
          body: isFormData ? params : JSON.stringify(params)
        }

  return new Promise((resolve, reject) => {
    timeoutFetch(
      fetch(baseUrl + url, option)
        .then(res => {
          if (res.ok) {
            return res.json()
          } else {
            reject(res)
          }
        })
        .then(res => {
          if (res.status === 0 && whitelist.every(v => !url.includes(v))) {
            reject(res)
          } else {
            resolve(res)
          }
        })
        .catch(err => {
          reject(err)
        })
    )
  })
}

export default {
  get(url, params = '') {
    if (params !== '') {
      url = url + '?' + qs.stringify(params)
    }

    return baseRequest('GET', url)
  },
  post(url, params, isFormData) {
    return baseRequest('POST', url, params, isFormData)
  },
  delete(url, params = '') {
    return baseRequest('DELETE', url, params)
  }
}
