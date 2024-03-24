import instance from '../axios'

export const postClassData = async (requestData: any) => {
  console.log(requestData)
  return instance.post(`/lessons`, requestData)
}
