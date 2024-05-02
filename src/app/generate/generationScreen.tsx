/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
'use client'
import {useState, useContext, useEffect} from  'react'
import { HfInference } from "@huggingface/inference";
import { modalContext } from '~/lib/providers/modalProvider';
import { useSession } from 'next-auth/react';
import ui from '~/styles/ui.module.css'
import { useEdgeStore } from '~/lib/edgestore';
import { api } from '~/trpc/react';
import { Image } from '../feed/FeedScreen';
import toast from 'react-hot-toast';


const GenerationScreen:React.FC = ()=>{
  const [activeRes, setActive] = useState('1024 x 1024 (1:1)')
  const [url, setUrl] = useState ('')
  const hf = new HfInference(process.env.NEXT_PUBLIC_HF_TOKEN)
  const {setIsOpen} = useContext (modalContext)
  const [guidence, setGuidence] = useState (0)
  const { edgestore } = useEdgeStore();
    const [prompt, setPrompt] = useState ('')
    const [negative, setNegative] = useState ('')
    const [isLoading, setLoading] = useState (false)
    const utils = api.useUtils ()
    const [progress, setProgress] = useState ('Generating image ...')
    const saveImageMutation = api.post.createImage.useMutation ({
      onSuccess: () =>  {
        toast.success ('image saved successfully')
        void utils.post.getImages.invalidate();
        if (localStorage.getItem('settings'))
          localStorage.removeItem ('settings');
      },
      onError: ()=> toast.error ('Failed to save image')
    })
    const { status, data } = useSession({
      required: true,
      onUnauthenticated() {
        // The user is not authenticated, handle it here.
        console.log ('user is not authenticated')
      },
    })

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
    "1280 x 800 (8:5)",
    "1280 x 1024 (5:4)",
    "1366 x 768 (683:384)",
  ];


  const uploadFile =async (file:File)=>{

    console.log ('uploading ... ', file);
    if (file) {
      try {   
        const res = await edgestore.publicFiles.upload({
          file,
          onProgressChange: (progress) => {
            setProgress ('uploading image ...')
            console.log(progress);
          },
        });
        // you can run some server action or api here
        // to add the necessary data to your database
        setProgress ('Image generated successfully')
        saveImageMutation.mutate({
          name: 'image',
          url: res.url,
          prompt: prompt,
          negative: negative,
          creatoreId: data?.user?.id??'',
          creatoreName: data?.user?.name??'',
          guidence: guidence,
          width: parseInt(activeRes.split('x')[0]??''),
          height: parseInt(activeRes.split(' ')[2]??''),
        })
        setProgress ('Saving image ...')
        setLoading (false);

      } catch (error) {
        console.log ('failed to upload image');
       setLoading (false);
      }
    }
  }
  const generate = async ()=>{
   try{
    setLoading (true)
    const imageBlob = await hf.textToImage({
        inputs: prompt,
        model: 'stabilityai/stable-diffusion-xl-base-1.0',
        parameters: {
          negative_prompt: negative,
          guidance_scale: guidence,
          width: parseInt(activeRes.split('x')[0]??''),
          height: parseInt(activeRes.split(' ')[2]??''),
        }
      })
    setUrl (URL.createObjectURL(imageBlob)??'')
    void uploadFile (new File([imageBlob], 'image.png'));
   }catch(err){
      setLoading (false);
      console.log (err);
   }
  }

  
  useEffect(()=>{
    try{
      const settings = localStorage.getItem ('settings')
    console.log ('settings : ', JSON.parse (settings??''))
    if (settings){
      const parsed:Image = JSON.parse (settings??'') ?? {}
      setPrompt (parsed?.prompt??'')
      setNegative (parsed?.negative??'')
      setGuidence (parsed?.guidence??'')
    }
  }catch (err){
    console.log ('err: ', err)
  }
  }, [])
  return (
    <div className="flex w-full items-center justify-center">
      <div className="flex w-[90%] items-center justify-center">
        <div className="flex min-h-[500px] w-[50%] flex-col items-start justify-start gap-8  max-w-[700px]">
          <div className="flex w-full flex-col items-start justify-start gap-3">
            <h1 className="text-lightGray text-[14px] font-[500]">Prompt</h1>
            <textarea
              value={prompt}
              onChange={(e)=> setPrompt(e.target.value)}
              placeholder="Enter the prompt"
              
              className="primaryInput max-h-[100px]"
            />
          </div>
          <div className="flex w-full flex-col items-start justify-start gap-3">
            <h1 className="text-lightGray text-[14px] font-[500]">Negative Prompt (optional)</h1>
            <textarea
              value={negative}
              onChange={(e)=> setNegative(e.target.value)}
              placeholder="Enter the prompt"
              className="primaryInput max-h-[100px]"
            />
          </div>
          {/* <div className="flex w-full flex-col items-start justify-start gap-3">
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
            </div> */}
          {/* </div> */}
          <div className='flex w-full flex-col items-start justify-start gap-3'>
            <h1 className='text-lightGray text-[14px] font-[500]'>Resolution</h1>
            <div className='flex justify-start items-center gap-2 flex-wrap w-full'>
              {resolutions.map((resolution, index) => {
                return <button onClick={()=> setActive(resolution)} className={`${activeRes === resolution ? 'resolutionButtonActive' : 'resolutionButton'}`} key={index} value={resolution}>{resolution}</button>
              })}
            </div>
          </div>
          <div className='flex  flex-col items-start justify-start gap-3 w-[95%] '>
          <h1 className='text-lightGray text-[14px] font-[500]'>Guidance ({guidence})</h1>
          <input type="range" name="" id="" value={guidence} onChange={(e)=> setGuidence (parseInt(e.target.value))} min={'0'} max={'5'}  className='w-full appearance-none bg-veryDarkGray h-2 rounded-lg [&::-webkit-slider-thumb]:h-[18px] [&::-webkit-slider-thumb]:w-[18px] [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-purple [&::-webkit-slider-thumb]:appearance-none'/>
          </div>
          <div className='flex  flex-col items-start justify-start gap-3 w-[95%]'>

          <button className='largeButton' onClick={()=>{
            if (status == 'authenticated')
              void generate ();
            else 
              setIsOpen?.(true)
          }}>
          {isLoading ?(
          <div className='flex gap-2 justify-center items-center'>
            <div className={ui.loader}></div>
            <h1 className=' text-[14px] font-[500]'>{progress}</h1>
          </div>
          ) :( 
            <div className='flex justify-start items-start gap-2'>
            <img src="/Magic.svg" alt="" />
            <h1 className=' text-[14px] font-[500]'>Generate Image</h1>
            </div>
          )}

          </button>
          </div>
        </div>
        <div className="flex h-[500px] w-[450px] flex-col items-center justify-center rounded-md border-red bg-veryDarkGray">
          <img src={`${url.length ? url : '/Box-shape.png'}`} className={` ${url.length ? 'w-[98%] rounded-md' : 'w-[400px]'}`} alt="" />
        </div>
      </div>
    </div>
  )
}

export default GenerationScreen