
import ui from '~/styles/ui.module.css'
import Card from '../_components/ui/Card'
import Modal from '../_components/ui/Moda'

const page = ()=>{


    return (
        <div className='w-[85%] p-6 h-full flex justify-start items-start  flex-col'>
            <form className='border-[1px] border-veryDarkGray rounded-lg w-[400px] flex justify-between p-2'>
                <input type="text" className='bg-transparent outline-none border-none text-veryLightGray placeholder:text-[#535967] placeholder:text-sm placeholder:font-[500] flex-1'  placeholder='search images by keyworkds'/>
                <img src="/Search.svg" alt="" />
            </form>
            <div className={`${ui.gallery}`}>
           
           <Modal image='/image-1.png' prompt='Breathtaking digital art illustration of a celestial galaxy, bursting with vibrant colors and sparkling stars, reminiscent of an infinite cosmic journey' negative='Negative Prompt' createAt='Created' seed='Seed' inputResolution='Input Resolution'>
           <Card image="/image-1.png" />
            </Modal>
            <Card image="/image-2.png" />
            <Card image="/pex.jpg" />

            </div>
        </div>
    )
}

export default page