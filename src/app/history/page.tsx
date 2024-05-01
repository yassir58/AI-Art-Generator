
import History from './History'

const page = ()=>{


    return (
        <div className='w-[85%] p-6 h-full flex justify-start items-start  flex-col gap-8'>
          <h1 className='text-[16px] text-veryLightGray font-[600]'>Generation History</h1>
           <History/>
        </div>
    )
}

export default page