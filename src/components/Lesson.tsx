import { isPast, format } from "date-fns";
import  ptBR  from "date-fns/locale/pt-BR";
import { CheckCircle, Lock } from "phosphor-react";
import {Link, useParams } from "react-router-dom"
interface LessonProps{
  title: string;
  slug: string;
  availableAt: Date;
  type: 'live' | 'class' 
}

export function Lesson(props: LessonProps) {
  const { slug } = useParams<{slug: string}>()
  const isLessonAvailable = isPast(props.availableAt)
  const availableDateFormatted = format(props.availableAt, "EEE' • 'd ' de ' MMMM' • ' k'h'mm",{locale:ptBR, })
  const isLessonActive = slug === props.slug

  return (
    <Link to={isLessonAvailable?`/masterClass/lesson/${props.slug}`:`./`} className="group">
      <span className="text-gray-300 ">{`${availableDateFormatted.charAt(0).toLocaleUpperCase()}${availableDateFormatted.slice(1)}`}</span>
      <div className={`rounded border border-gray-500 p-4 mt-2 group-hover:border-green-500 ${isLessonActive&& "bg-green-500"}`}>
        <header className="flex items-center justify-between">
          
          {isLessonAvailable? (
            <span className={`text-sm  font-medium flex items-center gap-2 ${isLessonActive?"text-gray-100":"text-blue-500"} `}>
            <CheckCircle size={20}/>
            Conteúdo Liberado 
            </span>
          ):(
            <span className="text-sm text-orange-500 font-medium flex items-center gap-2 ">
          <Lock size={20}/>
          Em breve
          </span>
          )}
          <span className={`text-xs rounded py-[0.125rem] px-2 text-white border font-bold ${isLessonActive?"border-gray-100":"border-green-300"}`}>
            {props.type == 'live'? 'AO VIVO': "AULA PRÁTICA"}
          </span>
        
        </header>
        <strong className={` mt-5 block ${isLessonActive?"text-gray-100":"text-gray-200"}`}>{props.title}</strong>
      </div>
    </Link>
  );
}
