import instance from '@/hooks/useAxios'

export default async function SearchFeat(
  type: string,
  searchBy: string,
  inputValue: string
) {
  console.log(type, inputValue)
  const res = await instance(
    `/${type}?searchBy=${searchBy}&${searchBy}=${inputValue}`
  )
  const data = await res.data.data
  return data
}
