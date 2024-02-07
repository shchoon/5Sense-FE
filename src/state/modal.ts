import { atom, selector } from 'recoil'

export const modalState = atom({
  key: 'modal',
  default: {
    id: '',
    active: false,
    type: ''
  }
})
// // export const idState = atom({
// //   key: 'idState',
// //   default: ''
// // })

// export const instructorRegisterModal = atom({
//   key: 'instructorRegisterModal',
//   default: false
// })

// // Selector: 사용자의 성인 여부 계산
// export const isAdultSelector = selector({
//   key: 'isAdultSelector',
//   get: ({ get }) => {
//     const userAge = get(userProfileState).age;
//     return userAge >= 18;
//   },
// });
