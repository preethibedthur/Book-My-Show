import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
class AddMovie extends React.Component
{
    
    constructor()
    {
        super();
        //used for initialising variables and methods
        this.state={
            id:"",
            mname:"",
            mtype:"",
            mdesc:"",
            movieList:[],
            isUpdate:false,
            isValidate:false,
            message:''

        }
      this.getMovieName=this.getMovieName.bind(this);
      this.getMovieType=this.getMovieType.bind(this);
      this.getMovieDesc=this.getMovieDesc.bind(this);
      this.saveMovie=this.saveMovie.bind(this);
      this.getAll=this.getAll.bind(this);
      this.editMovie=this.editMovie.bind(this);
      this.updateMovie=this.updateMovie.bind(this);
      this.deleteMovie=this.deleteMovie.bind(this);
      this.resetForm=this.resetForm.bind(this);
    }
    getMovieName(e)
    { 

        this.setState({mname:e.target.value})
    }
    getMovieType(e){
        this.setState({mtype:e.target.value})
    }
    getMovieDesc(e){
        this.setState({mdesc:e.target.value})
    }
    getAll(){
        fetch("http://localhost:8000/movie/")
       .then((response)=>{
        return response.json()
       }).then((result)=>{
        this.setState({movieList:result})
       }).catch((err)=>{
        console.log(err);
       })
    }
    editMovie(id){
        fetch("http://localhost:8000/movie/"+id)
        .then((response)=>{
        return response.json()
       }).then((result)=>{
        this.setState({
        id:result[0]._id,
        mname:result[0].name,
        mtype:result[0].type,
        mdesc:result[0].desc,
        isUpdate:true
        })
        
       }).catch((err)=>{
        console.log(err);
       })
    }
    updateMovie(){
        var movie={
            "_id":this.state.id,
            "name":this.state.mname,
            "type":this.state.mtype,
            "desc":this.state.mdesc
        }
        fetch("http://localhost:8000/movie/"+this.state.id,{
        method:'PUT',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify(movie)
       }).then((response)=>{
        return response.json();
       }).then((result)=>{
        console.log(result);
        // this.setState({movieList:result});
        if(result.message==='Updated'){
            this.resetForm();
            this.getAll();
}
        else
            alert("Error occured while saving data");
        
       }).catch((err)=>{
        console.log(err);
       })
}
    saveMovie()
    {
        if(this.state.mname==='' || this.state.mtype==='' || this.state.mdesc==='')
        {
            this.setState({
                isValidate:false,
                message:'Please fill the details'
            })
            return;
        }
        var movie={
            "name":this.state.mname,
            "type":this.state.mtype,
            "desc":this.state.mdesc
        }
        // this.setState({movieList:this.state.movieList.concat(movie)})
       // console.log(this.state.movieList);
      
       fetch("http://localhost:8000/movie/",{
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify(movie)
       }).then((response)=>{
        return response.json();
       }).then((result)=>{
        // this.setState({movieList:result});
        if(result.message==='Inserted')
        {
            this.setState({
                isValidate:true,
                message:'Movie Saved Successfully'
            })
            this.resetForm();
            this.getAll();
        }
        else{
            alert("Error occured while saving data");
        }
       }).catch((err)=>{
        console.log(err);
       });
}
    deleteConfirm(id){
        this.setState({id:id});
    }
    deleteMovie(){
        fetch("http://localhost:8000/movie/"+this.state.id,{
        method:'DELETE',
        headers:{
            'Content-Type':'application/json'
        },
        // body:JSON.stringify(movie)
       }).then((response)=>{
        return response.json();
       }).then((result)=>{
        console.log(result);
        // this.setState({movieList:result});
        if(result.message==='Deleted')
            this.getAll();
        else
            alert("Error occured while Deleting data");
        
       }).catch((err)=>{
        console.log(err);
       })
    }
    resetForm(){
        this.setState({
            mname:'',
            mtype:'',
            mdesc:'',
            isUpdate:false
        })
    }
    render()
    {
        return(
            <div>
                <h2>Add Movie</h2>
                <hr></hr>
                <form>
                    Movie Name: <input type="text"  value={this.state.mname} onChange={this.getMovieName}></input><br></br>
                    Movie Type: <input type="text" value={this.state.mtype} onChange={this.getMovieType}></input><br></br>
                    Movie Desc: <input type="text" value={this.state.mdesc} onChange={this.getMovieDesc}></input><br></br>
                    {(this.state.isUpdate)?
                     <input type='button' value='Update' onClick={this.updateMovie} className='btn btn-primary'></input>
                     :
                     <input type='button' value='Save' onClick={this.saveMovie} className='btn btn-primary'></input>
                    }&nbsp;  
                    <input type='button' value='Reset' onClick={this.resetForm} className='btn btn-secondary'></input>
                </form>
                {(this.state.message!=='')?
                <div>
                    {(this.state.isValidate)?
                <div className='alert alert-success'>{this.state.message}
                </div>:
                <div className='alert alert-danger'>{this.state.message}</div>  
                }
                    </div>
                    :""
                }
                {/* <h4>{this.state.mname}</h4>
                <h4>{this.state.mtype}</h4>
                <h4>{this.state.mdesc}</h4> */}
                <hr></hr>
                <table className='table table-bordered table-striped'>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Type</th>
                            <th>Desc</th>
                            <th>Edit</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.movieList.map((item)=>(
                            <tr>
                                <td>{item.name}</td>
                                <td>{item.type}</td>
                                <td>{item.desc}</td>
                                <td>
                                    <button className='btn btn-primary' onClick={()=>this.editMovie(item._id)}>Edit</button>
                                </td>
                                <td><button className='btn btn-danger' data-target="#confirmModal" data-toggle="modal" onClick={()=>this.deleteConfirm(item._id)}>Delete</button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div class="modal fade" id="confirmModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      {/* <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div> */}
      <div class="modal-body">
        Are You sure?
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">NO</button>
        <button type="button" class="btn btn-primary"  data-dismiss="modal" onClick={this.deleteMovie}>YES</button>
      </div>
    </div>
  </div>
</div>
            
            </div>
            
            
            
      );
    }

    //to load default data after render
    componentDidMount()
    {
        // this.setState({
        //     mname:"movie ABC"
        // })
        this.getAll();
    }
}
export default AddMovie;