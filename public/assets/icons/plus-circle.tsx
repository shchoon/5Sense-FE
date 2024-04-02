interface IProps {
  width: string
  height: string
  color: string
}

const PlusCircleIcon: React.FC<IProps> = ({ width, height, color }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 20 21" fill="none">
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M10 18.5C12.1217 18.5 14.1566 17.6571 15.6569 16.1569C17.1571 14.6566 18 12.6217 18 10.5C18 8.37827 17.1571 6.34344 15.6569 4.84315C14.1566 3.34285 12.1217 2.5 10 2.5C7.87827 2.5 5.84344 3.34285 4.34315 4.84315C2.84285 6.34344 2 8.37827 2 10.5C2 12.6217 2.84285 14.6566 4.34315 16.1569C5.84344 17.6571 7.87827 18.5 10 18.5ZM11 7.5C11 7.23478 10.8946 6.98043 10.7071 6.79289C10.5196 6.60536 10.2652 6.5 10 6.5C9.73478 6.5 9.48043 6.60536 9.29289 6.79289C9.10536 6.98043 9 7.23478 9 7.5V9.5H7C6.73478 9.5 6.48043 9.60536 6.29289 9.79289C6.10536 9.98043 6 10.2348 6 10.5C6 10.7652 6.10536 11.0196 6.29289 11.2071C6.48043 11.3946 6.73478 11.5 7 11.5H9V13.5C9 13.7652 9.10536 14.0196 9.29289 14.2071C9.48043 14.3946 9.73478 14.5 10 14.5C10.2652 14.5 10.5196 14.3946 10.7071 14.2071C10.8946 14.0196 11 13.7652 11 13.5V11.5H13C13.2652 11.5 13.5196 11.3946 13.7071 11.2071C13.8946 11.0196 14 10.7652 14 10.5C14 10.2348 13.8946 9.98043 13.7071 9.79289C13.5196 9.60536 13.2652 9.5 13 9.5H11V7.5Z"
      fill={color}
    />
  </svg>
)

export default PlusCircleIcon