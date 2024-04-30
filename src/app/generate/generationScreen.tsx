'use client'
import {useState} from  'react'

const GenerationScreen:React.FC = ()=>{
    const [activeRes, setActive] = useState('1024 x 1024 (1:1)')
  const colors = [
    "bg-lightGray",
    "bg-lightPurple",
    "bg-skyBlue",
    "bg-lightGreen",
    "bg-purple",
    "bg-red",
    "bg-orange",
  ];

  const resolutions = [
    "1024 x 1024 (1:1)",
    "1152 x 856 (9:7)",
    "1280 x 720 (16:9)",
    "1280 x 800 (8:5)",
    "1280 x 1024 (5:4)",
    "1366 x 768 (683:384)",
  ];
  return (
    <div className="flex w-full items-center justify-center">
      <div className="flex w-[90%] items-center justify-center">
        <div className="flex min-h-[500px] w-[50%] flex-col items-start justify-start gap-8  max-w-[700px]">
          <div className="flex w-full flex-col items-start justify-start gap-3">
            <h1 className="text-lightGray text-[14px] font-[500]">Prompt</h1>
            <input
              placeholder="Enter the prompt"
              type="text"
              className="primaryInput"
            />
          </div>
          <div className="flex w-full flex-col items-start justify-start gap-3">
            <h1 className="text-lightGray text-[14px] font-[500]">Negative Prompt (optional)</h1>
            <input
              placeholder="Enter the prompt"
              type="text"
              className="primaryInput"
            />
          </div>
          <div className="flex w-full flex-col items-start justify-start gap-3">
            <h1 className="text-lightGray text-[14px] font-[500]">Colors</h1>
            <div className="flex items-center justify-start gap-3">
              {colors.map((color, index) => {
                return (
                  <button
                    key={index}
                    className={`${color} h-[30px] w-[30px] rounded-full hover:opacity-95`}
                  ></button>
                );
              })}
              <button className="closeButton">
                <img src="/Close.svg" alt="" />
              </button>
            </div>
          </div>
          <div className='flex w-full flex-col items-start justify-start gap-3'>
            <h1 className='text-lightGray text-[14px] font-[500]'>Resolution</h1>
            <div className='flex justify-start items-center gap-2 flex-wrap w-full'>
              {resolutions.map((resolution, index) => {
                return <button onClick={()=> setActive(resolution)} className={`${activeRes === resolution ? 'resolutionButtonActive' : 'resolutionButton'}`} key={index} value={resolution}>{resolution}</button>
              })}
            </div>
          </div>
          <div className='flex  flex-col items-start justify-start gap-3 w-[95%] '>
          <h1 className='text-lightGray text-[14px] font-[500]'>Guidance (5.0)</h1>
          <input type="range" name="" id=""  className='w-full appearance-none bg-veryDarkGray h-2 rounded-lg [&::-webkit-slider-thumb]:h-[18px] [&::-webkit-slider-thumb]:w-[18px] [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-purple [&::-webkit-slider-thumb]:appearance-none'/>
          </div>
          <div className='flex  flex-col items-start justify-start gap-3 w-[95%]'>

          <button className='largeButton'>
            <img src="/Magic.svg" alt="" />
          <h1 className=' text-[14px] font-[500]'>Generate Image</h1>

          </button>
          </div>
        </div>
        <div className="flex h-[500px] w-[450px] flex-col items-center justify-center rounded-md border-red bg-veryDarkGray">
          <img src="/Box-shape.png" className="w-[400px]" alt="" />
        </div>
      </div>
    </div>
  )
}

export default GenerationScreen