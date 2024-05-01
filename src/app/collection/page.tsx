
import Card from '../_components/ui/Card'
import Collection from './Collection'

const page = ()=>{


    return (
        <div className='w-[85%] p-6 h-full flex justify-start items-start  flex-col'>
          <h1 className='text-[16px] text-veryLightGray font-[600]'>My Collection</h1>
           <Collection/>
        </div>
    )
}

export default page