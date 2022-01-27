import React, { Component } from 'react';
import './App.css';

class Node{
  constructor(data, NodeNo, next = null, previous = null)
  {
      this.data = data;
      this.next = next;
      this.previous = previous;
      this.NodeNo = NodeNo; 
  }
}

class DoubleLinkedList{
  constructor()
  {
      this.count = 0;
      this.head = null;
  }

  insert = (data) => {
      this.count++;
      let newNode = new Node(data,this.count);
      if(!this.head)
      {
          this.head = newNode;
          return;
      }

      let temp = this.head;
      while(temp.next)
      {
          temp = temp.next;
      }
      temp.next = newNode;
      newNode.previous = temp;
      this.head.previous = newNode;
  }

  delete = (index = this.count) => {
    console.log(index)
    if(!this.head)
    {
      alert('Slider is empty..')
      return;
    }

    if(index == 1)
    {
      let deletedNode = this.head;
      if(deletedNode.next)
        deletedNode.next.previous = deletedNode.previous;
      this.head = deletedNode.next;
      this.count--;
      return;
    }
    let temp = this.head;
    for(let i = 1; i < index - 1; i++)
    {
      console.log(i)
      if(!temp)
        break;
      temp = temp.next;
    }
    if(temp?.next)
    {
      let deletedNode = temp.next;
      temp.next = deletedNode.next;
      if(deletedNode.next)
      {
        deletedNode.next.previous = temp;
        deletedNode.next.NodeNo--;
      }
      this.count--;
    }else{
      alert('Position not found');
    }
    console.log(temp);
  }
}

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      Slider : new DoubleLinkedList(),
      imageNo: null,
      file: ''
    };
    let timer;
  }

  componentDidMount()
  {
    this.intialSliders();
    console.log(this.state.Slider)
    // let timeout = 5000
    // this.timer = setInterval(() => {
    //   this.showNextSlide();
    // }, timeout);
  }

  intialSliders = () => {
    this.state.Slider.insert(require('./images/pic.jpg').default)
    this.state.Slider.insert(require('./images/pic1.jpg').default)
    this.state.Slider.insert(require('./images/pic2.jpg').default)
    this.setState({
      Slider: this.state.Slider,
      imageNo: this.state.Slider.head
    })
  }

  showNextSlide = () => {
    this.state.imageNo.next ? this.setState({imageNo: this.state.imageNo.next}) : this.setState({imageNo: this.state.Slider.head})    
  }

  showPreviousSlide = () => {
    this.setState({imageNo: this.state.imageNo.previous})

  }

  ShowIcons = () => {
    let arr = []
    for(let i = 1; i <= this.state.Slider.count; i++)
    {
      arr.push(<button onClick={() => {}}  className={[this.state.imageNo.NodeNo == i ? 'icon active' : 'icon']}></button>);
    }
    return arr
  }

  handleChange = (event) => {
    const imageFile = event.target.files[0];
    const imageUrl = URL.createObjectURL(imageFile);
    console.log(imageUrl)
    this.setState({
      file: imageUrl
    })
  }

  insertData = (data) => {
    this.state.Slider.insert(data);
    this.setState({
      Slider: this.state.Slider,
      file: ''
    })
  }

  deleteData = (data) => {
    this.state.Slider.delete(data);
    console.log(this.state.Slider)
    this.setState({
      Slider: this.state.Slider,
      imageNo: this.state.Slider.head 
    })
    if(!this.state.Slider.head)
    {
      clearInterval(this.timer)
    }
  }

  render() {
    return (
      <div className="App">
      <div className="slider-container">
        {this.state.Slider.head ?
          <img className="slider-image" src={this.state.imageNo.data} alt="pic" />
        : <img className="slider-image" src={require('./images/no-image.png').default} />
        }
        <button className="slider-btn left" disabled={!this.state.Slider.head} onClick={() => this.showPreviousSlide()}>&#10094;</button>
        <button className="slider-btn right" disabled={!this.state.Slider.head} onClick={() => this.showNextSlide()}>&#10095;</button>
        <div className="icon-container">
          <this.ShowIcons />
        </div>
     </div>

     <div style={{margin: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'start'}}>
       <div className="component">
        <h2 className="comp-head">Add Slider</h2>
        <hr />
        <div style={{margin: '10px'}}>
        <input type="file" className="chooser" onChange={(event) => this.handleChange(event)}/>           
        
        {this.state.file &&
          <>
            <div className="image-opener-div">
              <img style={{marginTop: '5px'}} className="slider-image" src={this.state.file} /> 
            </div>
            <button className="insert-btn" onClick={() => this.insertData(this.state.file)}>Upload</button>  
          </>
        }
          </div>

       </div>

       <div className="component">
        <h2 className="comp-head">Delete Slider</h2>
        <hr />
        <div style={{margin: '10px', display: 'flex'}}>
          <input type="text" id="deleteText" placeholder="Enter banner Position" className="textt" />
          <button className="dlt-btn" onClick={() => this.deleteData(document.getElementById('deleteText').value)}>Delete</button>
        </div>

       </div>
     </div>

     {/* <div className="slider-container">
        {this.state.Slider.head ?
          <video  width="90%" height="400" controls>
            <source src={video} type="video/mp4"></source>
          </video>
        
        : <img className="slider-image" src={require('./images/no-image.png').default} />
        }
     </div> */}



    </div>
    );
  }
}
