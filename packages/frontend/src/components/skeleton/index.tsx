import { LoaidngBounce } from 'components/loading'

const Skeleton = ({
  size = 'large',
}: {
  size?: 'large' | 'medium' | 'small'
}) => {
  return (
    <div className="fixed inset-0 w-full h-full flex justify-center items-center">
      <LoaidngBounce size={size} />
    </div>
  )
}
export { Skeleton }
