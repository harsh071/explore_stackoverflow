import React, {useEffect, useState} from "react";
import styled from "styled-components";
import TextField from '@material-ui/core/TextField';
import Collapse from '@material-ui/core/Collapse';
import moment from "moment"
import Button from '@material-ui/core/Button';
import axios from "axios";

const HomeContainer = styled.div`
    display:flex;
    flex-direction: column;
    align-items: center;   
    width:100%;
`
const ListContainer = styled.div`
    margin: 20px 100px 100px 100px;
    overflow-y:auto;
    display:flex;
    flex-direction:column;
    align-items: center;
    padding:10px;
    box-shadow: 0px 0px 25px #EF8236;
    width: 100%;
    height: 100%;
    overflow-x:hidden;
`
const SearcbContainer = styled.div`
    width:100%;
    display:flex;
    flex-direction: row;
    align-items: center;
    padding:10px;
    border-radius: 10px;
    margin: 10px 20px;    
    box-shadow: 0px 0px 25px black;
    padding-left:50%;
    
`
const Title = styled.h1`
    color:#EF8236;
`

function Home() {
    let [tagged, setTagged] = useState("")
    let [questions, setQuestions] = useState([]);

    const handleSearchInput = (input) => {
        setTagged(input.target.value)
    }
    const handleSearch = () => {
        // axios.get(
        //     `https://api.stackexchange.com//2.2/questions?order=desc&sort=week&tagged=${tagged}&site=stackoverflow`            ,
        // )
        //     .then((response)=> {
        //             console.log(response)
        //             setQuestions(response.data.items)
        //         }
        //     ).catch((error)=>console.log(error))

        setQuestions([
            {
                "tags": [
                    "javascript",
                    "promise",
                    "event-loop"
                ],
                "owner": {
                    "reputation": 1725,
                    "user_id": 7745173,
                    "user_type": "registered",
                    "accept_rate": 78,
                    "profile_image": "https://i.stack.imgur.com/tx8YG.png?s=128&g=1",
                    "display_name": "Logan Wlv",
                    "link": "https://stackoverflow.com/users/7745173/logan-wlv"
                },
                "is_answered": true,
                "view_count": 252,
                "closed_date": 1614400257,
                "accepted_answer_id": 66387206,
                "answer_count": 3,
                "score": 9,
                "last_activity_date": 1614427510,
                "creation_date": 1614347874,
                "last_edit_date": 1614381147,
                "question_id": 66387109,
                "link": "https://stackoverflow.com/questions/66387109/javascript-async-callbacks-promise-and-settimeout",
                "closed_reason": "Duplicate",
                "title": "JavaScript async callbacks - Promise and setTimeout"
            },
            {
                "tags": [
                    "javascript",
                    "arrays",
                    "typescript"
                ],
                "owner": {
                    "reputation": 683,
                    "user_id": 7926415,
                    "user_type": "registered",
                    "profile_image": "https://www.gravatar.com/avatar/17f7aa5d7d9fbb835172873b70e8e966?s=128&d=identicon&r=PG&f=1",
                    "display_name": "Ren",
                    "link": "https://stackoverflow.com/users/7926415/ren"
                },
                "is_answered": true,
                "view_count": 46,
                "accepted_answer_id": 66371443,
                "answer_count": 1,
                "score": 6,
                "last_activity_date": 1614427482,
                "creation_date": 1614266358,
                "last_edit_date": 1614427482,
                "question_id": 66371388,
                "content_license": "CC BY-SA 4.0",
                "link": "https://stackoverflow.com/questions/66371388/two-dimensional-array-passed-to-new-map-fails-in-typescript",
                "title": "Two dimensional array passed to new Map fails in typescript"
            },
            {
                "tags": [
                    "javascript",
                    "cypress",
                    "yarnpkg",
                    "visual-testing",
                    "percy"
                ],
                "owner": {
                    "reputation": 5292,
                    "user_id": 618099,
                    "user_type": "registered",
                    "accept_rate": 70,
                    "profile_image": "https://i.stack.imgur.com/A3bOH.png?s=128&g=1",
                    "display_name": "Norfeldt",
                    "link": "https://stackoverflow.com/users/618099/norfeldt"
                },
                "is_answered": true,
                "view_count": 71,
                "bounty_amount": 100,
                "bounty_closes_date": 1614866075,
                "accepted_answer_id": 66398934,
                "answer_count": 1,
                "score": 5,
                "last_activity_date": 1614545367,
                "creation_date": 1614083819,
                "last_edit_date": 1614545367,
                "question_id": 66333245,
                "content_license": "CC BY-SA 4.0",
                "link": "https://stackoverflow.com/questions/66333245/nodejs-not-able-to-set-percy-token-via-package-script-with-start-server-and-tes",
                "title": "NodeJS: NOT able to set PERCY_TOKEN via package script with start-server-and-test"
            },
            {
                "tags": [
                    "javascript",
                    "ssl",
                    "native",
                    "mixed-content"
                ],
                "owner": {
                    "reputation": 11808,
                    "user_id": 940158,
                    "user_type": "registered",
                    "accept_rate": 57,
                    "profile_image": "https://www.gravatar.com/avatar/a0e9a52555bc8c0ac3e5c9248506c01a?s=128&d=identicon&r=PG",
                    "display_name": "alexandernst",
                    "link": "https://stackoverflow.com/users/940158/alexandernst"
                },
                "is_answered": false,
                "view_count": 74,
                "closed_date": 1614557534,
                "answer_count": 0,
                "score": 5,
                "last_activity_date": 1614466713,
                "creation_date": 1614426885,
                "last_edit_date": 1614466713,
                "question_id": 66398564,
                "link": "https://stackoverflow.com/questions/66398564/website-talking-to-native-app-via-localhost-cors-https-problems",
                "closed_reason": "Needs more focus",
                "title": "Website talking to native app via localhost (CORS / HTTPS problems)"
            }])

    }

    useEffect(() => {
        }, []
    )

    return (
        <HomeContainer>
            <Title>EXPLORE STACKOVERFLOW</Title>
            <SearcbContainer>
                <TextField style={{width: "500px"}} id="standard-basic" label="Search Tagged" value={tagged}
                           onChange={handleSearchInput}/>
                <Button onClick={handleSearch} style={{background: "black", color: "white", marginLeft: "10px"}}
                        variant="contained"
                >Search</Button>
            </SearcbContainer>
            <ListContainer>
                {questions.map((question, index) => <div style={{width: "100%"}} key={index}>
                        <ListItem question={question} index={index} title={question.title}>{"Hahah"}
                        </ListItem>
                    </div>
                )
                }
            </ListContainer>
        </HomeContainer>
    );
}

const ListItemDiv = styled.div`
    display: flex;    
    width:100%
    margin: 15px;
    padding:10px;
    margin-left: 100px;
`
const Details = styled.div`
     display:flex;
    flex-direction:column;
    margin:3px;
`
const QuestionTitle = styled.h2`
    font-size:20px;
    color:black;
    text-align:left;
    cursor:pointer;
    display:flex;
    flex-direction:row;
    justify-content: flex-start;
    
`

const DetailsContainer = styled.div`
       display:flex;
    flex-direction:column;       
    border: 1px solid gray;
        padding:10px;
    width:80%;
`
const TitleSection = styled.div`
    display:flex;
    flex-direction: column;
`
const TitleSectionInner = styled.div`
        margin-left: auto;
`
function ListItem(props) {
    let [show, setShow] = useState(false);
    const handleShow = () => {
        setShow(!show)
    }
    return (
        <ListItemDiv>
            <DetailsContainer onClick={handleShow}>

                <QuestionTitle>
                    {"("}{props.index + 1}{") "}
                    <div style={{width: "500px", alignSelf: "flex-start"}}>{props.title}</div>
                    <TitleSection style={{marginLeft:"auto"}}>
                        <div>{"Date Created: "}{props.question.creation_date}</div>
                        <div>{"Votes: "}{props.question.score}</div>

                    </TitleSection>
                </QuestionTitle>

                <Collapse in={show}>
                    <Details>
                        <div>{"Votes: "}{props.question.score}</div>
                        {props.question.is_answered && <div>Answered</div>}
                    </Details>
                </Collapse>
            </DetailsContainer>
            <Button variant="contained" style={{
                background: !show ? "#EF8236" : "black",
                boxShadow: "0px 0px 4px black",
                color: "white",
                height: "40px",
                width: "150px",
                margin: "4px"
            }} onClick={handleShow}>{show ? "HIDE" : "SHOW"} THREAD</Button>
        </ListItemDiv>
    )
}

export default Home;
