import React, { useEffect, useState,useRef,useCallback } from 'react'
import Column from './Column/Column'
import { isBuffer, isEmpty } from 'lodash'
import {Container,Draggable} from 'react-smooth-dnd'
import  './Broadcontent.scss'
import { initialData } from 'actions/inittialData'
import {mapOrder} from 'utilles/Sort'
import {applyDrag} from 'utilles/dragDrop'
import {Container as BootstrapContainer,Row,Col, Form} from 'react-bootstrap'
import Button from 'react-bootstrap/Button'

function Broadcontent() {
  const [broads,setBroad] =useState({});
  const [columns,setColumn] = useState([]);
  const [openNewColumnForm,setOpenNewColumnForm] = useState(false);
  const newColumnInputRef = useRef(null);
  const [newColumnTitle,setNewColumnTitle] = useState('')
   const onnewColumnTitleChange = (e)=>setNewColumnTitle(e.target.value)

  useEffect(()=>{
      const broadFromDB = initialData.broads.find(broad => broad.id === 'broad-1' );
      if(broadFromDB){
        setBroad(broadFromDB);
        //Sort column
       mapOrder(broadFromDB.columns,broadFromDB.columnsOrder,'id');
        setColumn(broadFromDB.columns);
      }
  },[])
  useEffect(()=>{
    if(newColumnInputRef && newColumnInputRef.current){
      newColumnInputRef.current.focus();
      newColumnInputRef.current.select();
    }
  },[openNewColumnForm])

    if(isEmpty(broads)){
      return <div className='not-found' style={{'padding':'10px','color':'white'}}>Broad Not Found</div>
    }

    const onColumnDrop =(dropResult) => {
        console.log(dropResult);
        let newColumns = [...columns];
        newColumns = applyDrag(newColumns , dropResult);

        let newBroad = {...broads}
        newBroad.columnsOrder = newColumns.map(c => c.id);
        newBroad.columns = newColumns;
        console.log(newBroad);
        setBroad(newBroad);
        setColumn(newColumns);
    }

    const onCardDrop=(columnId,dropResult)=>{
      if(dropResult.removedIndex !== null || dropResult.addedIndex !== null ){
        let newColumns = [...columns];
        let currentColumns = newColumns.find(c =>c.id === columnId);
        currentColumns.cards = applyDrag(currentColumns.cards,dropResult)
        currentColumns.cardOrder =currentColumns.cards.map(i =>i.id);
        console.log(currentColumns);
        setColumn(newColumns);
      }
    }

    const addNewColumn =()=> {
      if(!newColumnTitle){
        newColumnInputRef.current.focus();
        return 
      }
      const newColumnToAdd ={
        id:Math.random.toString(36).substr(2,5),
        broadId:broads.id,
        title:newColumnTitle.trim(),
        cardOrder:[],
        cards:[]
      }
      let newColumns =[...columns]
      newColumns.push(newColumnToAdd)
      let newBroad = {...broads}
      newBroad.columnsOrder =newColumns.map(c=>c.id)
      newBroad.columns=newColumns

      setColumn(newColumns);
      setBroad(newBroad)
    };
    const toggleOpenNewColumnForm =()=> setOpenNewColumnForm(!openNewColumnForm);
    const onUpdatecolumn =(newColumnToUpdate)=>{
      const columntoidupdate =newColumnToUpdate.id
      let newColumns =[...columns]
      const columntoindexupdate = newColumns.findIndex(i=>i.id ===columntoidupdate)

       console.log(columntoindexupdate);

       if(newColumnToUpdate._action_type){
        newColumns.splice(columntoindexupdate,1);
       }
       else{
// xóa 1 phần tử xong thêm 1 phần tử đúng vị trí đấy
console.log(newColumnToUpdate);
        newColumns.splice(columntoindexupdate,1,columntoidupdate);
       }
       let newBroad = {...broads}
      newBroad.columnsOrder =newColumns.map(c=>c.id)
      newBroad.columns=newColumns

      setColumn(newColumns);
      setBroad(newBroad)
    }
  return (
        <div className="broad-columns">
        <Container
        orientation='horizontal'
        onDrop={onColumnDrop}
        dragHandleSelector='.column-drag-handle'
        getChildPayload={index=>columns[index]}
        dropPlaceholder={{
          animationDuration:150,
          showOnTop:true,
          className:'card-drop-preview'
        }}
        >
       
          {
            columns.map((column,index) => (
            <Draggable key={index}>
              <Column column={column} 
                      onCardDrop ={onCardDrop} 
                      onUpdatecolumn={onUpdatecolumn} />
            </Draggable>
          ))}
           </Container>
           <BootstrapContainer>

            {!openNewColumnForm &&
            <Row>
              <Col  className='add-new-column' onClick={toggleOpenNewColumnForm}>
                <i className='fa fa-plus icon'>Add new column</i>
             </Col>
            </Row>
              }
                 {openNewColumnForm &&
            <Row>
              <Col className='enter-new-column'>

               <Form.Control
               size="sm"
               type="text"
               placeholder="Enter column title...."
               className="enter-new-column-2"
               ref={newColumnInputRef}
               value={newColumnTitle} 
                onChange={onnewColumnTitleChange}
                onKeyDown={event =>(event.key ==='Enter') && addNewColumn()}
              />

               <Button 
                variant="success"
                size="sm"
                onClick={addNewColumn}>Add column</Button>{' '}
              
                <span className='cancel-new-column' onClick={toggleOpenNewColumnForm}>
                  <i className='fa fa-trash icon'></i>
                </span>
             </Col>
            </Row>
}
           </BootstrapContainer>

        </div>

  )
}

export default Broadcontent