import { stringToColor } from '@/lib/utils';

type Props = {
  x: number;
  y: number;
  info: {
    name: string;
    email: string;
    avatar: string;
  };
};

function Cursor({ x, y, info }: Props) {
  const color = stringToColor(info.email || '1');
  return (
    <div
      className='h-4 w-4 rounded-full absolute z-50'
      style={{
        top: y,
        left: x,
        pointerEvents: 'none',
      }}
    >
      <svg xmlns='http://www.w3.org/2000/svg'
        stroke={color}
        fill={color}
        strokeWidth='1'
        viewBox='0 0 24 24'
        className={`h-6 w-6`}
      >
        <path fill={color} d='M4.5.79v22.42l6.56-6.57h9.29L4.5.79z'></path>
      </svg>

      <div className='w-72 h-8'
        style={{ color: color }}>
        <img className='h-12 w-12 rounded-full'
          src={info.avatar}
          alt={info?.name || info.email} />
        {info?.name || info.email}
      </div>
    </div>
  );
}
export default Cursor;