"use server"
export const Tabpanel:React.FC<{faq:{question:string,answer:string}[]}>=({faq})=>{
    return (
        <div className="flex items-center gap-10 flex-col lg:px-32  p-4">

                {faq.map(({question,answer},key)=>(
                <div className="w-full" key={key}>
                    <details className="group [&[open]_summary]:mb-0 [&[open]_summary]:border-opacity-50 [&[open]_article]:ml-10">
                        <summary className="flex items-center border-b border-t rounded-lg border-primary-300 -mb-5 pb-5 gap-3 px-4 py-3 font-medium marker:content-none hover:cursor-pointer transition-all">
                            <svg className="w-5 h-5 text-gray-500 transition group-open:rotate-90" xmlns="http://www.w3.org/2000/svg"
                                width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                <path fillRule="evenodd"
                                    d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z">
                                </path>
                            </svg>
                            <span>{question}</span>
                        </summary>

                        <article className="p-4 border-b ml-0 border-primary-300 rounded-md transition-all duration-1000">
                            <p>
                                {answer}
                            </p>
                        </article>
                    </details>
                </div>))}
            
        </div>
)
}