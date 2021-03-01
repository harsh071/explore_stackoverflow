import React, {useState} from "react";
import styled from "styled-components";
import TextField from '@material-ui/core/TextField';
import Collapse from '@material-ui/core/Collapse';

import Button from '@material-ui/core/Button';

const HomeContainer = styled.div`
    display:flex;
    flex-direction: column;
    align-items: center;
    margin: 100px;
    height: 80vh;   
`
const ListContainer = styled.div`
    width: 700px;
    height: 100%;
    overflow-y:scroll;

`
const SearcbContainer = styled.div`
    display:flex;
    flex-direction: row;
    align-items: center;
    width: 600px;
    margin: 50px;
`

function Home() {
    let [tagged, setTagged] = useState("")
    let [showCollapsible, setShowCollapsible] = useState(false)

    const handleSearchInput = (input) => {
        setTagged(input.target.value)
    }
    const handleSearch = () => {
        if (showCollapsible) {
            setShowCollapsible(false)

        } else {
            setShowCollapsible(true)

        }
    }

    return (
        <HomeContainer>
            <SearcbContainer>
                <TextField style={{width: "500px"}} id="standard-basic" label="Search Tagged" value={tagged}
                           onChange={handleSearchInput}/>
                <Button onClick={handleSearch} style={{marginLeft: "10px"}} variant="contained"
                        color={"primary"}>Search</Button>
            </SearcbContainer>
            <ListContainer>
                <ListItem>
                    {tagged}
                </ListItem>
                <ListItem>
                    {tagged}
                </ListItem>
                <ListItem>
                    {tagged}
                </ListItem>
                <ListItem>
                    {tagged}
                </ListItem>
            </ListContainer>
        </HomeContainer>
    );
}

function ListItem(props) {
    let [show, setShow] = useState(false);
    const handleShow = () => {
        setShow(!show)
    }
    return(
    <>
        <Collapse in={show}>
            {props.children}
        </Collapse>
        <Button onClick={handleShow}>View Full THREAD</Button>
    </>
)
}

export default Home;
