import React,{useState,useEffect,useRef} from 'react'
import {Container,Draggable} from 'react-smooth-dnd'
import Card from './Card/Card'
import {mapOrder} from 'utilles/Sort'
import {Dropdown,Form,Button} from 'react-bootstrap';
import './Column.scss'
import ComFirmmodal from 'component/BroadContent/common/ComFirmmodal'
import {MODAL_ACTION_CONFIRM} from 'utilles/contans'
import {SaveContentEditAble,selectAllinlineText} from 'utilles/contentEditable'
import {cloneDeep} from 'lodash'

function Column(props) {
  const {column,onCardDrop,onUpdatecolumn,onAddNewCardToColumn} =props;
  const cards = mapOrder(column.cards,column.cardOrder,'id')
  const [showconfirmmodal,setShowconfirmmodal] =useState(false);
  const [columntitle,setColumntitle] = useState('')
  const toggleShowConFirmModal =()=>setShowconfirmmodal(!showconfirmmodal);
  const [openNewCardForm,setOpenNewCardForm] = useState(false);
  const toggleOpenNewCardForm =()=> setOpenNewCardForm(!openNewCardForm);
  const newCardTextInputRef = useRef(null);
  const [newCardTitle,setNewCardTitle] = useState('')
  const onnewCardTitleChange = (e)=>setNewCardTitle(e.target.value)

  useEffect(()=>{
    setColumntitle(column.title);
  },[column.title])
  
  useEffect(()=>{
    if(newCardTextInputRef  && newCardTextInputRef .current){
      newCardTextInputRef .current.focus();
      newCardTextInputRef .current.select();
    }
  },[openNewCardForm])


  const onComFirmModalAction =(type)=>{
     if(type ===MODAL_ACTION_CONFIRM){
        //Remove columns 
      const newcolumns = {
        ...column,
        _action_type: true
    }
    onUpdatecolumn(newcolumns)
     }
     toggleShowConFirmModal();
  }

const handleColumnTitleChange =(e)=>setColumntitle(e.target.value)
const handleColumnTitleblur = ()=>{
  console.log(columntitle);
  const newcolumns = {
    ...column
  ,title:columntitle
}
onUpdatecolumn(newcolumns)
}
 const addNewCard =()=>{
  if(!newCardTitle){
    newCardTextInputRef.current.focus()
    return 
  }
  console.log(newCardTitle);
  const newCardToAdd ={
    id:Math.random.toString(36).substr(2,5),
    broadId:column.broadId,
    columnId:column.id,
    title:newCardTitle.trim(),
    cover:null

   }
   console.log(newCardToAdd);
   let newColumn=cloneDeep(column)
   newColumn.cards.push(newCardToAdd);
   newColumn.cardOrder.push(newCardToAdd.id);
   onUpdatecolumn(newColumn);
   setNewCardTitle("")
   toggleOpenNewCardForm()
   
 }
 
  return (
        <div className="column">
         <header className='column-drag-handle'>
         <div className='column-title'>
         <Form.Control
               size="sm"
               type="text"
               placeholder="Enter column title...."
               className="trello-content-editable"
               value={columntitle}
               onChange={handleColumnTitleChange}
               onBlur={handleColumnTitleblur}
               spellCheck='false'
               onClick={selectAllinlineText}
               
                onKeyDown={SaveContentEditAble}
              /></div>
         <div className='dropdown-title'>
            <Dropdown>
                <Dropdown.Toggle id="dropdown-basic" className='dropdown-btn'>
                </Dropdown.Toggle>

                <Dropdown.Menu className='dropdow-title'>
                  <Dropdown.Item href="#/action-1">Add Card...</Dropdown.Item>
                  <Dropdown.Item href="#/action-2" onClick={toggleShowConFirmModal}>Remove Card...</Dropdown.Item>
                  <Dropdown.Item href="#/action-3">Move all cards in this columns</Dropdown.Item>
                  <Dropdown.Item href="#/action-4">Move on card or this columns...</Dropdown.Item>
                  <Dropdown.Item href="#/action-5">The fature plane complaning...</Dropdown.Item>
                </Dropdown.Menu>
          </Dropdown>
         </div>
         </header>
          <div className="card-list">
            <Container
            groupName='col'
            onDrop={dropResult =>onCardDrop(column.id,dropResult)}
            getChildPayload={index=>cards[index]}
            dragClass='card-ghost'
            dropClass='card-ghost-drop'
            dropPlaceholder={{
              animationDuration:150,
              showOnTop:true,
              className:'card-drop-preview'
            }}
            dropPlaceholderAnimationduration={200}
>

            {cards.map((card,index)=>

            (
            <Draggable key={index} className='card-list-item'>
            <Card cards={card} />
            </Draggable>
            )
            )}
            </Container>
            
            { openNewCardForm &&
            <div className='add-new-cards'>

            <Form.Control
               size="sm"
               as="textarea"
               rows="3"
               placeholder="Enter column title...."
               className="enter-new-column-3"
               ref={newCardTextInputRef}
               value={newCardTitle} 
              onChange={onnewCardTitleChange}
                onKeyDown={event =>(event.key ==='Enter') && addNewCard()}
              />
{/* 
               <Button 
                variant="success"
                size="sm"
              >Add column</Button>{' '}
                <span className='cancel-new-column' onClick={toggleOpenNewColumnForm}>
                  <i className='fa fa-trash icon'></i>
                </span>
               */}
            </div>
}
          </div>
       <footer>
       { openNewCardForm &&
            <div className='add-new-cards-2'>
               <Button 
                variant="success"
                size="sm"
                onClick={addNewCard}
              >Add column</Button>{' '}
                <span className='cancel-new-column' onClick={toggleOpenNewCardForm}>
                  <i className='fa fa-trash icon'></i>
                </span>
              
            </div>
}
        {  !openNewCardForm &&
        <div className='footer-actions'   onClick={toggleOpenNewCardForm}>
        <i className='fa fa-plus icon'>
        Add an orther the footer </i>
        </div>
}</footer>
        <ComFirmmodal show={showconfirmmodal}
                      onAction={onComFirmModalAction}
                      title='Remove columns'
                      content={`Are you sure to remove column ${column.title} !All relected card will should be remove`}
                      />

    </div>
  )
}

export default Column