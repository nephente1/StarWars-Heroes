import * as React from 'react';
import { observer } from "mobx-react";
import { observable } from "mobx";

const imgSword="https://png2.kisspng.com/sh/411d5fd005bf61bafa5f9697b532fba4/L0KzQYm3U8I4N5Z8fZH0aYP2gLBuTfx2c5Yyi91Ed3Hve7b5Tf9jcV58edC2a3Xxf7PwTfFvaZxuhp98a4n6cb3yhgIudJpsReV9YYKwh7L5k702aZNmftVrYXK6RILqWb4yPWE6TaI8OEG4QoO5UMM5O2U8TaIBLoDxd1==/kisspng-luke-skywalker-obi-wan-kenobi-anakin-skywalker-lig-star-wars-5abafcbab741c9.1505503815222038347506.png";

@observer
export class App extends React.Component {

    @observable data: [] | null = [];
    @observable results: [] | null = [];
    @observable isLoading: boolean | undefined | null = true;
    @observable api: string = "https://swapi.co/api/people/";

async componentDidMount(){
        const response = await fetch(this.api);
        const respJson = await response.json();
        this.results = respJson.results;
        this.isLoading = false
 }

 opisy = (props: []) => {
     this.data = props;
 }

 render() {
   const datas: [] | null = this.results;
   //@ts-ignore
   const renderNames = datas.map( 
           (el => <Names {...el}
                    state={this.data}
                    details={this.opisy} 
                    />)
           ) 

     return (
            <div className="app">
                <div className="namesBox">
                <h1>StarWars Heroes</h1>
                <div ><img src={imgSword} className="swordImg"/></div>
                <div className="lightSwordBlue"/>
                {this.isLoading && <div className="spinner"></div>}
                {renderNames}
                </div>  
            </div>
            )
    }
}


interface NamesPropsType {
    details: (e: any)=> void,
    state: any,
    name: string
}
@observer
class Names extends React.Component<NamesPropsType> {
    @observable isOpen: boolean = false;

    showDetails = () => {
        this.props.details(this.props)
        this.isOpen = !this.isOpen;
    }
 
  render() {
      return (
           <div onClick={this.showDetails}>
              <h2 style={{color: this.isOpen? '#4ed3ff' : '#cddde8'}}>{this.props.name}</h2>
               {this.isOpen && <Details details={this.props.state} isVisible={this.isOpen}/> }
               <div className="lightSword" style={{boxShadow: this.isOpen? '0px 0px 6px 8px rgba(9,150,203,1)' : '0px 0px 4px 6px rgba(196,6,25,1)'}}/>
            </div>
       );
   }
}

interface DataDetailsPropsType {
    height: number, 
    mass: number, 
    birth_year:string, 
    gender:string, 
    hair_color:string, 
    skin_color:string, 
    eye_color:string
}
interface DetailsPropsType {
    isVisible: boolean, 
    details: DataDetailsPropsType 
}
const Details = (props: DetailsPropsType) => {

 const {height, mass, birth_year, gender, hair_color, skin_color, eye_color } = props.details;

    return(
        <div className="details" style={{visibility: props.isVisible ? "visible" : "hidden"}}>
            <div className="column">
            <p>Height: {height} cm</p>
            <p>Mass: {mass} kg</p>
            <p>Birth Year: {birth_year} 19 BBY</p>
            <p>Gender: {gender}</p>
            </div>
            <div className="column">
            <p>Hair: {hair_color}</p>
            <p>Skin: {skin_color}</p>
            <p>Eye: {eye_color}</p>
            </div>
            <div className="column">
            <div className="imgBox"> <img src="https://static.posters.cz/image/750webp/32195.webp"/></div>
            </div>
        </div>
    )
}