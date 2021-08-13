import {Component, OnInit} from '@angular/core';
import {ICircle} from "../interfaces/circle.interface";
import {ECircleCount} from "../enums/circle-count.enum";
import {LocalStorageService} from "../services/storage.service";
import {IProject} from "../interfaces/project.interface";
import { Circle } from './circleClass/circle';
import { LocalStorageSaveObj } from './circleClass/circle';
import { AuthService } from '../services/auth.sevice';
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

  constructor(protected storage: LocalStorageService, private authService: AuthService) { }

  ngOnInit(): void {
    this.getProjects();
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


  creatObject(email: any) {
    const localStorageObj = new LocalStorageSaveObj(this.newId(), this.projectName, this.circles, email);
    debugger 
    this.projectList.push(localStorageObj)
  }
  onSave(): void {
    if (this.isEmpty(this.circles) || !this.projectName) {
      return;
    }

    const user = this.authService.getUser();
    this.creatObject(user.Email)
    this.storageSet()
    this.projectName = ''
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
    this.selectedSize = project.circles.length
    console.log(project.circles.length);
    
  };

  onDelet(project:any) {
  const filteredProjectList = this.projectList.filter((val,i)=>{
      return val.id !== project.id
  });
  this.projectList = filteredProjectList
  this.storage.set(this.projectListName, JSON.stringify(this.projectList));

  if(this.projectList.length === 0) {
    this.storage.remove('circlesProject')
  }
    this.resetColors() 
  }



}

// export class Canvas extends CanvasComponent {
//   email:string
//   constructor(storage:LocalStorageService, email:string) {
//     super(storage)
//     this.email = email
//   }
// }
