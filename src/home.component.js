import React, {useEffect, useState} from "react";
import styled from "styled-components";
import TextField from '@material-ui/core/TextField';
import Collapse from '@material-ui/core/Collapse';
import moment from "moment"
import Button from '@material-ui/core/Button';
import axios from "axios";
import InnerHTML from "dangerously-set-inner-html/index";

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
const SearchContainer = styled.div`
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
    text-decoration: underline;
`

function Home() {
    let [tagged, setTagged] = useState("")
    let [questions, setQuestions] = useState([]);

    const handleSearchInput = (input) => {
        setTagged(input.target.value)
    }
    const handleSearch = () => {
        // axios.get(
        //     `https://api.stackexchange.com/2.2/questions?pagesize=10&fromdate=1613865600&todate=1614556800&order=desc&sort=votes&tagged=${tagged}&site=stackoverflow&filter=!*PBQNA2D-Y)jggiwb8s1L)bS3FX1MjsI4j0vFNb7pCMhx39lT`
        // )
        //     .then((response)=> {
        //             console.log(response)
        //             setQuestions(response.data.items)
        //         }
        //     ).catch((error)=>console.log(error))
        // setQuestions(
        //
        // )
    }

    useEffect(() => {
        }, []
    )

    return (
        <HomeContainer>
            <Title>EXPLORE STACKOVERFLOW</Title>
            <SearchContainer>
                <TextField style={{width: "500px"}} id="standard-basic" label="Search Tagged" value={tagged}
                           onChange={handleSearchInput}/>
                <Button onClick={handleSearch} style={{background: "black", color: "white", marginLeft: "10px"}}
                        variant="contained"
                >Search</Button>
            </SearchContainer>
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
    overflow:auto;
`
const TitleSection = styled.div`
    display:flex;
    flex-direction: column;
`
const Answer = styled.div`
    margin-left: 40px;
    background: #ebebeb;
`
const BoldDiv = styled.div`
    font-weight: bold;
`
const QuestionIdButton = styled.div`
    padding: 0px;
    color:blue;
    text-decoration: underline;
    margin: 0 10px;
`
const NormalDiv = styled.div`
    font-weight: 400;
`

function ListItem(props) {
    let [show, setShow] = useState(false);
    let [showAnswer, setShowAnswer] = useState(false);
    let [showComment, setShowComment] = useState(false);
    const handleShow = () => {
        setShow(!show)
    }
    const handleShowAnswer = () => {
        setShowAnswer(!showAnswer)
    }
    const handleShowComment = () => {
        setShowComment(!showComment)
    }
    console.log(props)
    return (
        <ListItemDiv>
            <DetailsContainer>
                <QuestionTitle onClick={handleShow}>
                    <QuestionIdButton
                        onClick={() => window.open(`https://stackoverflow.com/questions/${props.question.question_id}`)}> {"("}{props.question.question_id}{") "}</QuestionIdButton>
                    <div style={{width: "500px", alignSelf: "flex-start"}}>{props.title}</div>
                    <TitleSection style={{marginLeft: "auto"}}>
                        <BoldDiv>{"Date Created: "}&nbsp;
                            <NormalDiv>{moment.unix(props.question.creation_date).format("DD-MM-YYYY")}</NormalDiv></BoldDiv>
                        <BoldDiv>{"Votes: "}&nbsp;<NormalDiv>{props.question.score}</NormalDiv></BoldDiv>

                    </TitleSection>
                </QuestionTitle>
                <Collapse in={show}>
                    <div style={{textAlign: 'left'}}>
                        {<InnerHTML html={props.question.body}/>}
                        {props.question.answers && <>
                            <>ANSWERS:</>
                            <Button style={{background: "black", color: "white", marginLeft: "10px"}}
                                    onClick={handleShowAnswer}>{!showAnswer ? "SHOW" : "HIDE"}</Button>
                            <Collapse in={showAnswer}>

                                {props.question.answers.map((answer, i) => <Answer>
                                        <InnerHTML html={answer.body}/>
                                        <TitleSection style={{marginLeft: "auto"}}>
                                            <BoldDiv>{"Date Created: "}{moment.unix(answer.creation_date).format("DD-MM-YYYY")}</BoldDiv>
                                            <BoldDiv>{"Votes: "}{answer.score}</BoldDiv>
                                        </TitleSection>
                                        <Answer>{answer.comments ?
                                            <>
                                                <BoldDiv>ANSWER COMMENTS:</BoldDiv>
                                                {answer.comments.map((comments, i) => <Answer
                                                        style={{background: "white", padding: "3px"}}>
                                                        <InnerHTML html={comments.body}/>
                                                        <TitleSection style={{marginLeft: "auto"}}>
                                                            <BoldDiv>{"Date Created: "}{moment.unix(comments.creation_date).format("DD-MM-YYYY")}</BoldDiv>
                                                            <BoldDiv>{"Votes: "}{comments.score}</BoldDiv>
                                                        </TitleSection>
                                                        <hr/>
                                                    </Answer>
                                                )}</>
                                            : ""}</Answer>
                                        <hr/>
                                    </Answer>
                                )
                                }
                            </Collapse>
                        </>}
                        {props.question.comments && <>
                            <>COMMENTS:</>
                            <Button
                                style={{background: "black", color: "white", margin: "10px"}}
                                onClick={handleShowComment}>{!showComment ? "SHOW" : "HIDE"}</Button>
                            <Collapse in={showComment}>
                                {props.question.comments.map((comments, i) => <Answer>
                                        <InnerHTML html={comments.body}/>
                                        <TitleSection style={{marginLeft: "auto"}}>
                                            <BoldDiv>{"Date Created: "}{moment.unix(comments.creation_date).format("DD-MM-YYYY")}</BoldDiv>
                                            <BoldDiv>{"Votes: "}{comments.score}</BoldDiv>
                                        </TitleSection>
                                        <hr/>
                                    </Answer>
                                )
                                }
                            </Collapse>
                        </>}
                        {
                            !props.question.answers && <>NO ANSWERS</>
                        }
                    </div>
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
