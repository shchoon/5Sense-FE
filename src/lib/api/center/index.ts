import instance from '../axios'

export const getCenterInfo = async () => {
  return instance.get('/centers/my')
}
