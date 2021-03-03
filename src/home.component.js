import React, {useEffect, useState} from "react";
import styled, {keyframes} from "styled-components";
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
    overflow:hidden;
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
    let [remaining, setRemaining] = useState(-1)
    let [questions, setQuestions] = useState([]);

    const handleSearchInput = (input) => {
        setTagged(input.target.value)
    }
    const handleSearch = () => {
        let dateTo = moment().format('YYYY-MM-DD hh:mm:ss');
        let dateFrom = moment().subtract(7, 'd').format('YYYY-MM-DD hh:mm:ss');

        axios.get(
            `https://api.stackexchange.com/2.2/questions?pagesize=10&fromdate=${dateFrom}&todate=${dateTo}&order=desc&sort=creation&tagged=${tagged}&site=stackoverflow&filter=!*PBQNA2D-Y)jggiwb8s1L)bS3FX1MjsI4j0vFNb7pCMhx39lT`
        )
            .then((response) => {
                    let list_of_questions = response.data.items;
                    console.log(list_of_questions)
                    axios.get(
                        `https://api.stackexchange.com/2.2/questions?pagesize=10&fromdate=${dateFrom}&todate=${dateTo}&order=desc&sort=votes&tagged=${tagged}&site=stackoverflow&filter=!*PBQNA2D-Y)jggiwb8s1L)bS3FX1MjsI4j0vFNb7pCMhx39lT`
                    )
                        .then((inner_response) => {
                                list_of_questions = list_of_questions.concat(inner_response.data.items)
                                list_of_questions.sort(
                                    (a, b) => {
                                        return b.creation_date - a.creation_date
                                    }
                                )
                                console.log(response)
                                setQuestions(list_of_questions)
                                setRemaining(response.data.quota_remaining)
                            }
                        ).catch((error) => {window.alert("ERROR OCCURED RETRY..."); console.log(error)})
                }
            ).catch((error) => {window.alert("ERROR OCCURED RETRY..."); console.log(error)})


    }

    useEffect(() => {
        }, []
    )

    return (
        <HomeContainer>
            <Title>EXPLORE STACKOVERFLOW</Title>
            <SearchContainer>
                <TextField style={{width: "500px"}} id="standard-basic" label={`Search Tagged`} value={tagged}
                           onChange={handleSearchInput}/>
                <Button onClick={handleSearch} style={{background: "black", color: "white", marginLeft: "10px"}}
                        variant="contained"
                >Search</Button>
            </SearchContainer>
            <ListContainer>
                {remaining !== -1 && <>{remaining}{" searches remaining"}</>}
                {questions.map((question, index) => <div style={{width: "100%"}} key={index}>
                        <ListItem question={question} index={index} title={question.title}/>
                        <hr/>
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
    margin: 35px;
    padding:10px;
    box-shadow: 0px 0px 5px black;

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
    padding:10px;
    width:80%;
    overflow:auto;
`
const TitleSection = styled.div`
    display:flex;
    flex-direction: column;
`
const Answer = styled.div`
    background: white;
    padding-left:5px;
    box-shadow: 0px 0px 3px gray;
    margin-left:15px;
    border-radius:10px;
    margin-top:20px;
    overflow:auto;
    :hover{
        box-shadow: 0px 0px 10px black;
    }
`
const AnswerComment = styled.div`
    margin-left: 20px;
    margin-top: 2px;
    margin-bottom: 5px;
    background: white;
    box-shadow: 0px 0px 3px black;
    padding: 5px;
    border-radius:5px;
    overflow:auto;  

    :hover{
        box-shadow: 0px 0px 10px red;
    }
`
const QuestionComment = styled(AnswerComment)`
    
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
    // console.log(props)
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
                       {props.question.body && <><InnerHTML html={props.question.body}/></>}
                        {props.question.comments && <>
                            <>COMMENTS ({props.question.comments.length}):</>
                            <Button
                                style={{background: "black", color: "white", margin: "10px"}}
                                onClick={handleShowComment}>{!showComment ? "SHOW" : "HIDE"}</Button>
                            <Collapse in={showComment}>
                                {props.question.comments.map((comments, i) => <QuestionComment>
                                        ({i+1})
                                        <TitleSection style={{marginLeft: "auto"}}>
                                            <BoldDiv>{"Date Created: "}{moment.unix(comments.creation_date).format("DD-MM-YYYY")}</BoldDiv>
                                            <BoldDiv>{"Votes: "}{comments.score}</BoldDiv>
                                        </TitleSection>
                                        <InnerHTML html={comments.body}/>
                                    </QuestionComment>
                                )
                                }
                            </Collapse>
                        </>}
                        {props.question.answers && <>
                            <>ANSWERS ({props.question.answers.length}):</>
                            <Button style={{background: "black", color: "white", marginLeft: "10px"}}
                                    onClick={handleShowAnswer}>{!showAnswer ? "SHOW" : "HIDE"}</Button>
                            <Collapse in={showAnswer}>
                                {props.question.answers.map((answer, i) => <Answer>
                                        <TitleSection style={{marginLeft: "auto"}}>({i+1})
                                            <BoldDiv>{"Date Created: "}{moment.unix(answer.creation_date).format("DD-MM-YYYY")}</BoldDiv>
                                            <BoldDiv>{"Votes: "}{answer.score}</BoldDiv>
                                        </TitleSection><InnerHTML html={answer.body}/>
                                        <>{answer.comments ?
                                            <>
                                                <BoldDiv>COMMENTS:</BoldDiv>
                                                {answer.comments.map((comments, i) => <AnswerComment>
                                                        ({i+1})
                                                        <TitleSection style={{marginLeft: "auto"}}>
                                                            <BoldDiv>{"Date Created: "}{moment.unix(comments.creation_date).format("DD-MM-YYYY")}</BoldDiv>
                                                            <BoldDiv>{"Votes: "}{comments.score}</BoldDiv>
                                                        </TitleSection>
                                                        <InnerHTML html={comments.body}/>
                                                 </AnswerComment>
                                                )}</>
                                            : ""}</>
                                    </Answer>
                                )
                                }
                            </Collapse>
                        </>}
                        {
                            !props.question.answers && <BoldDiv>NO ANSWERS</BoldDiv>
                        }
                        {
                            !props.question.comments && <BoldDiv>NO COMMENTS</BoldDiv>
                        }
                        <Button variant="contained" style={{
                            background: !show ? "#EF8236" : "black",
                            boxShadow: "0px 0px 4px black",
                            color: "white",
                            height: "40px",
                            width: "150px",
                            margin: "4px"
                        }} onClick={handleShow}>{show ? "HIDE" : "SHOW"} THREAD</Button>
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
