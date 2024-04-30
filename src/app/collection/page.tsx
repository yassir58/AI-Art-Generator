
import ui from '~/styles/ui.module.css'
import Card from '../_components/ui/Card'

const page = ()=>{


    return (
        <div className='w-[85%] p-6 h-full flex justify-start items-start  flex-col'>
          <h1 className='text-[16px] text-veryLightGray font-[600]'>My Collection</h1>
            <div className={`${ui.gallery}`}>
            <Card image="/image-1.png" />
            <Card image="/image-2.png" />
            <Card image="/pex.jpg" />
            </div>
        </div>
    )
}

export default page