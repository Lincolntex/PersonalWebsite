import { Section } from "../../Components/section/section"
import { Card } from "../../Components/card/card"
import { EDUCATION_CARD_DATA } from "../../Components/data/data"
import { WORK_CARD_DATA } from "../../Components/data/data"
import { PROJECT_CARD_DATA } from "../../Components/data/data"

export function Home() {
    function convertToCard(input) {
        return <Card heading={input.heading}
                        subTitle={input.subHeading}
                        content={input.content}
                        footer={input.footer}
        />
    }
    return(
        <>
            <Section title='Education' content={
                EDUCATION_CARD_DATA.map (convertToCard)
            }/>
            <Section title='Work Expirance' content={
                WORK_CARD_DATA.map (convertToCard)
            }/>
            <Section title='Special Projects' content={
                PROJECT_CARD_DATA.map (convertToCard)
            }/>
        </>
    )
        
}