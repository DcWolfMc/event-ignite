import { CaretRight, DiscordLogo, FileArrowDown, Image, Lightning } from "phosphor-react";
import { gql, useQuery } from "@apollo/client";
import { VideoPlayer } from "./VideoPlayer";

import '@vime/core/themes/default.css'


interface VideoContentProps{
  lessonSlug:string
}

interface GetLessonsBySlugResponse{
  lesson:{
    title: string
    videoId: string
    description:string
    teacher: {
      bio: string
      name: string
      avatarURL:string

    }
  }
}

const GET_LESSON_BY_SLUG_QUERY = gql`
  query GetLessonBySlug ($slug: String) {
    lesson(where: {slug: $slug}) {
      description
      teacher {
        bio
        name
        avatarURL
      }
      title
      videoId
    }
  }
`

export const VideoContent: React.FC<VideoContentProps> = ({lessonSlug})=> {
  
  const {data} = useQuery<GetLessonsBySlugResponse>(GET_LESSON_BY_SLUG_QUERY, {
    variables:{
      slug: lessonSlug
    }
  })


if(!data){
  return <div className="flex-1">
      <h1>Loadding...</h1>
      </div>
  }

  return (
    <div className="max-h-[90vh] sticky overflow-x-hidden overflow-y-auto flex-1 flex-col items-center">
      <div className="flex justify-center bg-black">
        <div className="h-full w-full max-w-[1100px] max-h-[60vh] aspect-video">
           {data.lesson.videoId && <VideoPlayer videoId={data.lesson.videoId} />}
        </div>
      </div>

      <div className="flex flex-col p-8 max-w[1100px] mx-auto">
        <div className="flex items-start gap-16">
          <div className="flex-1">
            <h1 className="text-2xl font-bold">{data.lesson.title}</h1>
            <p className="mt-4 text-gray-200 leading-relaxed"> {data.lesson.description}</p>
          
          </div>

          <div className="flex flex-col gap-4">
            <a href="#" className="p-4 text-sm bg-green-500 flex items-center rounded font-bold uppercase gap-2 justify-center hover:bg-green-700 transition-colors">
              <DiscordLogo size={24}/>
              Comunidade do Discord
            </a>
            <a href="#" className="p-4 text-sm text-green-500 border border-green-500 flex items-center rounded font-bold uppercase justify-center hover:bg-green-500 hover:text-inherit transition-colors">
              <Lightning size={24}/>
              Acesse o desafio
            </a>

          </div>
        </div>
        <div className="flex items-center gap-4 mt-6">
          <img 
          className="h-16 w-16 rounded-full border-2 border-blue-500"
          src={data.lesson.teacher.avatarURL}
          alt="#"
          />
          <div className="leading-relaxed">
            <strong className="text-2xl block">{data.lesson.teacher.name}</strong>
            <span className="text-gray-200 text-sm block">{data.lesson.teacher.bio}</span>
          </div>
        </div>

      <div className="gap-8 my-20 grid grid-cols-2">
        <a href="#" className="bg-gray-700 rounded overflow-hidden flex items-stretch gap-6 hover:bg-gray-600 transition-colors">
          <div className="bg-green-700 h-full p-6 flex items-center">
            <FileArrowDown size={40}/>
          </div>
          <div className="py-6 leading-relaxed">
            <strong className="text-2xl"> Material Complementar</strong>
            <p className="text-sm text-gray-200 mt-2">
              Acesse o material complementar e acelere o seu desenvolvimento.
            </p>
          </div>
          <div className="h-full p-6 flex items-center">
            <CaretRight size={24}/>
          </div>
        </a>
        <a href="#" className="bg-gray-700 rounded overflow-hidden flex items-stretch gap-6 hover:bg-gray-600 transition-colors">
          <div className="bg-green-700 h-full p-6 flex items-center">
            <Image size={40}/>
          </div>
          <div className="py-6 leading-relaxed">
            <strong className="text-2xl"> Wallpapers Exclusivos </strong>
            <p className="text-sm text-gray-200 mt-2">
              Baixe os Wallpapers do evento para sua plataforma de escolha
            </p>
          </div>
          <div className="h-full p-6 flex items-center">
            <CaretRight/>
          </div>
        </a>
      </div>
      </div>
    </div>
  );
}
