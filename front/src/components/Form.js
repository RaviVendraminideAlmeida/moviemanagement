function Form({button, keyboardAction, save, object, cancel, remove, update}){
    return(
        <form>
            <input onChange={keyboardAction} value={object.title} name="title" className="form-control" placeholder="Title"/>
            <input onChange={keyboardAction} value={object.director} name="director"className="form-control" placeholder="Director"/>
            {
                button
                ? 
                <input onClick={save} className="btn btn-primary" type="button" value="Save"/>
                :
                <div>
                    <input onClick={update} className="btn btn-warning" type="button" value="Update"/>
                    <input onClick={remove} className="btn btn-danger" type="button" value="Delete"/>
                    <input onClick={cancel} className="btn btn-secondary" type="button" value="Cancel"/>
                </div>
            }
            
            
        </form>
    )
}

export default Form;