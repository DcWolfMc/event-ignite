import { gql, useMutation, } from "@apollo/client";
import { FormEvent, useState } from "react"
import { useNavigate } from "react-router-dom";
import { Logo } from "../components/Logo"

const CREATE_SUBSCRIBER_MUTATION = gql`
    mutation CreateSubscriber ($name: String!,$email:String!) {
        createSubscriber(data: {name: $name, email: $email}) {
        id
        }
    }
`

export const Subscription = () => {
    const navigate = useNavigate()
    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');

    const [createSubscriber,{ loading }] = useMutation(CREATE_SUBSCRIBER_MUTATION)

    function handleSubmit(event: FormEvent){
        event.preventDefault()
        createSubscriber({
            variables:{
                name,
                email,
            }
        }).then(()=>navigate('/masterClass'))
    }
    return(
        <div className="min-h-screen bg-cover bg-blur bg-no-repeat flex flex-col items-center">
            <div className="w-full max-w-[1100px] flex items-center justify-between mt-20 mx-auto">
                <div className="max-w-screen-sm">
                    <Logo/>
                    <h1 className="mt-8 text-[2.5rem] leading-tight">
                        Construa uma <strong className="text-blue-500">aplicação completa</strong>, do zero, com <strong className="text-blue-500" > React </strong></h1>
                    <p className="mt-8 text-gray-200 leading-relaxed">
                        Em apenas uma semana você vai dominar na prática uma das tecnologias mais utilizadas e com alta demanda para acessar as melhores oportunidades do mercado.
                    </p>
                </div>
                    
                <div className="bg-gray-700 rounded border border-gray-500 p-8" >
                    <strong className="text-2xl mb-6 block" >Faça a sua inscrição aqui!</strong>
                    <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full">
                        <input 
                        type="text"
                        required
                        className="bg-gray-900  rouded px-5 h-14 "
                        placeholder="Digite o seu nome completo."
                        onChange={(event)=>setName(event.target.value)}/>
                    
                        <input 
                        type="email"
                        required
                        className="bg-gray-900  rouded px-5 h-14 "
                        placeholder="Digite o seu E-mail."
                        onChange={(event)=>setEmail(event.target.value)}/>

                        <button type="submit" disabled={loading} className="mt-4 py-4 font-bold bg-green-500 uppercase rounded hover:bg-green-700 transition-colors disabled:opacity-50">
                            Garantir vaga
                        </button>
                    </form>
                </div>
            </div>
            <img src="/src/assets/react-code-mockup.png" className="m-10"  alt="" />
        </div>
    )
}