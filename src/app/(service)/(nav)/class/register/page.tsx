'use client'
import { useEffect } from 'react'
import { useRecoilValue, useSetRecoilState } from 'recoil'

import ClassType from '@/components/class/register/classType'
import MemberOfCenter from '@/components/class/register/memberOfCenter'
import { DurationScheduleType, durationClassScheduleState } from '@/lib/state/classDurationSchedule'

import Category from '@/components/class/classInfo/Category'
import ContentHeader from '@/components/common/ContentHeader'
import TextInput from '@/components/common/TextInput'
import TextareaForm from '@/components/common/TextareaForm'
import { Button } from 'flowbite-react'
import { useRouter } from 'next/navigation'
import { SubmitHandler, useForm } from 'react-hook-form'

export type classDataType = {
  name: string
  memo: string
  category: {
    id: number
    name: string
    subId: number
    subName: string
  }
  type: string
  lessonTime: number
  tuitionFee: number
  totalSessions: number
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
        id: 0,
        name: '',
        subId: 0,
        subName: ''
      },
      type: 'duration',
      lessonTime: 30,
      tuitionFee: 0,
      totalSessions: 0,
      capacity: 1,
      schedules: durationSchedule,
      teacherId: ''
    },
    mode: 'onSubmit',
    reValidateMode: 'onSubmit'
  })

  const onSubmit: SubmitHandler<classDataType> = data => console.log(data)
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
      <form className="w-[640px] flex flex-col gap-5" onSubmit={handleSubmit(onSubmit)}>
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
            <Category getValues={getValues} setValue={setValue} />
          </div>
        </div>
        <ClassType {...Props} />
        <MemberOfCenter type="teachers" getValues={getValues} setValue={setValue} />
        <Button type="submit" color="primary">
          등록하기
        </Button>
      </form>
    </div>
  )
}
