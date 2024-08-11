import instance from '../axios'

export const postDurationLessons = async (requestData: any) => {
  try {
    const res = await instance.post(`/duration-lessons`, requestData)
    return res.data
  } catch (error: any) {
    return error.response
  }
}

export const postSessionLessons = async (requestData: any) => {
  try {
    const res = await instance.post(`/session-lessons`, requestData)
    return res.data
  } catch (error: any) {
    return error.response
  }
}

export const patchDurationLessons = async (requestData: any) => {
  const lessonId = Number(requestData.id)
  return instance.patch(`/duration-lessons/${lessonId}/close`)
}

export const patchSesstionLessons = async (requestData: any) => {
  const lessonId = Number(requestData.id)
  return instance.patch(`/session-lessons/${lessonId}/close`)
}

export const getDurationLessons = async (requestData: any) => {
  console.log('ruquestData', requestData)
  const lessonId = Number(requestData)
  return instance.get(`/duration-lessons/${lessonId}/details`)
}

export const getSesstionLessons = async (requestData: any) => {
  const lessonId = Number(requestData)
  return instance.get(`/session-lessons/${lessonId}/details`)
}

export const putDurationLessons = async (id: string, requestData: any) => {
  try {
    const res = await instance.put(`/duration-lessons/${id}`, requestData)
    return res.data
  } catch (error: any) {
    return error.response
  }
}

export const putSesstionLessons = async (id: string, requestData: any) => {
  try {
    const res = await instance.put(`/session-lessons/${id}`, requestData)
    return res.data
  } catch (error: any) {
    return error.response
  }
}
