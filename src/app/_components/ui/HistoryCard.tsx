'use client'


interface props {
    image:{
        id: string;
        name: string;
        url: string;
        createdAt: Date;
        updatedAt: Date;
        createdById: string;
        creatorName: string;
        prompt: string;
        negative: string | null;
        width: number;
        height: number;
        guidence: number;
    }
}

const HistoryCard:React.FC<props> = ({image})=>{


    

    return (
        <div className='flex flex-col lg:flex-row gap-12 w-full justify-start items-start border-b-[1px] border-veryDarkGray  pb-12 pt-6'>
            <img src={image.url} alt="" className="w-[350px] rounded-md border-[6px] border-veryDarkGray" />
            <div className='flex-1 flex flex-col md:flex-row justify-start items-start gap-16'>
                <div className="flex flex-col justify-start items-start gap-8 max-w-[360px]">
                    <div className="flex-col flex justify-start items-start gap-2 ">
                        <h1 className="text-sm text-[#6C727F] font-[500]">Prompt Details</h1>
                        <p className="text-veryLightGray text-lg font-[400]">{image.prompt}</p>
                    </div>
                    <div className="flex-col flex justify-start items-start gap-2">
                        <h1 className="text-sm text-[#6C727F] font-[500]">Created On</h1>
                        <p className="text-veryLightGray text-lg font-[400]">{image.createdAt.toISOString()}</p>
                    </div>
                    <div className="flex-col flex justify-start items-start gap-2">
                        <h1 className="text-sm text-[#6C727F] font-[500]">Seed</h1>
                        <p className="text-veryLightGray text-lg font-[400]">{image.guidence}</p>
                    </div>
                </div>
                <div className="flex flex-col justify-start items-start gap-8 max-w-[300px]">
                    <div className="flex-col flex justify-start items-start gap-2">
                        <h1 className="text-sm text-[#6C727F] font-[500]">Negative Prompt</h1>
                        <p className="text-veryLightGray text-lg font-[400]">{image.negative}</p>
                    </div>
                    <div className="flex-col flex justify-start items-start gap-2">
                        <h1 className="text-sm text-[#6C727F] font-[500]">Input Resolution</h1>
                        <p className="text-veryLightGray text-lg font-[400]">{image.width}</p>
                    </div>
                </div>

            </div>
        </div>
    )
}

export  default HistoryCard 