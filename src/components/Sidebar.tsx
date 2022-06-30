import { gql, useQuery } from "@apollo/client";
import { Lesson, } from "./Lesson";
import { ArrowLineLeft, ArrowLineRight } from "phosphor-react";
import { useState } from "react";
const GET_LESSONS_QUERY = gql`
      query {
        lessons(orderBy: availableAt_ASC, stage: PUBLISHED) {
          id
          lessonType
          slug
          availableAt
          title
        }
      }
    `
interface GetLessonsQueryResponse{
    lessons:{
        id: string,
        title: string,
        slug: string,
        availableAt: string
        lessonType: 'live' | 'class'
    }[]
}

export function Sidebar(){
    const { data } = useQuery<GetLessonsQueryResponse>(GET_LESSONS_QUERY)
    const [hideSidebar, setHideSidebar] = useState<boolean>(false)

    const HideShowSideBar:React.MouseEventHandler<SVGSVGElement>=()=> {
        setHideSidebar((prev)=>!prev)
    }
    return(
        <aside className={hideSidebar?" h-[90vh] w-[78px] bg-gray-700 p-6 border-l border-gray-600 transition-all duration-200":" h-[90vh] w-[348px] bg-gray-700 p-6 border-l border-gray-600 transition-all duration-200"}>
            <span className="flex justify-between items-center font-bold text-2xl pb-6 mb-6 border-b border-gray-500 transition-all duration-300">
                
                {hideSidebar ? 
                    <ArrowLineLeft className="text-gray-200 hover: cursor-pointer hover:text-blue-500 transition-all active:rotate-180" size={30} onClick={HideShowSideBar}/> 
                :(
                    <>
                    <ArrowLineRight className="text-gray-200 hover: cursor-pointer hover:text-blue-500 transition-all active:rotate-180" size={30} onClick={HideShowSideBar}/>
                    Cronograma de aulas
                    </>
                )}
            </span>
            <div className={hideSidebar?"opacity-0 hidden" :"h-[73vh] overflow-x-hidden overflow-y-auto flex flex-col gap-8 transition-opacity"}>
                {data?.lessons.map(lesson =>{
                    return(
                    <Lesson
                    key={lesson.id}
                    title={lesson.title}
                    slug={lesson.slug}
                    type={lesson.lessonType}
                    availableAt={new Date(lesson.availableAt) }
                    />
                    )
                })}
            </div>
            

        </aside>)
}