const SkeletonList = ({ count = 10 } = {}) => (
  <div className='space-y-3'>
    {Array.from({ length: count })
      .fill(null)
      .map((_, i) => (
        <div key={i} className='h-10 bg-white rounded-md animate-pulse'></div>
      ))}
  </div>
)

export default SkeletonList
