import ui from '../../../styles/ui.module.css'
interface props {
    image:string
}

const Card:React.FC<props> = ({image})=>{
    return (
        <div className='w-[230px] gap-4 h-auto relative z-10' >
            <div className={`${ui.imageItem}`}>
                <img src={image} alt="" />
            </div>
            <div className='flex w-[230px] justify-between items-center absolute'>
                <div className='flex justify-start items-center gap-3 bottom-0 left-0'>
                    <div className='w-[30px] h-[30px] rounded-full bg-mediumGray flex justify-center items-center'>
                    <img src="/profile.svg" alt="" className="w-5"/>
                    </div>
                    <h1 className='text-sm text-veryLightGray font-[500]'>Card Title</h1>
                </div>
                <button className="iconButton">
                    <img src="/bookmark.svg" alt="" />
                </button>
            </div>

        </div>
    )
}

export default Card