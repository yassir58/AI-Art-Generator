interface props {
    image:string
    prompt:string
    negative:string
    createAt:string
    seed:string
    inputResolution:string
}

const HistoryCard:React.FC<props> = ({image, prompt, negative, createAt, seed, inputResolution})=>{
    return (
        <div className='flex gap-12 w-full justify-start items-start border-b-[1px] border-veryDarkGray  pb-12 pt-6'>
            <img src={image} alt="" className="w-[350px] rounded-md border-[6px] border-veryDarkGray" />
            <div className='flex-1 flex justify-start items-start gap-16'>
                <div className="flex flex-col justify-start items-start gap-8 max-w-[300px]">
                    <div className="flex-col flex justify-start items-start gap-2 ">
                        <h1 className="text-sm text-[#6C727F] font-[500]">Prompt Details</h1>
                        <p className="text-veryLightGray text-lg font-[400]">{prompt}</p>
                    </div>
                    <div className="flex-col flex justify-start items-start gap-2">
                        <h1 className="text-sm text-[#6C727F] font-[500]">Created On</h1>
                        <p className="text-veryLightGray text-lg font-[400]">{createAt}</p>
                    </div>
                    <div className="flex-col flex justify-start items-start gap-2">
                        <h1 className="text-sm text-[#6C727F] font-[500]">Seed</h1>
                        <p className="text-veryLightGray text-lg font-[400]">{seed}</p>
                    </div>
                </div>
                <div className="flex flex-col justify-start items-start gap-8 max-w-[300px]">
                    <div className="flex-col flex justify-start items-start gap-2">
                        <h1 className="text-sm text-[#6C727F] font-[500]">Negative Prompt</h1>
                        <p className="text-veryLightGray text-lg font-[400]">{negative}</p>
                    </div>
                    <div className="flex-col flex justify-start items-start gap-2">
                        <h1 className="text-sm text-[#6C727F] font-[500]">Input Resolution</h1>
                        <p className="text-veryLightGray text-lg font-[400]">{inputResolution}</p>
                    </div>
                </div>

            </div>
        </div>
    )
}

export  default HistoryCard 