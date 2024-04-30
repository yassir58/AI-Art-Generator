
import ui from '~/styles/ui.module.css'
import Card from '../_components/ui/Card'
import HistoryCard from '../_components/ui/HistoryCard'

const page = ()=>{


    return (
        <div className='w-[85%] p-6 h-full flex justify-start items-start  flex-col gap-8'>
          <h1 className='text-[16px] text-veryLightGray font-[600]'>Generation History</h1>
            <div className={`flex flex-col justify-start items-start gap-4 w-full`}>
                <HistoryCard image='/image-1.png' prompt='Breathtaking digital art illustration of a celestial galaxy, bursting with vibrant colors and sparkling stars, reminiscent of an infinite cosmic journey' negative='Negative Prompt' createAt='Created' seed='Seed' inputResolution='Input Resolution' />
            </div>
        </div>
    )
}

export default page