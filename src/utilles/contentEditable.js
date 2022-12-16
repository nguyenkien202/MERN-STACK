


export const SaveContentEditAble=(e)=>{
    if(e.key ==='Enter'){
      e.preventDefault();
      e.target.blur();
    }
}

export const selectAllinlineText=(e)=>{
    e.target.focus();
    e.target.select();
 }