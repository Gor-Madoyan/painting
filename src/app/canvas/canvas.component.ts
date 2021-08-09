import {Component, OnInit} from '@angular/core';
import {ICircle} from "../interfaces/circle.interface";
import {ECircleCount} from "../enums/circle-count.enum";
import {LocalStorageService} from "../services/storage.service";
import {IProject} from "../interfaces/project.interface";
import { Circle } from './circleClass/circle';
import { LocalStorageSaveObj } from './circleClass/circle';
@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.css']
})
export class CanvasComponent implements OnInit {
  circles: ICircle[] = [];
  projectName: string = '';
  projectList: IProject[] = [];
  projectListName = 'circlesProject';
  canvasSizes: number[] = [
    ECircleCount.MIN, // 100
    ECircleCount.MID, // 225
    ECircleCount.MAX, // 400
  ];

  selectedSize: number = this.canvasSizes[0];
  currentColor: string = '#000';
  constructor(private storage: LocalStorageService) { }

  ngOnInit(): void {
    this.getProjects();
    console.log(this.projectList)
  }

  onGenerateCircles(): void {
    this.resetColors()
    console.log('this.circles: ', this.circles.length);
  }

  onSizeSelect(): void {
    this.circles = []
  }


  onCircleClick(circle: ICircle): void {
    if(this.circles[circle.id].color === this.currentColor ){
      this.circles[circle.id].color = "";
    }else {
      this.circles[circle.id].color = this.currentColor;
    }
  }

  onResetColor(): void {
    if (!this.isEmpty(this.circles)) {
      this.resetColors();
    }
  }

  resetColors(): void {
    this.circles = [];
    for (let i = 0; i < this.selectedSize; i++) {

      const objCircle = new Circle(i, this.newId(), '')
      this.circles.push(objCircle)
    }
  }

  onFillCircles(): void {
    if (this.isEmpty(this.circles)) {
      return;
    }
    this.circles.forEach((item) => {
      item.color = this.currentColor;
  
      
    })
  }

  isEmpty(arr: ICircle[]): boolean {
    return !arr.length;
  }

  newId(): string {
    return String(Date.now());
  }

  onSave(): void {
    if (this.isEmpty(this.circles) || !this.projectName) {
      return;
    }
    const localStorageObj = new LocalStorageSaveObj(this.newId(), this.projectName, this.circles) 
    this.projectList.push(localStorageObj)
    this.storageSet()
  }

  jsonParse() {

  }

  storageSet() {
    const projectsStr = JSON.stringify(this.projectList);
    this.storage.set(this.projectListName, projectsStr);
  }

  getProjects(): void {
    const projects = this.storage.get(this.projectListName);
    if (projects) {
      this.projectList = JSON.parse(projects);
    }
  }

  selectProject(project: IProject): void {
    this.circles = project.circles;
  }

  onDelet(project:any, i :number) {
// console.log(this.projectList);

    const filteredProjectList = this.projectList.filter((val,i)=>{
        return val.id !== project.id
    });
// console.log(filteredProjectList);
// console.log(this.projectListName);
// this.storage.remove(this.projectListName)
const obj = this.storage.get(this.projectListName)
if(obj) {
  this.projectList = JSON.parse(obj);
}
    this.projectList = filteredProjectList
    // this.projectList.splice(i,1)
    // this.storage.removeAll()
    // const projectsStr = JSON.stringify(this.projectList);
    // this.storage.set(this.projectListName, projectsStr);
    this.resetColors() 
  }

}
