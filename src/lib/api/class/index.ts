import instance from '../axios'

export const postDurationLessons = async (requestData: any) => {
  console.log(requestData)
  return instance.post(`/duration-lessons`, requestData)
}

export const postSesstionLessons = async (requestData: any) => {
  console.log(requestData)
  return instance.post(`/session-lessons`, requestData)
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
  const lessonId = Number(requestData.id)
  return instance.get(`/duration-lessons/${lessonId}/details`)
}

export const getSesstionLessons = async (requestData: any) => {
  const lessonId = Number(requestData.id)
  return instance.get(`/session-lessons/${lessonId}/details`)
}

export const putDurationLessons = async (id: string, requestData: any) => {
  const lessonId = Number(id)
  return instance.put(`/duration-lessons/${lessonId}`, requestData)
}

export const putSesstionLessons = async (id: string, requestData: any) => {
  const lessonId = Number(id)
  console.log('hih', requestData)
  return instance.put(`/session-lessons/${lessonId}`, requestData)
}
