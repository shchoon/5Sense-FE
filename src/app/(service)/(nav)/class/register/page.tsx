'use client'
import { Button } from 'flowbite-react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useRecoilValue, useSetRecoilState } from 'recoil'

import Category from '@/components/class/classInfo/Category'
import ClassType from '@/components/class/register/classType'
import SearchPerson from '@/components/class/register/searchPerson'
import ContentHeader from '@/components/common/ContentHeader'
import TextInput from '@/components/common/TextInput'
import TextareaForm from '@/components/common/TextareaForm'
import { DurationScheduleType, durationClassScheduleState } from '@/lib/state/classDurationSchedule'

export type classDataType = {
  name: string
  memo: string
  category: {
    id: number | undefined
    name: string | undefined
    subId: number | undefined
    subName: string | undefined
  }
  type: string
  lessonTime: number
  tuitionFee: string
  totalSessions: string
  capacity: number
  schedules: DurationScheduleType[]
  teacherId: string
}

export default function RegisterPage() {
  const router = useRouter()

  const durationSchedule = useRecoilValue(durationClassScheduleState)
  const setDurationSchedule = useSetRecoilState(durationClassScheduleState)

  const Props = useForm<classDataType>({
    defaultValues: {
      name: '',
      memo: '',
      category: {
        id: undefined,
        name: undefined,
        subId: undefined,
        subName: undefined
      },
      type: 'duration',
      lessonTime: 30,
      tuitionFee: '',
      totalSessions: '',
      capacity: 1,
      schedules: durationSchedule,
      teacherId: ''
    },
    mode: 'onSubmit',
    reValidateMode: 'onSubmit'
  })

  const onSubmit: SubmitHandler<classDataType> = (data, e) => console.log('submitdata', data)
  const onError = (errors: any, e: any) => console.log(errors, e)
  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    watch,
    setFocus,
    formState: { errors }
  } = Props

  useEffect(() => {
    return () => {
      setDurationSchedule([])
    }
  }, [])

  return (
    <div className="flex flex-col items-center pb-[60px]">
      <ContentHeader title="클래스 관리" back onClick={() => router.push('/class')} />
      <form className="w-[640px] flex flex-col gap-5" onSubmit={handleSubmit(onSubmit, onError)}>
        <div className={`class-box`}>
          <div className={`gray-900-bold text-xl`}>클래스 정보</div>
          <div className="info-detail flex flex-col gap-2">
            <TextInput
              register={register('name', { required: true })}
              errors={errors}
              value={watch('name')}
              title="클래스 명"
              placeholder="클래스명을 입력해 주세요"
              maxLength={20}
            />
            <TextareaForm
              register={register('memo', {
                required: true,
                onChange: e => {
                  const element = e.target as HTMLTextAreaElement
                  element.style.height = 'auto'
                  element.style.height = `${element.scrollHeight}px`
                }
              })}
              setFocus={setFocus}
              errors={errors}
              value={watch('memo')}
              title="클래스 메모"
              placeholder="클래스관련 메모를 적어주세요"
              maxLength={300}
            />
            <Category {...Props} />
          </div>
        </div>
        <ClassType {...Props} />
        <SearchPerson type="teachers" setValue={setValue} />
        <Button type="submit" color="primary">
          등록하기
        </Button>
      </form>
    </div>
  )
}
