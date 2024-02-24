import ReactDOM from 'react-dom'

interface IProps {
  onClose: () => void
  children: React.ReactNode
  small?: boolean
}

export default function Modal({ onClose, children, small }: IProps) {
  return ReactDOM.createPortal(
    <div className="absolute h-screen w-full bg-black bg-opacity-50 inset-y-0 inset-x-0 z-50">
      {small ? (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-4 border-b ">
          {children}
        </div>
      ) : (
        <div className="w-[480px] h-screen">{children}</div>
      )}
    </div>,
    document.body
  )
}

{
  /* position: fixed;
top: 50%;
left: 50%;
transform: translate(-50%, -50%);
padding: 50px;
background-color: #ffffff;
z-index: 5;


const Modal = ({ open, onClose, children }: ModalProps) => {
  if (!open) return null
  return ReactDOM.createPortal(
    <>
      <div className={styles.overlayStyle} />
      <div className={styles.modalStyle}>
        <button onClick={onClose}>모달 닫기</button>
        {children}
      </div>
    </>,
    document.getElementById('global-modal') as HTMLElement
  )
} */
}
