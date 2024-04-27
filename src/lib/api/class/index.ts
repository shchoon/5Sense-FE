import instance from '../axios'

export const postDurationLessons = async (requestData: any) => {
  console.log(requestData)
  return instance.post(`/duration-lessons`, requestData).then
}

export const postSesstionLessons = async (requestData: any) => {
  console.log(requestData)
  return instance.post(`/session-lessons`, requestData)
}
export const patchClassData = async (requestData: any) => {
  const lessonId = requestData.lessonId
  const lessonType = requestData.type
  return instance.patch(`/lessons/${lessonId}/close?type=${lessonType}`)
}

export const getDurationLessons = async (requestData: any) => {
  const lessonId = Number(requestData.id)
  return instance.get(`/duration-lessons/${lessonId}/details`)
}

export const getSesstionLessons = async (requestData: any) => {
  const lessonId = Number(requestData.id)
  return instance.get(`/session-lessons/${lessonId}/details`)
}

export const putClassData = async (requestParam: any, requestData: any) => {
  const lessonId = String(requestParam)
  return instance.put(`/lessons/${lessonId}`, requestData)
}
