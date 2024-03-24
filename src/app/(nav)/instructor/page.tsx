'use client'
// 모듈
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'

//내장
import NoneResult from '@/components/common/NoneResult'
import RegisterModal from '@/components/instructor/RegisterModal'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'
import { modalState } from '@/lib/state/modal'
import Card from '@/components/instructor/Card'
import { getInstructorData } from '@/lib/api/instructor'
import SearchInput from '@/components/common/SearchInput'
import Modal from '@/components/common/modal'
import ContentHeader from '@/components/common/contentHeader'

interface instructorType {
  id: string
  name: string
  phone: string
}

export default function InstructorPage() {
  const target = useRef<HTMLDivElement>(null)

  const numberCheckList = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']

  const [serchBy, setSerchBy] = useState<string>('none')

  const [instructorList, setInstructorList] = useState<instructorType[]>([])
  const [meta, setMeta] = useState({
    page: 1,
    hasNextPage: true
  })

  const modal = useRecoilValue(modalState) // 상태의 값을 가져옴
  const setModal = useSetRecoilState(modalState)

  const [isRefresh, setIsRefresh] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [scrollCount, setScrollCount] = useState(false)
  const [inputValue, setInputValue] = useState<any>('')
  const options = {
    root: null,
    rootMargin: '0px',
    threshold: 1.0
  }

  // const getInstructorList = async () => {
  //   if (inputValue !== '') {
  //     const searchBy = inputRef.current?.name
  //     const res = await useGetData('teachers', postVar.page + 1, searchBy, inputValue)
  //     setInstructorList((preInstructorData: getDataType[]) => [...preInstructorData, ...res.data])
  //     setPostVar((prePostVar: postVarType) => res.meta)
  //   } else {
  //     const res = await useGetData('teachers', postVar.page + 1)
  //     setInstructorList((preInstructorData: getDataType[]) => [...preInstructorData, ...res.data])
  //     setPostVar((prePostVar: postVarType) => res.meta)
  //   }
  // }

  // 무한스크롤을 불러오는 함수를 만들어봅시다.
  const getInstructorList = async () => {
    setIsLoading(true)
    console.log(meta.page)
    await getInstructorData('teachers', serchBy, meta.page).then(res => {
      setInstructorList([...instructorList, ...res.data.data.teachers])
      setMeta({ page: meta.page + 1, hasNextPage: res.data.data.meta.hasNextPage })
      setIsLoading(false)
    })
  }

  // const handleClickSearch = async () => {
  //   const searchBy = inputRef.current?.name
  //   const res = await useGetData('teachers', 1, searchBy, inputValue)
  //   setInstructorList((preInstructorData: getDataType[]) => [...res.data])
  //   setMeta((prePostVar: postVarType) => res.meta)
  // }

  // const handleClickInputRefresh = async () => {
  //   setInputValue('')
  //   const res = await useGetData('teachers', 1)
  //   setInstructorList(res.data)
  //   setMeta(prePostVar => res.meta)
  // }

  // const checkInputType = () => {
  //   if (inputValue !== '' && numberCheckList.includes(inputValue[0])) {
  //     return false
  //   } else {
  //     return true
  //   }
  // }

  // const allowOnlyNum = (e: React.KeyboardEvent<HTMLInputElement>) => {
  //   let regex = /^[a-zA-Z]+$/
  //   const forbiddenKeys = ['-', 'e', 'ArrowUp', 'ArrowDown']
  //   if (
  //     forbiddenKeys.includes(e.key) ||
  //     e.currentTarget.value.length > 12 ||
  //     (e.currentTarget.value.length === 12 && e.key !== 'Backspace')
  //   ) {
  //     e.preventDefault()
  //   }
  //   if (regex.test(e.key) && e.key !== 'Backspace' && e.key !== 'Enter') {
  //     alert('이름과 전화번호를 동시에 검색할 수 없습니다. 각각 입력해주세요.')
  //   }
  //   if (e.key == 'Enter') {
  //     handleClickSearch()
  //   }
  // }

  // const preventInputDifferentType = (e: React.KeyboardEvent<HTMLInputElement>) => {
  //   if (inputValue !== '' && numberCheckList.includes(e.key)) {
  //     e.preventDefault()
  //     alert('이름과 전화번호를 동시에 검색할 수 없습니다. 각각 입력해주세요.')
  //   }
  //   if (e.key == 'Enter') {
  //     handleClickSearch()
  //   }
  // }

  useEffect(() => {
    // Intersection Observer Callback
    const handleIntersection: IntersectionObserverCallback = entries => {
      const target = entries[0]

      if (target.isIntersecting) {
        // Load more items when the target is intersecting
        console.log('interesting')
        getInstructorList()
      }
    }

    // Create an Intersection Observer with the callback
    const observer = new IntersectionObserver(handleIntersection, {
      threshold: 0.5 // Adjust as needed
    })

    // Observe the container element
    if (target.current) {
      observer.observe(target.current)
    }

    // Clean up the observer on component unmount
    return () => {
      observer.disconnect()
    }
  }, [target.current])

  useEffect(() => {
    console.log('useeffect')
  }, [])

  //검색결과 -> 지우고나서 -> 기본데이터가 없을 때도 보여줘야하는거니까 일단 좀 더 고민을 해보겠습니다.
  //  기본 데이터 구분하고 싶었음 -> 다시 불러와야하는게 별로임 뭔가 요청이 넘 많아

  return (
    <div className="w-full pt-[60px] 2xl:px-12 xl:px-12 lg:px-6 md:px-12 px-6">
      {/* 수강생 관리 + 수강생 등록 버튼 */}
      <ContentHeader title="강사 관리" btnName="강사 등록" onClick={() => setModal(true)} />
      {/* 검색창 */}
      <SearchInput />
      {/* 강사 목록 시작 */}
      {isRefresh && instructorList.length === 0 ? <NoneResult /> : null}
      {/* 검색 결과 없음 */}
      <div className="w-full grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-5">
        {instructorList?.map(instructor => {
          return <Card key={instructor.id} {...instructor} />
        })}
      </div>

      {isLoading ? (
        <div className="w-full h-[70px] pt-[50px] flex justify-center items-center">
          <div
            className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
            role="status"
          >
            <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
              Loading...
            </span>
          </div>
        </div>
      ) : (
        meta.hasNextPage && <div ref={target} />
      )}
      {modal && (
        <Modal small>
          <RegisterModal onClose={() => setModal(false)} />
        </Modal>
      )}
    </div>
  )
}
