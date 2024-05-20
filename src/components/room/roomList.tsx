'use client'
import { useState, useRef, useEffect } from 'react'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'
import { useRouter } from 'next/navigation'

import { modalState } from '@/lib/state/modal'
import DeleteModal from '@/components/modal/DeleteModal'
import Modal from '@/components/common/modal'
import { centerInfoState } from '@/lib/state/centerInfoState'

import ChevronLeftIcon from 'public/assets/icons/chevron/chevron-left.svg'
import ChevronRightIcon from 'public/assets/icons/chevron/chevron-right.svg'
import UserIcon from 'public/assets/icons/user_icon.svg'
import DotsIcon from 'public/assets/icons/dotsVertical.svg'
import ModifyIcon from 'public/assets/icons/modify.svg'
import DeleteIcon from 'public/assets/icons/trash.svg'
import Plus from '@/icons/icon/plus.svg'

interface IProps {
  id: number
  name: string
  capacity: number
  workTime: any
}

export default function RoomList({ roomData }: { roomData: IProps[][] }) {
  const router = useRouter()
  const optionRef = useRef<HTMLButtonElement>(null)

  const modal = useRecoilValue(modalState) // 상태의 값을 가져옴
  const setModal = useSetRecoilState(modalState)

  const [roomOption, setRoomOption] = useState<{
    isClicked: boolean
    id: undefined | number
    roomId: number
  }>({
    isClicked: false,
    id: undefined,
    roomId: 0
  })

  const [roomListNum, setRoomListNum] = useState<number>(0)
  const [room, setRoom] = useState<any>([])

  return (
    <div className="relative mt-[32px] w-full pl-[84px]">
      {roomListNum !== 0 && (
        <span
          className="absolute z-10 w-6 h-6 left-[72px] top-7 bg-white flex items-center justify-center border border-1 border-gray-200 rounded-full cursor-pointer"
          onClick={() => {
            if (roomListNum === 0) {
              return
            } else {
              setRoomListNum(roomListNum - 1)
            }
          }}
        >
          <ChevronLeftIcon width={16} height={16} alt="chevronLeft" />
        </span>
      )}
      {roomListNum !== roomData.length - 1 && (
        <span
          className="absolute z-10 w-6 h-6 -right-3 top-7 bg-white flex items-center justify-center border border-1 border-gray-200 rounded-full cursor-pointer"
          onClick={() => {
            if (roomListNum === room.length - 1) {
              return
            } else {
              setRoomListNum(roomListNum + 1)
            }
          }}
        >
          <ChevronRightIcon width={16} height={16} alt="chevronRight" />
        </span>
      )}

      <div className="w-full grid grid-cols-4 gap-2">
        {roomData.length !== 0 &&
          roomData[roomListNum].map((data: any, i: number) => {
            return (
              <div
                key={i}
                className={`relative w-full flex flex-col gap-1.5 justify-center text-center h-[80px] border rounded-lg ${
                  data.id !== undefined ? 'border-gray-300' : 'border-gray-100 bg-primary-50'
                }  py-2 px-3`}
              >
                {Object.keys(data).length !== 0 ? (
                  <>
                    <div className="w-full gray-900-semibold">{data.name} </div>
                    <div className="flex gap-1/2 h-4 justify-center">
                      <UserIcon width={16} height={16} alt="user" />
                      <span className="gray-500-medium flex items-center">{data.capacity} 인</span>
                    </div>
                    <button
                      ref={optionRef}
                      className={`absolute right-3 top-3 w-8 h-8 p-1 rounded-full hover:bg-gray-100 ${
                        roomOption && 'focus:bg-gray-100'
                      } `}
                      onClick={() => {
                        if (roomOption.roomId === data.id && roomOption.isClicked) {
                          setRoomOption(prev => ({
                            ...prev,
                            isClicked: false,
                            id: undefined,
                            roomId: 0
                          }))
                        }
                        if (roomOption.roomId !== data.id) {
                          setRoomOption(prev => ({
                            ...prev,
                            isClicked: true,
                            roomId: data.id
                          }))
                        }
                      }}
                    >
                      <DotsIcon width={24} height={24} alt="dots" />
                    </button>
                  </>
                ) : (
                  <button
                    className="w-full h-full flex justify-center items-center"
                    onClick={() => router.push('/room/register')}
                  >
                    <Plus className="text-gray-400" />
                  </button>
                )}
                {/* 룸 옵션 모달 */}
                {roomOption.isClicked && roomOption.roomId === data.id && (
                  <div className="absolute right-2 bg-white top-[45px] w-[140px] p-1 flex flex-col gap-1/2 border border-1 border-primary-600 rounded-md shadow-[0_2px_5px_0_rgba(0, 0, 0, 0.12)]">
                    <button
                      type="button"
                      className="w-full flex items-center justify-between px-2 py-1 rounded-[3px] hover:bg-primary-100"
                      onClick={() => {
                        localStorage.setItem('roomName', data.name)
                        localStorage.setItem('roomId', data.id)
                        localStorage.setItem('capacity', data.capacity)
                        router.push('/room/modifyRoom/' + `${data.name}`)
                      }}
                    >
                      <div className="w-[98px] gray-500-medium text-sm">수정하기</div>
                      <ModifyIcon width={16} height={16} alt="modify" />
                    </button>
                    <button
                      type="button"
                      className="w-full flex items-center justify-between px-2 py-1 rounded-[3px] hover:bg-primary-100"
                      onClick={() => {
                        setModal(true)
                      }}
                    >
                      <div className="w-[98px] gray-500-medium text-sm">삭제하기</div>
                      <DeleteIcon className="text-gray-400" width={16} height={16} alt="modify" />
                    </button>
                  </div>
                )}
              </div>
            )
          })}
      </div>
    </div>
  )
}
