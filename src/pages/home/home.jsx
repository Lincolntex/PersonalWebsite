import { Section } from "../../Components/section/section"

export function Home() {
    const schoolInfo = <>
        <h2>University of Nevada Reno</h2>
        <p>Bachlors of Science in Information Systems</p>
        <p>May 17, 2024</p>
        </>
    return(
        <>
            <Section title='Education' content={schoolInfo}/>
        </>
    )
        
}