import '../../styles.css'
import './home.css'
import { Section } from "../../Components/section/section"
import { Card } from "../../Components/card/card"
import { EDUCATION_CARD_DATA } from "../../Components/data/data"
import { WORK_CARD_DATA } from "../../Components/data/data"
import { PROJECT_CARD_DATA } from "../../Components/data/data"
import { HomeHero } from "../../Components/homeHero/homeHero"

export function Home() {
    function convertToCard(input, id) {
        return (    
        <div className="section-row" key = {id}>
            <div className="spacer-placeholder">

            </div>
            <Card heading={input.heading}
                        subTitle={input.subHeading}
                        content={input.content}
                        footer={input.footer}
            />
        </div>
        )    
    }

    return(
        <div className='home-container'>
            
            <HomeHero/>
            <Section title='Education' content={
                EDUCATION_CARD_DATA.map (convertToCard)
            }/>
            <Section title='Work Experience' content={
                WORK_CARD_DATA.map (convertToCard)
            }/>
            <Section title='Special Projects' content={
                PROJECT_CARD_DATA.map (convertToCard)
            }/>
        </div>
    )
        
}